import React, { useState } from "react";
import LiveChart from "./LiveChart";
import DayChart from "./DayChart";
import MonthChart from "./MonthChart";
import api from "../../services/api";

const StatisticsView = () => {
  const [showMonthChart, setShowMonthChart] = useState(false);

  const handleToggleChart = () => {
    setShowMonthChart(!showMonthChart);
  };

  return (
    <div style={{ textAlign: "center" }}>
      <div
        style={{
          background: "#f0f0f0",
          padding: "10px",
          borderRadius: "5px",
          marginBottom: "20px",
        }}
      >
        <h3 style={{ margin: "0", color: "#333", fontWeight: "bold" }}>
          Live Statistics
        </h3>
      </div>

      <div
        style={{
          marginBottom: "20px",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "400px",
        }}
      >
        <LiveChart />
      </div>

      <div style={{ marginBottom: "20px" }}>
        <button
          onClick={handleToggleChart}
          style={{
            padding: "10px 20px",
            fontSize: "16px",
            fontWeight: "bold",
            backgroundColor: "#007bff",
            color: "#fff",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
          }}
        >
          {showMonthChart ? "Show Day Chart" : "Show Month Chart"}
        </button>
      </div>

      <div style={{ margin: "0 auto", width: "70%" }}>
        {" "}
        {/* Centered container */}
        {showMonthChart ? (
          <MonthChart style={{ width: "100%", height: "400px" }} />
        ) : (
          <DayChart style={{ width: "100%", height: "400px" }} />
        )}
      </div>
    </div>
  );
};

export default StatisticsView;
