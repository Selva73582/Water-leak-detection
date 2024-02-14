import React, { useState, useEffect, useRef } from "react";
import { Line } from "react-chartjs-2";
import api from "../../services/api";
import { Chart as ChartJS } from "chart.js/auto";

function LiveChart() {
  const [userData, setUserData] = useState({
    labels: [],
    datasets: [
      {
        label: "Live",
        data: [],
        backgroundColor: ["rgba(75,192,192,1)"],
        borderColor: "black",
        borderWidth: 2,
      },
    ],
  });
  const chartRef = useRef();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await api.get("/chart/live");
        console.log(response);
        setUserData({
          labels: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
          datasets: [
            {
              ...userData.datasets[0],
              data: response,
            },
          ],
        });
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    // Initial fetch
    fetchData();

    // Set up interval for subsequent fetches
    const intervalId = setInterval(fetchData, 1000);

    // Clean up interval on unmount
    return () => clearInterval(intervalId);
  }, [10000]); // Empty dependency array ensures this effect runs only once after mount

  const options = {
    scales: {
      y: {
        min: 0,
        title: {
          display: true,
          text: "Volume", // Label for the y-axis
        },
      },
      x: {
        title: {
          display: true,
          text: "Last 10 data", // Label for the x-axis
        },
      },
    },
  };

  return (
    <div style={{ width: "70%", height: "400px" }}> {/* Adjust chart size */}
      <Line ref={chartRef} data={userData} options={options} />
    </div>
  );
}

export default LiveChart;

// import React, { useState, useEffect, useRef } from "react";
// import { Line } from "react-chartjs-2";
// import api from "../../services/api";
// import { Chart as ChartJS } from "chart.js/auto";

// function LiveChart() {
//   const [userData, setUserData] = useState({
//     labels: [],
//     datasets: [
//       {
//         label: "Live",
//         data: [],
//         backgroundColor: ["rgba(75,192,192,1)"],
//         borderColor: "black",
//         borderWidth: 2,
//       },
//     ],
//   });
//   const chartRef = useRef();

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const response = await api.get("/chart/live");
//         const newData = response.map(value => parseFloat(value).toFixed(2)); // Convert and round values to 2 decimal places
//         const updatedDataset = { ...userData.datasets[0], data: newData }; // Update dataset with new data
//         setUserData((prevData) => ({
//           ...prevData,
//           datasets: [updatedDataset],
//         }));
//       } catch (error) {
//         console.error("Error fetching data:", error);
//       }
//     };

//     // Initial fetch
//     fetchData();

//     // Set up interval for subsequent fetches
//     const intervalId = setInterval(fetchData, 5000); // Fetch data every 5 seconds

//     // Clean up interval on unmount
//     return () => clearInterval(intervalId);
//   }, []); // Remove the empty dependency array to execute the effect on every render

//   const options = {
//     scales: {
//       y: {
//         min: 0,
//         title: {
//           display: true,
//           text: "Volume", // Label for the y-axis
//         },
//       },
//       x: {
//         title: {
//           display: true,
//           text: "Last 10 data", // Label for the x-axis
//         },
//       },
//     },
//   };

//   return (
//     <div style={{ width: "70%", height: "400px" }}> {/* Adjust chart size */}
//       <Line ref={chartRef} data={userData} options={options} />
//     </div>
//   );
// }

// export default LiveChart;
