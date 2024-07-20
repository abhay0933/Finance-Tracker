import React, { useContext } from 'react';
import MenuBar from './MenuBar';
import { TransactionsContext } from '../context/TransactionsContext';
import { MdCurrencyRupee, MdDateRange, MdCategory } from 'react-icons/md';
import { FaCommentDots } from 'react-icons/fa';

const ViewTransaction = () => {
  const { transactionHistory, error } = useContext(TransactionsContext);

  const formatDate = (dateString) => {
    const options = { day: '2-digit', month: '2-digit', year: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  const transactions = transactionHistory();

  return (
    <div className='dashboard-main-container'>
      <div className='left-side'>
        <MenuBar />
      </div>
      <div className='right-side'>
        <h2>Transaction History</h2>
        {error && <p className='error'>{error}</p>}
        <div className='transaction-history-container'>
          {transactions.length === 0 ? (
            <p className='no-transaction'>No Transactions to Show</p>
          ) : (
            transactions.map((transaction) => {
              if (!transaction) return null;
              const { _id, title, amount, date, category, description, type } = transaction;
              return (
                <div className={`transaction-card ${type === 'income' ? 'income' : 'expense'}`} key={_id}>
                  <div className='transaction-header'>
                    <div className='transaction-title'>{title}</div>
                    <div className='transaction-amount'>
                      <MdCurrencyRupee />
                      {amount}
                    </div>
                  </div>
                  <div className='transaction-details'>
                    <div className='transaction-date'>
                      <MdDateRange />
                      {formatDate(date)}
                    </div>
                    <div className='transaction-category'>
                      <MdCategory />
                      {category}
                    </div>
                    <div className='transaction-description'>
                      <FaCommentDots />
                      {description}
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
};

export default ViewTransaction;
