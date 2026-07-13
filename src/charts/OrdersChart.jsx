import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Legend
} from "chart.js";

import { Bar } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Legend
);

function OrdersChart({ orders }) {

  const data = {

    labels: [

      "Mon",
      "Tue",
      "Wed",
      "Thu",
      "Fri",
      "Sat",
      "Sun"

    ],

    datasets: [

      {

        label: "Orders",

        data: [

          orders * 0.2,
          orders * 0.3,
          orders * 0.5,
          orders * 0.7,
          orders * 0.8,
          orders * 0.9,
          orders

        ],

        backgroundColor: "#16a34a"

      }

    ]

  };

  return (

    <div className="chart-card">

      <h2>Weekly Orders</h2>

      <Bar data={data} />

    </div>

  );

}

export default OrdersChart;