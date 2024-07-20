import { useState } from "react";
import "./App.css";
import SignUp from "./components/SignUp";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./components/Login";
import DashBoard from "./components/DashBoard";
import Income from "./components/Income";
import ViewTransaction from "./components/ViewTransaction";
import Expense from "./components/Expense";
import TransactionsProvider from "./context/TransactionsContext";

function App() {
  return (
    <TransactionsProvider>
      <>
        <Router>
          <Routes>
            <Route path='/' element={<SignUp />} />
            <Route path='/login' element={<Login />} />
            <Route path='/dashboard' element={<DashBoard />} />
            <Route path='/income' element={<Income />} />
            <Route path='/transaction' element={<ViewTransaction />} />
            <Route path='/expense' element={<Expense />} />
          </Routes>
        </Router>
      </>
    </TransactionsProvider>
  );
}

export default App;
