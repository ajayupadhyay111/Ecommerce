import React from "react";
import AdminSidebar from "../../components/Admin/AdminSidebar";
import {
  useReactTable,
  getCoreRowModel,
  getSortedRowModel,
  flexRender,
  SortingState,
  ColumnDef,
  getPaginationRowModel,
} from "@tanstack/react-table";
import {
  AiOutlineSortAscending,
  AiOutlineSortDescending,
} from "react-icons/ai";
import { FaEdit } from "react-icons/fa";
import { BiPlus } from "react-icons/bi";
import { useNavigate } from "react-router-dom";

interface Product {
  photo: string;
  name: string;
  price: number;
  stock: number;
  id: string;
}

const Products = () => {
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const navigate = useNavigate();
  const data = React.useMemo(
    () => [
      {
        id: "1",
        photo:
          "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSD2qqTETNvhuwbOxm06z6aWQjJsytiMsbtzw&s",
        name: "Gaming Laptop",
        price: 145000,
        stock: 45,
      },
      {
        id: "2",
        photo:
          "https://brand.assets.adidas.com/image/upload/f_auto,q_auto,fl_lossy/Shoes_0b4c2bae38.jpg",
        name: "Running Shoes",
        price: 2000,
        stock: 78,
      },
      {
        id: "3",
        photo:
          "https://m.media-amazon.com/images/I/31Q14qzdoZL._SR290,290_.jpg",
        name: "Smartphone",
        price: 34000,
        stock: 23,
      },
      {
        id: "4",
        photo: "https://m.media-amazon.com/images/I/41lArSiD5hL.jpg",
        name: "Wireless Headphones",
        price: 4999,
        stock: 120,
      },
      {
        id: "5",
        photo:
          "https://www.boat-lifestyle.com/cdn/shop/files/Stone_SpinXPro_1.png?v=1709717404",
        name: "Bluetooth Speaker",
        price: 2299,
        stock: 87,
      },
      {
        id: "6",
        photo: "https://m.media-amazon.com/images/I/81-kAUJg4aL._SL1500_.jpg",
        name: "Smartwatch",
        price: 7999,
        stock: 54,
      },
      {
        id: "7",
        photo: "https://m.media-amazon.com/images/I/61oK8F2lDfL._SL1500_.jpg",
        name: "DSLR Camera",
        price: 56500,
        stock: 19,
      },
      {
        id: "8",
        photo: "https://m.media-amazon.com/images/I/61NwFq5a49L._SL1500_.jpg",
        name: "Tablet",
        price: 25999,
        stock: 32,
      },
      {
        id: "9",
        photo: "https://m.media-amazon.com/images/I/61oPcxF-lFL._SL1500_.jpg",
        name: "Mechanical Keyboard",
        price: 3499,
        stock: 74,
      },
      {
        id: "10",
        photo: "https://m.media-amazon.com/images/I/6169RnmDL8L._SL1500_.jpg",
        name: "Gaming Mouse",
        price: 1599,
        stock: 102,
      },
      {
        id: "11",
        photo: "https://m.media-amazon.com/images/I/71sITvTQgnL._SL1500_.jpg",
        name: "External Hard Drive",
        price: 4999,
        stock: 61,
      },
      {
        id: "12",
        photo: "https://m.media-amazon.com/images/I/71hsC+T5ejL._SL1500_.jpg",
        name: "Wireless Charger",
        price: 1299,
        stock: 80,
      },
      {
        id: "13",
        photo: "https://m.media-amazon.com/images/I/61D7Tf5DmOL._SL1500_.jpg",
        name: "LED Monitor",
        price: 11999,
        stock: 27,
      },
      {
        id: "14",
        photo: "https://m.media-amazon.com/images/I/81vZ1UcHX5L._SL1500_.jpg",
        name: "Power Bank",
        price: 1799,
        stock: 135,
      },
      {
        id: "15",
        photo: "https://m.media-amazon.com/images/I/61xzuXz8EJL._SL1500_.jpg",
        name: "Wireless Earbuds",
        price: 3499,
        stock: 58,
      },
      {
        id: "16",
        photo: "https://m.media-amazon.com/images/I/81XYwIsNu7L._SL1500_.jpg",
        name: "Laptop Stand",
        price: 1099,
        stock: 92,
      },
      {
        id: "17",
        photo: "https://m.media-amazon.com/images/I/71zFRCcP+lL._SL1500_.jpg",
        name: "Webcam",
        price: 2999,
        stock: 38,
      },
      {
        id: "18",
        photo: "https://m.media-amazon.com/images/I/616b5Qx9nJL._SL1500_.jpg",
        name: "Noise Cancelling Headphones",
        price: 6999,
        stock: 21,
      },
      {
        id: "19",
        photo: "https://m.media-amazon.com/images/I/61fI3GHDAfL._SL1500_.jpg",
        name: "Fitness Tracker",
        price: 1999,
        stock: 77,
      },
      {
        id: "20",
        photo: "https://m.media-amazon.com/images/I/61YUxrPAH-L._SL1500_.jpg",
        name: "VR Headset",
        price: 10999,
        stock: 13,
      },
      {
        id: "21",
        photo: "https://m.media-amazon.com/images/I/71p2wU4MRLL._SL1500_.jpg",
        name: "Microwave Oven",
        price: 8999,
        stock: 40,
      },
      {
        id: "22",
        photo: "https://m.media-amazon.com/images/I/71x7g3AsflL._SL1500_.jpg",
        name: "Electric Kettle",
        price: 1299,
        stock: 65,
      },
      {
        id: "23",
        photo: "https://m.media-amazon.com/images/I/71Q5aRpy8vL._SL1500_.jpg",
        name: "Smart LED Bulb",
        price: 799,
        stock: 150,
      },
    ],
    []
  );

  const handleEdit = React.useCallback((id: string) => {
    console.log("Editing product:", id);
    navigate(`/admin/product/${id}`);
  }, []);

  const columns = React.useMemo<ColumnDef<Product>[]>(
    () => [
      {
        accessorKey: "photo",
        header: "Photo",
        enableSorting: false,
        cell: (info: any) => (
          <img
            src={info.getValue()}
            alt="Product"
            className="w-14 h-14 object-contain rounded"
          />
        ),
      },
      {
        accessorKey: "name",
        header: "Name",
        enableSorting: false,
      },
      {
        accessorKey: "price",
        header: () => (
          <div className="flex items-center gap-1 cursor-pointer">Price</div>
        ),
        cell: (info: any) => `₹${info.getValue().toLocaleString()}`,
        enableSorting: true,
      },
      {
        accessorKey: "stock",
        header: () => (
          <div className="flex items-center gap-1 cursor-pointer">Stock</div>
        ),
        enableSorting: true,
      },
      {
        accessorKey: "id",
        header: "Action",
        enableSorting: false,
        cell: (info: any) => (
          <button
            onClick={() => handleEdit(info.getValue())}
            className="px-2 py-1 rounded bg-blue-100 text-blue-800 hover:bg-blue-200 flex items-center gap-2"
          >
            <FaEdit /> Edit
          </button>
        ),
      },
    ],
    [handleEdit]
  );

  const table = useReactTable({
    data,
    columns,
    state: {
      sorting,
    },
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    initialState: {
      pagination: {
        pageSize: 8,
      },
    },
  });

  return (
    <div className="flex">
      <AdminSidebar />
      <main className="w-full mt-12 sm:mt-5">
        <div className="flex items-center justify-between mr-10 my-3">
          <h2 className="text-2xl font-bold mb-4 px-3">Products</h2>
          <button
            onClick={() => navigate("/admin/product/new")}
            className="flex items-center gap-2 px-4 py-2 bg-purple-600 text-white rounded hover:bg-purple-700 transition"
          >
            <BiPlus className="text-lg" />
            Add
          </button>
        </div>
        <div className="bg-white rounded-lg w-full shadow overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full">
              <thead>
                {table.getHeaderGroups().map((headerGroup) => (
                  <tr key={headerGroup.id} className="bg-gray-50">
                    {headerGroup.headers.map((header) => (
                      <th
                        key={header.id}
                        onClick={header.column.getToggleSortingHandler()}
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                      >
                        <div className="flex items-center gap-2">
                          {flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                          {header.column.getCanSort() && (
                            <span>
                              {header.column.getIsSorted() ? (
                                header.column.getIsSorted() === "desc" ? (
                                  <AiOutlineSortDescending className="inline" />
                                ) : (
                                  <AiOutlineSortAscending className="inline" />
                                )
                              ) : null}
                            </span>
                          )}
                        </div>
                      </th>
                    ))}
                  </tr>
                ))}
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {table.getRowModel().rows.map((row) => (
                  <tr key={row.id} className="hover:bg-gray-50">
                    {row.getVisibleCells().map((cell) => (
                      <td
                        key={cell.id}
                        className="px-6 py-4 whitespace-nowrap text-sm text-gray-500"
                      >
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
                        )}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="px-6 py-4 flex items-center justify-center border-t border-gray-200">
            <div className="flex items-center gap-2">
              <button
                onClick={() => table.setPageIndex(0)}
                disabled={!table.getCanPreviousPage()}
                className="p-2 text-gray-600 hover:bg-gray-100 rounded-md disabled:opacity-50"
              >
                {"<<"}
              </button>
              <button
                onClick={() => table.previousPage()}
                disabled={!table.getCanPreviousPage()}
                className="p-2 text-gray-600 hover:bg-gray-100 rounded-md disabled:opacity-50"
              >
                Previous
              </button>

              {/* Page Numbers */}
              <div className="flex items-center gap-1">
                {Array.from({ length: table.getPageCount() }, (_, index) => {
                  // Show first page, last page, current page, and pages around current
                  if (
                    index === 0 ||
                    index === table.getPageCount() - 1 ||
                    Math.abs(index - table.getState().pagination.pageIndex) <= 1
                  ) {
                    return (
                      <button
                        key={index}
                        onClick={() => table.setPageIndex(index)}
                        className={`w-8 h-8 flex items-center justify-center rounded-md ${
                          table.getState().pagination.pageIndex === index
                            ? "bg-blue-500 text-white"
                            : "text-gray-600 hover:bg-gray-100"
                        }`}
                      >
                        {index + 1}
                      </button>
                    );
                  } else if (
                    Math.abs(index - table.getState().pagination.pageIndex) ===
                    2
                  ) {
                    return <span key={index}>...</span>;
                  }
                  return null;
                })}
              </div>

              <button
                onClick={() => table.nextPage()}
                disabled={!table.getCanNextPage()}
                className="p-2 text-gray-600 hover:bg-gray-100 rounded-md disabled:opacity-50"
              >
                Next
              </button>
              <button
                onClick={() => table.setPageIndex(table.getPageCount() - 1)}
                disabled={!table.getCanNextPage()}
                className="p-2 text-gray-600 hover:bg-gray-100 rounded-md disabled:opacity-50"
              >
                {">>"}
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Products;
