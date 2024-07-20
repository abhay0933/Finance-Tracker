import React from "react";
import MenuBar from "./MenuBar";
import Graph from "./Graph";
import SummaryBoxes from "./SummaryBoxes"; // Import the new component

const DashBoard = () => {
  return (
    <div className='dashboard-main-container'>
      <div className='left-side'>
        <MenuBar />
      </div>
      {/* Right Side */}
      <div className='right-side'>
        <h2>All Transactions</h2>
        <div className="graph-summary">
          <div className="graph-container">
            <Graph />
          </div>
          <div className="summary-container">
            <SummaryBoxes />
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashBoard;
