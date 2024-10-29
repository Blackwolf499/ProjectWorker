import React from 'react'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'

interface StaffMember {
  name: string
  total_sales: number
  items: Array<{
    food_name: string
    quantity: number
  }>
}

interface StaffPerformanceChartProps {
  data: StaffMember[]
}

export function StaffPerformanceChart({ data }: StaffPerformanceChartProps) {
  const chartData = data.map(staff => ({
    name: staff.name,
    sales: staff.total_sales,
    items: staff.items.reduce((acc, item) => acc + item.quantity, 0)
  }))

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h2 className="text-lg font-semibold text-gray-900 mb-4">Staff Performance Overview</h2>
      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={chartData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis yAxisId="left" orientation="left" stroke="#8884d8" />
            <YAxis yAxisId="right" orientation="right" stroke="#82ca9d" />
            <Tooltip />
            <Legend />
            <Bar yAxisId="left" dataKey="sales" fill="#8884d8" name="Total Sales" />
            <Bar yAxisId="right" dataKey="items" fill="#82ca9d" name="Items Sold" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}