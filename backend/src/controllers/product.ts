import { rm } from "fs";
import { TryCatch } from "../middleware/error.js";
import { Product } from "../models/product.js";
import ErrorHandler from "../utils/utility_class.js";
import { BaseQuery, SearchRequestQuery } from "../types/types.js";
import { Request } from "express";


export const newProduct = TryCatch(async (req, res, next) => {
  const { name, price, stock, category } = req.body;
  const photo = req.file;

  if (!photo) {
    return next(new ErrorHandler("Provide product image", 400));
  }

  if (!name || !price || !stock || !category) {
    rm(photo.path, () => {
      console.log("deleted");
    });
    return next(new ErrorHandler("All field required", 400));
  }

  await Product.create({
    name,
    price,
    stock,
    photo: photo?.path,
    category: category.toLowerCase(),
  });

  res.status(201).json({
    success: true,
    message: "Product created successfully",
  });
});

export const getLatestProducts = TryCatch(async (req, res, next) => {
  const products = await Product.find({}).sort({ createdAt: -1 }).limit(5);
  res.status(200).json({ success: true, products });
});

export const getAllCategories = TryCatch(async (req, res, next) => {
  const categories = await Product.distinct("category");
  res.status(200).json({ success: true, categories });
});

export const getAllProducts = TryCatch(async (req, res, next) => {
  const products = await Product.find();
  res.status(200).json({ success: true, products });
});

export const getSingleProduct = TryCatch(async (req, res, next) => {
  const { id } = req.params;
  const product = await Product.findById(id);
  if (!product) next(new ErrorHandler("Product not found", 404));
  res.status(200).json({ success: true, product });
});

export const deleteProduct = TryCatch(async (req, res, next) => {
  const { id } = req.params;
  const product = await Product.findByIdAndDelete(id);

  if (!product) {
    return next(new ErrorHandler("Product not found", 404));
  }

  rm(product.photo, () => {
    console.log("Product image deleted");
  });

  res
    .status(200)
    .json({ success: true, message: "Product deleted successfully" });
});

export const updateProduct = TryCatch(async (req, res, next) => {
  const { id } = req.params;
  const { name, price, stock, category } = req.body;
  const photo = req.file;

  const product = await Product.findById(id);

  if (!product) {
    return next(new ErrorHandler("Product not found", 404));
  }
  if (photo) {
    rm(product.photo, () => {
      console.log("old photo deleted");
    });
    product.photo = photo.path;
  }

  if (name) product.name = name;
  if (stock) product.stock = stock;
  if (price) product.price = price;
  if (category) product.category = category;

  await product.save();

  res.status(200).json({ success: true, message: "Product updated", product });
});

export const searchedProducts = TryCatch(
  async (req: Request<{}, {}, {}, SearchRequestQuery>, res, next) => {
    const { sort, price, search, category } = req.query;

    const page = Number(req.query.page) || 1;

    const limit = Number(process.env.PRODUCT_PER_PAGE) || 8;
    const skip = (page - 1) * limit;

    const baseQuery: BaseQuery = {};

    if (search) {
      baseQuery.name = {
        $regex: search,
        $options: "i",
      };
    }

    if (price) {
      baseQuery.price = {
        $lte: Number(price),
      };
    }

    if (category) {
      baseQuery.category = category;
    }

    const [products, filteredProduct] = await Promise.all([
      Product.find(baseQuery)
        .sort(sort && { price: sort === "asc" ? 1 : -1 })
        .limit(limit)
        .skip(skip),
      Product.find(baseQuery),
    ]);

    const totalPage = Math.ceil(filteredProduct.length / limit);

    res.status(200).json({
      success: true,
      totalPage,
      products,
    });
  }
);
