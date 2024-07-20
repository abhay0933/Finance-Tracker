import { useContext, useState } from "react";
import MenuBar from "./MenuBar";
import { MdCurrencyRupee } from "react-icons/md";
import { GiReceiveMoney } from "react-icons/gi";
import { FaRupeeSign } from "react-icons/fa";
import { TransactionsContext } from "../context/TransactionsContext";
import { MdDateRange } from "react-icons/md";
import { FaCommentDots } from "react-icons/fa";
import { MdDeleteForever } from "react-icons/md";

const Income = () => {
  const [formData, setFormData] = useState({
    title: "",
    amount: "",
    date: "",
    category: "",
    description: "",
  });

  const [localError, setLocalError] = useState(null);
  const {
    addIncome,
    getTotalIncome,
    deleteIncome, // Import deleteIncome
    error: contextError,
    income,
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
    addIncome(dataToSend)
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
        console.error("Error adding income:", error);
        setLocalError(error.message);
      });
  };

  const handleDeleteIncome = async (id) => {
    try {
      await deleteIncome(id);
    } catch (error) {
      console.error("Error deleting income:", error);
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
        <h2>Income</h2>
        <div className='total-income-container'>
          <h1>
            Total Income:
            <span>
              <MdCurrencyRupee />
              {getTotalIncome()}
            </span>
          </h1>
        </div>
        <div className='income-content'>
          <div className='form-container'>
            <form onSubmit={handleSubmit} className='salary-form'>
              {(contextError || localError) && (
                <p className='error'>
                  {contextError ? contextError : localError}
                </p>
              )}
              <input
                type='text'
                value={title}
                name={"title"}
                placeholder='Salary Title'
                onChange={handleChange("title")}
              />
              <input
                value={amount}
                type='text'
                name={"amount"}
                placeholder={"Salary Amount"}
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
                <option value='salary'>Salary</option>
                <option value='freelancing'>Freelancing</option>
                <option value='investments'>Investments</option>
                <option value='stocks'>Stocks</option>
                <option value='bitcoin'>Bitcoin</option>
                <option value='bank'>Bank Transfer</option>
                <option value='youtube'>Youtube</option>
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
              <button className='addincomebtn'>Add Income</button>
            </form>
          </div>
          <div className='income-list'>
            {income.map(card => {
              if (!card) return null;
              const {_id, title, amount, date, category, description, type} = card;
              return (
                <div className='income-list-single' key={_id}>
                  <div className='incomeicon'>
                    <GiReceiveMoney style={{ fontSize: "30px" }} />
                  </div>
                  <div>
                    <div className='income-details'>
                      <div
                        style={{
                          height: "10px",
                          width: "10px",
                          backgroundColor: "green",
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
                  <div className='delete-btn' onClick={() => handleDeleteIncome(_id)}>
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

export default Income;
