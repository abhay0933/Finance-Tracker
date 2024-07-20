import { useContext, useState } from "react";
import MenuBar from "./MenuBar";
import { MdCurrencyRupee } from "react-icons/md";
import { GiPayMoney } from "react-icons/gi";
import { FaRupeeSign } from "react-icons/fa";
import { TransactionsContext } from "../context/TransactionsContext";
import { MdDateRange } from "react-icons/md";
import { FaCommentDots } from "react-icons/fa";
import { MdDeleteForever } from "react-icons/md";

const Expense = () => {
  const [formData, setFormData] = useState({
    title: "",
    amount: "",
    date: "",
    category: "",
    description: "",
  });

  const [localError, setLocalError] = useState(null);
  const {
    addExpense,
    getTotalExpense,
    deleteExpense, 
    error: contextError,
    expense = [],
  } = useContext(TransactionsContext);
  const { title, amount, date, category, description } = formData;

  const handleChange = name => e => {
    setFormData({ ...formData, [name]: e.target.value });
  };

  const handleSubmit = e => {
    e.preventDefault();
    const amountAsNumber = parseFloat(formData.amount);
    if (isNaN(amountAsNumber)) {
      setLocalError("Amount must be a number");
      return;
    }
    const dataToSend = { ...formData, amount: amountAsNumber };
    console.log("Form Data before sending:", dataToSend);
    addExpense(dataToSend)
      .then(() => {
        console.log("Form Data after sending:", dataToSend);
        setFormData({
          title: "",
          amount: "",
          date: "",
          category: "",
          description: "",
        });
        setLocalError(null);
      })
      .catch(error => {
        console.error("Error adding expense:", error);
        setLocalError(error.message);
      });
  };

  const handleDeleteExpense = async (id) => {
    try {
      await deleteExpense(id);
    } catch (error) {
      console.error("Error deleting expense:", error);
    }
  };

  const formatDate = (dateString) => {
    const options = { day: '2-digit', month: '2-digit', year: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  return (
    <div className='dashboard-main-container'>
      <div className='left-side'>
        <MenuBar />
      </div>
      <div className='right-side'>
        <h2>Expenses</h2>
        <div className='total-income-container'>
          <h1>
            Total Expenses:
            <span style={{color: "#dc3545"}}>
              <MdCurrencyRupee />
              {getTotalExpense()}
            </span>
          </h1>
        </div>
        <div className='income-content'>
          <div className='form-container'>
            <form onSubmit={handleSubmit} className='salary-form'>
              {(contextError || localError) && (
                <p className='error'>
                  {contextError || localError}
                </p>
              )}
              <input
                type='text'
                value={title}
                name={"title"}
                placeholder='Expense Title'
                onChange={handleChange("title")}
              />
              <input
                value={amount}
                type='text'
                name={"amount"}
                placeholder={"Expense Amount"}
                onChange={handleChange("amount")}
              />
              <input
                type='date'
                id='date'
                value={date}
                onChange={handleChange("date")}
              />
              <select
                required
                value={category}
                name='category'
                id='category'
                onChange={handleChange("category")}
              >
                <option value='' disabled>
                  Select Option
                </option>
                <option value='food'>Food</option>
                <option value='transport'>Transport</option>
                <option value='entertainment'>Entertainment</option>
                <option value='medical'>Medical</option>
                <option value='shopping'>Shopping</option>
                <option value='travel'>Travel</option>
                <option value='other'>Other</option>
              </select>
              <textarea
                name='description'
                value={description}
                placeholder='Add A Reference'
                id='description'
                cols='30'
                rows='4'
                onChange={handleChange("description")}
              />
              <button className='addincomebtn'>Add Expense</button>
            </form>
          </div>
          <div className='income-list'>
            {expense.map(card => {
              if (!card) return null;
              const {_id, title, amount, date, category, description, type} = card;
              return (
                <div className='income-list-single' key={_id}>
                  <div className='incomeicon'>
                    <GiPayMoney style={{ fontSize: "30px" }} />
                  </div>
                  <div>
                    <div className='income-details'>
                      <div
                        style={{
                          height: "10px",
                          width: "10px",
                          backgroundColor: "red",
                          borderRadius: "50%",
                        }}
                      ></div>
                      <p>{title}</p>
                    </div>
                    <div className='rate-date-desc'>
                      <div className='income-amount'>
                        <FaRupeeSign />
                        <p>{amount}</p>
                      </div>
                      <div className='income-amount'>
                        <MdDateRange />
                        <p>{formatDate(date)}</p>
                      </div>
                      <div className='income-amount'>
                        <FaCommentDots />
                        <p>{description}</p>
                      </div>
                    </div>
                  </div>
                  <div className='delete-btn' onClick={() => handleDeleteExpense(_id)}>
                    <MdDeleteForever style={{ fontSize: "30px" }} />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Expense;
