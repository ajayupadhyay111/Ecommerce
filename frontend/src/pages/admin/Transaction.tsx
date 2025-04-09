import React, { useState } from "react";
import AdminSidebar from "../../components/Admin/AdminSidebar";
import {
  ColumnDef,
  SortingState,
  useReactTable,
  getCoreRowModel,
  getSortedRowModel,
  flexRender,
} from "@tanstack/react-table";
import {
  AiOutlineSortAscending,
  AiOutlineSortDescending,
} from "react-icons/ai";
import { FaEye } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

interface TransactionType {
  id: string;
  user: string;
  amount: number;
  discount: number;
  quantity: number;
  status: "Processing" | "Shipped" | "Delivered";
}

const Transaction = () => {
  const [sorting, setSorting] = useState<SortingState>([]);
  const navigate = useNavigate();
  const data = React.useMemo(
    () => [
      {
        id: "123",
        user: "John Doe",
        amount: 4500,
        discount: 10,
        quantity: 3,
        status: "Processing",
      },
      {
        id: "124",
        user: "Jane Smith",
        amount: 2000,
        discount: 0,
        quantity: 1,
        status: "Shipped",
      },
      {
        id: "125",
        user: "Mike Johnson",
        amount: 3800,
        discount: 15,
        quantity: 2,
        status: "Delivered",
      },
      // Add more transactions as needed
    ],
    []
  );

  const handleTransaction = React.useCallback((id: string) => {
    console.log("Viewing transaction:", id);
    navigate(`/admin/transaction/${id}`)
  }, []);
  const columns = React.useMemo<ColumnDef<TransactionType>[]>(
    () => [
      {
        accessorKey: "user",
        header: "User",
        enableSorting: true,
      },
      {
        accessorKey: "amount",
        header: "Amount",
        enableSorting: true,
        cell: (info: any) => `₹${info.getValue().toLocaleString()}`,
      },
      {
        accessorKey: "discount",
        header: "Discount",
        enableSorting: true,
        cell: (info: any) => `${info.getValue()}%`,
      },
      {
        accessorKey: "quantity",
        header: "Quantity",
        enableSorting: true,
      },
      {
        accessorKey: "status",
        header: "Status",
        enableSorting: true,
        cell: (info: any) => (
          <span
            className={`px-2 py-1 rounded-full text-xs ${
              info.getValue() === "Processing"
                ? "bg-yellow-100 text-yellow-800"
                : info.getValue() === "Shipped"
                ? "bg-blue-100 text-blue-800"
                : "bg-green-100 text-green-800"
            }`}
          >
            {info.getValue()}
          </span>
        ),
      },
      {
        accessorKey: "id",
        header: "Action",
        enableSorting: false,
        cell: (info: any) => (
          <button
            onClick={() => handleTransaction(info.getValue())}
            className="p-2 hover:underline  text-blue-600"
          >
           manage
          </button>
        ),
      },
    ],
    [handleTransaction]
  );

  const table = useReactTable({
    data,
    columns,
    state: { sorting },
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
  });

  return (
    <div className="flex">
      <AdminSidebar />
      <main className="w-full p-8">
        <h2 className="text-2xl font-bold mb-4">Transactions</h2>
        <div className="bg-white rounded-lg shadow overflow-hidden">
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

          {/* Pagination */}
        </div>
      </main>
    </div>
  );
};

export default Transaction;
