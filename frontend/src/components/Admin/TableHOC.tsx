import {
  useReactTable,
  getCoreRowModel,
  getSortedRowModel,
  flexRender,
  SortingState,
} from "@tanstack/react-table";
import { useMemo, useState } from "react";
import {
  AiOutlineSortAscending,
  AiOutlineSortDescending,
} from "react-icons/ai";

interface Transaction {
  id: string;
  quantity: number;
  discount: number;
  amount: number;
  status: string;
}

const TableHOC = () => {
  const [sorting, setSorting] = useState<SortingState>([]);

  const data: Transaction[] = useMemo(
    () => [
      {
        id: "#123",
        quantity: 3,
        discount: 10,
        amount: 4500,
        status: "Processing",
      },
      {
        id: "#124",
        quantity: 1,
        discount: 0,
        amount: 2000,
        status: "Shipped",
      },
      {
        id: "#125",
        quantity: 2,
        discount: 15,
        amount: 3800,
        status: "Delivered",
      },
      {
        id: "#126",
        quantity: 5,
        discount: 20,
        amount: 8000,
        status: "Processing",
      },
    ],
    []
  );

  const columns = useMemo(
    () => [
      {
        accessorKey: "id",
        header: "Order ID",
      },
      {
        accessorKey: "quantity",
        header: "Quantity",
      },
      {
        accessorKey: "discount",
        header: "Discount (%)",
      },
      {
        accessorKey: "amount",
        header: "Amount (₹)",
        cell: (info: any) => `₹${info.getValue().toLocaleString()}`,
      },
      {
        accessorKey: "status",
        header: "Status",
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
    ],
    []
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
  });

  return (
    <div className="overflow-x-auto bg-white rounded-lg shadow w-full">
      <h2 className="text-xl text-gray-700 mb-2 uppercase text-start py-4 ml-5">
        Top transaction
      </h2>
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
                    <span>
                      {header.column.getIsSorted() ? (
                        header.column.getIsSorted() === "desc" ? (
                          <AiOutlineSortDescending className="inline" />
                        ) : (
                          <AiOutlineSortAscending className="inline" />
                        )
                      ) : null}
                    </span>
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
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TableHOC;
