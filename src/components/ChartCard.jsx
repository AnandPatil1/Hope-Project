import React from "react";
import "./ChartCard.css";

const ChartCard = ({ selectedSubject }) => {
  return (
    <div className="chart-card">
      <h3>Percent Understood (%)</h3>
      <div className="chart-placeholder">
        (chart for {selectedSubject})
      </div>
    </div>
  );
};

export default ChartCard;
