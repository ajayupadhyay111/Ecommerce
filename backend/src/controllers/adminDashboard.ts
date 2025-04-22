import { TryCatch } from "../middleware/error.js";
import { Order } from "../models/order.js";
import { Product } from "../models/product.js";
import { User } from "../models/user.js";
import { calculatePercentage } from "../utils/features.js";

export const getDashboardStats = TryCatch(async (req, res, next) => {
  let stats = {};
  let today = new Date();
  const sixMonthAgo = new Date();
  sixMonthAgo.setMonth(sixMonthAgo.getMonth() - 6);

  let startofThisMonth = new Date(today.getFullYear(), today.getMonth(), 1);
  let endofThisMonth = today;
  let startofLastMonth = new Date(today.getFullYear(), today.getMonth() - 1, 1);
  let endofLastMonth = new Date(today.getFullYear(), today.getMonth(), 0);

  let thisMonthProductsPromise = Product.find({
    createdAt: {
      $gte: startofThisMonth,
      $lte: endofThisMonth,
    },
  });
  let lastMonthProductsPromise = Product.find({
    createdAt: {
      $gte: startofLastMonth,
      $lte: endofLastMonth,
    },
  });
  let thisMonthUsersPromise = User.find({
    createdAt: {
      $gte: startofThisMonth,
      $lte: endofThisMonth,
    },
  });
  let lastMonthUserPromise = User.find({
    createdAt: {
      $gte: startofLastMonth,
      $lte: endofLastMonth,
    },
  });
  let thisMonthOrdersPromise = Order.find({
    createdAt: {
      $gte: startofThisMonth,
      $lte: endofThisMonth,
    },
  });
  let lastMonthOrdersPromise = Order.find({
    createdAt: {
      $gte: startofLastMonth,
      $lte: endofLastMonth,
    },
  });

  let lastSixMonthOrderPromise = Order.find({
    createdAt: {
      $gte: sixMonthAgo,
      $lte: today,
    },
  });

  let latestTransactionsPromise = Order.find({})
    .sort({ created: -1 })
    .select("orderItems discount total status")
    .limit(4);

  const [
    thisMonthProducts,
    lastMonthProducts,
    thisMonthUsers,
    lastMonthUsers,
    thisMonthOrders,
    lastMonthOrders,
    productsCount,
    usersCount,
    allOrders,
    lastSixMonthOrder,
    categories,
    femaleUsers,
    latestTransactions
  ] = await Promise.all([
    thisMonthProductsPromise,
    lastMonthProductsPromise,
    thisMonthUsersPromise,
    lastMonthUserPromise,
    thisMonthOrdersPromise,
    lastMonthOrdersPromise,
    Product.countDocuments(),
    User.countDocuments(),
    Order.find({}).select("total"),
    lastSixMonthOrderPromise,
    Product.distinct("category"),
    User.countDocuments({ gender: "female" }),
    latestTransactionsPromise
  ]);

  let thisMonthRevenue = thisMonthOrders.reduce(
    (total, order) => total + (order.total || 0),
    0
  );

  let lastMonthRevenue = lastMonthOrders.reduce((accu, order) => {
    return accu + (order.total || 0);
  }, 0);

  const count = {
    product: productsCount,
    user: usersCount,
    order: allOrders.length,
    revenue: allOrders.reduce((total, order) => total + order.total, 0),
  };

  let changePercent = {
    product: calculatePercentage(
      thisMonthProducts.length,
      lastMonthProducts.length
    ),
    user: calculatePercentage(thisMonthUsers.length, lastMonthUsers.length),
    order: calculatePercentage(thisMonthOrders.length, lastMonthOrders.length),
    revenue: calculatePercentage(thisMonthRevenue, lastMonthRevenue),
  };

  const OrderMonthCounts = new Array(6).fill(0);
  const OrderMonthlyRevenue = new Array(6).fill(0);

  lastSixMonthOrder.forEach((order) => {
    const creationDate = order.createdAt;
    const monthDiff = today.getMonth() - creationDate.getMonth();
    if (monthDiff < 6) {
      OrderMonthCounts[6 - 1 - monthDiff] += 1;
      OrderMonthlyRevenue[6 - 1 - monthDiff] += order.total;
    }
  });

  const categoriesCountPromise = categories.map((category) =>
    Product.countDocuments({ category })
  );

  const categoriesCount = await Promise.all(categoriesCountPromise);

  let categoryCount: Record<string, number>[] = [];
  categories.forEach((category, i) => {
    categoryCount.push({
      [category]: Math.floor((categoriesCount[i] / productsCount) * 100),
    });
  });

  const ratio = {
    male: usersCount - femaleUsers,
    female: femaleUsers,
  };

  let modifiedLatestTransactions = latestTransactions.map(i=>({
    _id:i._id,
    discount:i.discount,
    amount:i.total,
    quantity:i.orderItems.length,
    status:i.status
  }))
  res.status(200).json({
    sucess: true,
    changePercent,
    count,
    chart: {
      order: OrderMonthCounts,
      revenue: OrderMonthlyRevenue,
    },
    categoryCount,
    ratio,
    lastestTransaction:modifiedLatestTransactions
  });
});
export const getPieCharts = TryCatch(async (req, res, next) => {
try {

  res.status(200).json({
    success:true,
    })
} catch (error) {
  next(error);
}
});
export const getBarCharts = TryCatch(async (req, res, next) => {});
export const getLineCharts = TryCatch(async (req, res, next) => {});
