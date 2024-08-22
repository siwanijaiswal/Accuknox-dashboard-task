import { Doughnut } from "react-chartjs-2";
import { Chart, ArcElement, Tooltip, Legend } from "chart.js";

Chart.register(ArcElement, Tooltip, Legend);
// Custom plugin for displaying styled text in the center of the chart
const centerTextPlugin = {
  id: "centerText",
  beforeDraw: (chart) => {
    const { ctx, width, height } = chart;
    const { options } = chart.config;
    const total = options.plugins.centerText.total; // Get the total value
    const font = options.plugins.centerText.font || "bold 16px Arial";
    const color = options.plugins.centerText.color || "#000"; // Default color
    const padding = options.plugins.centerText.padding || 0;
    const rightPadding = options.plugins.centerText.rightPadding || 0;

    if (options.plugins.centerText.display) {
      ctx.restore();
      ctx.font = font;
      ctx.textBaseline = "middle";
      ctx.fillStyle = color;

      // Calculate positions
      const totalValue = total.value;
      const totalText = total.text;
      const totalTextWidth = ctx.measureText(totalText).width;
      const totalValueWidth = ctx.measureText(totalValue).width;
      const centerX = width / 2;
      const centerY = height / 2;

      // Draw total number with right padding
      ctx.fillText(
        totalValue,
        centerX - rightPadding - totalValueWidth / 2, // Adjust x-coordinate with right padding
        centerY - padding
      );

      // Draw "Total" text with right padding
      ctx.fillText(
        totalText,
        centerX - rightPadding - totalTextWidth / 2, // Adjust x-coordinate with right padding
        centerY + padding
      );

      ctx.save();
    }
  },
};

Chart.register(centerTextPlugin);

const DonutChart = ({ labels, data, colors }) => {
  const total = data.reduce((a, b) => a + b, 0);
  const totalText = "Total"; // Text above the total value

  const chartData = {
    labels: labels,
    datasets: [
      {
        data: data,
        backgroundColor: colors,
      },
    ],
  };

  const options = {
    cutout: "70%",
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "right",
      },
      tooltip: {
        enabled: true,
      },
      centerText: {
        display: true,
        total: {
          value: total,
          text: `${totalText}`,
        },
        font: "bold 20px Arial",
        color: "#000000", // Text color
        padding: 15,
        rightPadding: 80, // Padding between texts
      },
    },
  };

  return (
    <div className="w-72 h-40 2 2xl:w-96 lg:w-56 md:w-50 sm:w-40">
      <Doughnut data={chartData} options={options} />
    </div>
  );
};

export default DonutChart;
