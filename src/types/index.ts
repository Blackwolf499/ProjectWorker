export interface Metric {
  title: string
  value: string
  change: number
}

export interface StaffMember {
  id: number
  name: string
  sales: number
  orders: number
  performance: number
}

export interface Product {
  id: number
  name: string
  category: string
  sales: number
  quantity: number
  profit: number
}

export interface RevenueData {
  month: string
  revenue: number
  target: number
}

export interface DashboardData {
  metrics: Metric[]
  staff: StaffMember[]
  products: Product[]
  revenue: RevenueData[]
}