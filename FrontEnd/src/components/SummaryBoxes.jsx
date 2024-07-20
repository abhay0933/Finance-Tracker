import React, { useContext } from 'react';
import { TransactionsContext } from '../context/TransactionsContext';
import { MdCurrencyRupee } from 'react-icons/md';

const SummaryBoxes = () => {
  const { getTotalIncome, getTotalExpense, totalBalance } = useContext(TransactionsContext);

  return (
    <div className="summary-boxes-container">
      <div className="summary-box income-box">
        <h3>Total Income</h3>
        <p style={{color: "#28a745"}}>
          <MdCurrencyRupee /> {getTotalIncome()}
        </p>
      </div>
      <div className="summary-box expense-box">
        <h3>Total Expense</h3>
        <p style={{color: "#dc3545"}}>
          <MdCurrencyRupee /> {getTotalExpense()}
        </p>
      </div>
      <div className="summary-box balance-box">
        <h3>Total Budget</h3>
        <p style={{color:"#ffc107"}}>
          <MdCurrencyRupee /> {totalBalance()}
        </p>
      </div>
    </div>
  );
};

export default SummaryBoxes;
