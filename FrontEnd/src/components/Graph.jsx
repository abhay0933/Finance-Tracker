import React, { useContext } from 'react';
import { TransactionsContext } from '../context/TransactionsContext';
import {
  PieChart, Pie, Cell, Tooltip, Legend,
} from 'recharts';

const COLORS = ['#0088FE', '#FF8042']; // Colors for income and expense

const Graph = () => {
  const { income, expense } = useContext(TransactionsContext);

  // Calculate total income and expense
  const totalIncome = income.reduce((acc, item) => acc + item.amount, 0);
  const totalExpense = expense.reduce((acc, item) => acc + item.amount, 0);

  // Prepare data for Pie Chart
  const data = [
    { name: 'Income', value: totalIncome },
    { name: 'Expense', value: totalExpense },
  ];

  // Check if there's no data to show an empty Pie Chart
  const isEmpty = totalIncome === 0 && totalExpense === 0;

  return (
    <div style={{ textAlign: 'center' }}>
      {isEmpty ? (
        <p>No data available for Pie Chart</p>
      ) : (
        <PieChart width={400} height={400}>
          <Pie
            data={data}
            cx={200}
            cy={200}
            innerRadius={60}
            outerRadius={120}
            fill="#8884d8"
            paddingAngle={5}
            dataKey="value"
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip />
          <Legend />
        </PieChart>
      )}
    </div>
  );
};

export default Graph;
