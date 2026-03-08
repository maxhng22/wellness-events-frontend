import React from "react";

export type Column<T> = {
  header: string;
  accessor: keyof T | ((row: T) => React.ReactNode);
};

interface DataTableProps<T> {
  columns: Column<T>[];
  data: T[];
  loading?: boolean;
  emptyMessage?: string;
}

export default function DataTable<T>({
  columns,
  data,
  loading = false,
  emptyMessage = "No records found",
}: DataTableProps<T>) {

  // Show loading state
  if (loading) {
    return (
      <div className="p-6 text-center text-gray-500 dark:text-gray-400">
        Loading...
      </div>
    );
  }

  // Show empty state
  if (!data || data.length === 0) {
    return (
      <div className="p-6 text-center text-gray-500 dark:text-gray-400">
        {emptyMessage}
      </div>
    );
  }

  return (
    <div className="w-full overflow-x-auto rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm dark:shadow-none bg-white dark:bg-gray-900">
      <table className="min-w-full">
        <thead>
          <tr className="bg-gray-50 dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
            {columns.map((col) => (
              <th
                key={col.header}
                className="px-5 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400"
              >
                {col.header}
              </th>
            ))}
          </tr>
        </thead>

        <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
          {data.map((row, rowIndex) => (
            <tr
              key={rowIndex}
              className="hover:bg-gray-50 dark:hover:bg-gray-800/60 transition-colors duration-100"
            >
              {columns.map((col, colIndex) => {
                const value =
                  typeof col.accessor === "function"
                    ? col.accessor(row)
                    : row[col.accessor];

                return (
                  <td
                    key={colIndex}
                    className="px-5 py-3.5 text-sm text-gray-700 dark:text-gray-300"
                  >
                    {value as React.ReactNode}
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}