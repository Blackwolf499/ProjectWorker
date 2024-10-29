import React from 'react'

interface SalesData {
  clerks: Array<{
    clerk_id: string
    name: string
    total_sales: number
    items: Array<{
      food_name: string
      quantity: number
    }>
  }>
}

interface SalesPerformanceTableProps {
  data: SalesData['clerks']
}

export function SalesPerformanceTable({ data }: SalesPerformanceTableProps) {
  const calculateTotalItems = (items: Array<{ quantity: number }>) => {
    return items.reduce((sum, item) => sum + item.quantity, 0)
  }

  const calculateAvgPerItem = (total: number, items: Array<{ quantity: number }>) => {
    const totalItems = calculateTotalItems(items)
    return totalItems > 0 ? total / totalItems : 0
  }

  const sortedData = [...data].sort((a, b) => b.total_sales - a.total_sales)

  return (
    <div className="bg-white rounded-lg shadow overflow-hidden">
      <div className="px-6 py-4 border-b border-gray-200">
        <h2 className="text-lg font-semibold text-gray-900">Staff Sales Performance Report</h2>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Employee Name
              </th>
              <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                Items Sold
              </th>
              <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                Total Sales
              </th>
              <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                Avg per Item
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {sortedData.map((clerk) => (
              <tr key={clerk.clerk_id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <div>
                      <div className="text-sm font-medium text-gray-900">{clerk.name}</div>
                      <div className="text-sm text-gray-500">ID: {clerk.clerk_id}</div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm text-gray-500">
                  {calculateTotalItems(clerk.items).toLocaleString()}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium text-gray-900">
                  ${clerk.total_sales.toLocaleString()}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm text-gray-500">
                  ${calculateAvgPerItem(clerk.total_sales, clerk.items).toFixed(2)}
                </td>
              </tr>
            ))}
          </tbody>
          <tfoot className="bg-gray-50">
            <tr>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                Total
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium text-gray-900">
                {data.reduce((sum, clerk) => sum + calculateTotalItems(clerk.items), 0).toLocaleString()}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium text-gray-900">
                ${data.reduce((sum, clerk) => sum + clerk.total_sales, 0).toLocaleString()}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium text-gray-900">
                ${(data.reduce((sum, clerk) => sum + clerk.total_sales, 0) / 
                   data.reduce((sum, clerk) => sum + calculateTotalItems(clerk.items), 0)).toFixed(2)}
              </td>
            </tr>
          </tfoot>
        </table>
      </div>
    </div>
  )
}