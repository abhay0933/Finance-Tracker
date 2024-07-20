import React, { useContext } from 'react';
import { MdDashboard } from "react-icons/md";
import { GrTransaction } from "react-icons/gr";
import { FaMoneyBillTrendUp } from "react-icons/fa6";
import { GiTakeMyMoney } from "react-icons/gi";
import { FaSignOutAlt } from "react-icons/fa";
import { NavLink, useNavigate } from "react-router-dom";
import { TransactionsContext } from '../context/TransactionsContext'; // Adjust the import path if necessary

const MenuBar = () => {
  const navigate = useNavigate();
  const { username } = useContext(TransactionsContext); // Use context to get username

  const handleSignOut = () => {
    // Clear any authentication tokens or user data
    localStorage.removeItem('token');
    // Redirect to the login page
    navigate('/login');
  };

  return (
    <div className='left'>
      <div className='profile-name'>
        <h2>Hi, <span style={{color: "#5AA4D5"}}>{username || "User"}</span></h2>
      </div>
      <div className='menu-bar'>
        <ul>
          <NavLink to='/dashboard' activeClassName="active">
            <li>
              <MdDashboard />
              Dashboard
            </li>
          </NavLink>
          <NavLink to='/transaction' activeClassName="active">
            <li>
              <GrTransaction />
              Transaction
            </li>
          </NavLink>
          <NavLink to='/income' activeClassName="active">
            <li>
              <FaMoneyBillTrendUp />
              Income
            </li>
          </NavLink>
          <NavLink to='/expense' activeClassName="active">
            <li>
              <GiTakeMyMoney />
              Expense
            </li>
          </NavLink>
        </ul>
      </div>
      <div className="signout-btn" onClick={handleSignOut}>
        <FaSignOutAlt />
        <p>Sign Out</p>
      </div>
    </div>
  );
}

export default MenuBar;
