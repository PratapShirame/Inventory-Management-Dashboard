// src/components/CategoryChart.tsx
import React from 'react';
import { useSelector } from 'react-redux';
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from 'recharts';

const COLORS = ['#0088FE', '#00C49F', '#FFBB28'];

const CategoryChart: React.FC = () => {
  const products = useSelector((state: any) => state.products.products);

  const categoryData = products.reduce((acc: any, product: any) => {
    acc[product.category] = (acc[product.category] || 0) + 1;
    return acc;
  }, {});

  const chartData = Object.keys(categoryData).map((key) => ({
    name: key,
    value: categoryData[key],
  }));

  return (
    <div className="mt-6">
      <h3 className="text-xl mb-2">Category Distribution</h3>
      <ResponsiveContainer width="100%" height={300}>
        <PieChart>
          <Pie data={chartData} dataKey="value" nameKey="name" outerRadius={100}>
            {chartData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

export default CategoryChart;
