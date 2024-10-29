import React, { useMemo } from 'react'
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts'

interface CategoryBreakdownProps {
  data: Array<{
    items: Array<{
      food_name: string
      quantity: number
    }>
  }>
}

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8', '#82CA9D', '#FFC658', '#FF7C43']

export function CategoryBreakdown({ data }: CategoryBreakdownProps) {
  const categoryData = useMemo(() => {
    const categories = new Map<string, number>()
    
    data.forEach(staff => {
      staff.items.forEach(item => {
        const current = categories.get(item.food_name) || 0
        categories.set(item.food_name, current + item.quantity)
      })
    })

    return Array.from(categories.entries()).map(([name, value]) => ({
      name,
      value
    })).sort((a, b) => b.value - a.value)
  }, [data])

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h2 className="text-lg font-semibold text-gray-900 mb-4">Category Sales Distribution</h2>
      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={categoryData}
              cx="50%"
              cy="50%"
              labelLine={false}
              label={({ name, percent }) => `${name} (${(percent * 100).toFixed(0)}%)`}
              outerRadius={80}
              fill="#8884d8"
              dataKey="value"
            >
              {categoryData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}