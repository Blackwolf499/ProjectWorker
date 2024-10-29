import React from 'react';
import { ArrowTrendingUpIcon, ChartBarIcon, UserGroupIcon, CurrencyDollarIcon } from '@heroicons/react/24/outline';
import { metrics } from '../data/mockData';

export function ExecutiveSummary() {
  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden">
      <div className="p-6 sm:p-8">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-2xl font-bold text-gray-900">Executive Summary</h2>
          <span className="px-3 py-1 bg-blue-100 text-blue-800 text-sm font-medium rounded-full">
            December 2024
          </span>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {metrics.map((metric, index) => (
            <div
              key={index}
              className="bg-gradient-to-br from-white to-gray-50 rounded-lg p-6 shadow-sm border border-gray-100"
            >
              <div className="flex items-center justify-between mb-4">
                <span className="text-sm font-medium text-gray-500">{metric.title}</span>
                <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                  metric.change >= 0 
                    ? 'bg-green-100 text-green-800'
                    : 'bg-red-100 text-red-800'
                }`}>
                  {metric.change >= 0 ? '↑' : '↓'} {Math.abs(metric.change)}%
                </span>
              </div>
              <div className="flex items-baseline">
                <span className="text-3xl font-bold text-gray-900">{metric.value}</span>
                <span className="ml-2 text-sm text-gray-500">vs last month</span>
              </div>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="space-y-6">
            <div className="bg-blue-50 rounded-lg p-6">
              <div className="flex items-center space-x-3 mb-4">
                <div className="bg-blue-100 rounded-lg p-2">
                  <ChartBarIcon className="h-6 w-6 text-blue-700" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900">Key Findings</h3>
              </div>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <span className="flex-shrink-0 h-2 w-2 mt-2 rounded-full bg-blue-400" />
                  <span className="ml-4 text-gray-700">
                    Overall revenue increased by <span className="font-semibold text-blue-700">12.5%</span> compared to last month, reaching <span className="font-semibold text-blue-700">$127,893</span>
                  </span>
                </li>
                <li className="flex items-start">
                  <span className="flex-shrink-0 h-2 w-2 mt-2 rounded-full bg-blue-400" />
                  <span className="ml-4 text-gray-700">
                    Staff performance remains strong with an average rating of <span className="font-semibold text-blue-700">92.8%</span>
                  </span>
                </li>
                <li className="flex items-start">
                  <span className="flex-shrink-0 h-2 w-2 mt-2 rounded-full bg-blue-400" />
                  <span className="ml-4 text-gray-700">
                    Beverage category continues to be the top performer, led by Premium Coffee Beans
                  </span>
                </li>
                <li className="flex items-start">
                  <span className="flex-shrink-0 h-2 w-2 mt-2 rounded-full bg-blue-400" />
                  <span className="ml-4 text-gray-700">
                    Average order value improved by <span className="font-semibold text-blue-700">5.7%</span>, indicating successful upselling strategies
                  </span>
                </li>
              </ul>
            </div>
          </div>

          <div className="space-y-6">
            <div className="bg-green-50 rounded-lg p-6">
              <div className="flex items-center space-x-3 mb-4">
                <div className="bg-green-100 rounded-lg p-2">
                  <ArrowTrendingUpIcon className="h-6 w-6 text-green-700" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900">Recommendations</h3>
              </div>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <span className="flex-shrink-0 h-2 w-2 mt-2 rounded-full bg-green-400" />
                  <span className="ml-4 text-gray-700">
                    Focus on improving sales in the Bakery category to match Beverage performance
                  </span>
                </li>
                <li className="flex items-start">
                  <span className="flex-shrink-0 h-2 w-2 mt-2 rounded-full bg-green-400" />
                  <span className="ml-4 text-gray-700">
                    Implement additional staff training to address the <span className="font-semibold text-red-600">2.3%</span> decline in total sales
                  </span>
                </li>
                <li className="flex items-start">
                  <span className="flex-shrink-0 h-2 w-2 mt-2 rounded-full bg-green-400" />
                  <span className="ml-4 text-gray-700">
                    Consider expanding the premium product line based on current performance
                  </span>
                </li>
                <li className="flex items-start">
                  <span className="flex-shrink-0 h-2 w-2 mt-2 rounded-full bg-green-400" />
                  <span className="ml-4 text-gray-700">
                    Review inventory management for top-selling items to prevent stockouts
                  </span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}