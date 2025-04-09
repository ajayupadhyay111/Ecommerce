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
import { FaEdit, FaTrash } from "react-icons/fa";

interface Customer {
  id: string;
  avatar: string;
  name: string;
  email: string;
  gender: string;
  role: "admin" | "user";
}

const Products = () => {
  const [sorting, setSorting] = React.useState<SortingState>([]);

  const data = React.useMemo(
    () => [
      {
        id: "1",
        avatar: "https://randomuser.me/api/portraits/men/1.jpg",
        name: "John Doe",
        email: "john@example.com",
        gender: "male",
        role: "user",
      },
      {
        id: "2",
        avatar: "https://randomuser.me/api/portraits/women/2.jpg",
        name: "Jane Smith",
        email: "jane@example.com",
        gender: "female",
        role: "admin",
      },
      {
        id: "3",
        avatar: "https://randomuser.me/api/portraits/men/3.jpg",
        name: "Michael Johnson",
        email: "michael@example.com",
        gender: "male",
        role: "user",
      },
      {
        id: "4",
        avatar: "https://randomuser.me/api/portraits/women/4.jpg",
        name: "Emily Davis",
        email: "emily@example.com",
        gender: "female",
        role: "user",
      },
      {
        id: "5",
        avatar: "https://randomuser.me/api/portraits/men/5.jpg",
        name: "David Wilson",
        email: "david@example.com",
        gender: "male",
        role: "admin",
      },
      {
        id: "6",
        avatar: "https://randomuser.me/api/portraits/women/6.jpg",
        name: "Sophia Taylor",
        email: "sophia@example.com",
        gender: "female",
        role: "user",
      },
      {
        id: "7",
        avatar: "https://randomuser.me/api/portraits/men/7.jpg",
        name: "James Anderson",
        email: "james@example.com",
        gender: "male",
        role: "user",
      },
      {
        id: "8",
        avatar: "https://randomuser.me/api/portraits/women/8.jpg",
        name: "Olivia Martinez",
        email: "olivia@example.com",
        gender: "female",
        role: "admin",
      },
      {
        id: "9",
        avatar: "https://randomuser.me/api/portraits/men/9.jpg",
        name: "Daniel Thomas",
        email: "daniel@example.com",
        gender: "male",
        role: "user",
      },
      {
        id: "10",
        avatar: "https://randomuser.me/api/portraits/women/10.jpg",
        name: "Ava Garcia",
        email: "ava@example.com",
        gender: "female",
        role: "user",
      },
      {
        id: "11",
        avatar: "https://randomuser.me/api/portraits/men/11.jpg",
        name: "William Lee",
        email: "william@example.com",
        gender: "male",
        role: "admin",
      },
      {
        id: "12",
        avatar: "https://randomuser.me/api/portraits/women/12.jpg",
        name: "Isabella Harris",
        email: "isabella@example.com",
        gender: "female",
        role: "user",
      },
    ],
    []
  );

  const handleDelete = React.useCallback((id: string) => {
    console.log("Deleting customer:", id);
  }, []);

  const columns = React.useMemo<ColumnDef<Customer>[]>(
    () => [
      {
        accessorKey: "avatar",
        header: "Avatar",
        enableSorting: false,
        cell: (info: any) => (
          <img
            src={info.getValue()}
            alt="Avatar"
            className="w-10 h-10 rounded-full object-cover"
          />
        ),
      },
      {
        accessorKey: "name",
        header: "Name",
        enableSorting: true,
      },
      {
        accessorKey: "email",
        header: "Email",
        enableSorting: true,
      },
      {
        accessorKey: "gender",
        header: "Gender",
        enableSorting: true,
        cell: (info: any) => (
          <span className="capitalize">{info.getValue()}</span>
        ),
      },
      {
        accessorKey: "role",
        header: "Role",
        enableSorting: true,
        cell: (info: any) => (
          <span
            className={`px-2 py-1 rounded-full text-xs ${
              info.getValue() === "admin"
                ? "bg-purple-100 text-purple-800"
                : "bg-gray-100 text-gray-800"
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
            onClick={() => handleDelete(info.getValue())}
            className="p-2 hover:bg-red-100 rounded-full text-red-600"
          >
            <FaTrash />
          </button>
        ),
      },
    ],
    [handleDelete]
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
        <h2 className="text-2xl font-bold mb-4 px-3">Products</h2>
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
