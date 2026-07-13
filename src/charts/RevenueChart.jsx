import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend
} from "chart.js";

import { Line } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend
);

function RevenueChart({ revenue }) {

  const data = {

    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],

    datasets: [

      {

        label: "Revenue",

        data: [

          revenue * 0.2,
          revenue * 0.35,
          revenue * 0.45,
          revenue * 0.65,
          revenue * 0.8,
          revenue

        ],

        borderColor: "#2563eb",

        backgroundColor: "rgba(37,99,235,.2)",

        tension: 0.4,

        fill: true

      }

    ]

  };

  return (

    <div className="chart-card">

      <h2>Revenue Overview</h2>

      <Line data={data} />

    </div>

  );

}

export default RevenueChart;