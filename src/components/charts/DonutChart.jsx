import { Doughnut } from "react-chartjs-2";
import { Chart, ArcElement, Tooltip, Legend } from "chart.js";

Chart.register(ArcElement, Tooltip, Legend);
const centerTextPlugin = {
  id: "centerText",
  beforeDraw: (chart) => {
    const { ctx, width, height } = chart;
    const { options } = chart.config;
    const total = options.plugins.centerText.total;
    const font = options.plugins.centerText.font || "bold 16px Arial";
    const color = options.plugins.centerText.color || "#000";
    const padding = options.plugins.centerText.padding || 0;
    const rightPadding = options.plugins.centerText.rightPadding || 0;

    if (options.plugins.centerText.display) {
      ctx.restore();
      ctx.font = font;
      ctx.textBaseline = "middle";
      ctx.fillStyle = color;

      const totalValue = total.value;
      const totalText = total.text;
      const totalTextWidth = ctx.measureText(totalText).width;
      const totalValueWidth = ctx.measureText(totalValue).width;
      const centerX = width / 2;
      const centerY = height / 2;

      ctx.fillText(
        totalValue,
        centerX - rightPadding - totalValueWidth / 2,
        centerY - padding
      );

      ctx.fillText(
        totalText,
        centerX - rightPadding - totalTextWidth / 2,
        centerY + padding
      );

      ctx.save();
    }
  },
};

Chart.register(centerTextPlugin);

const DonutChart = ({ data }) => {
  const total = data
    ?.map((graphData) => graphData.value)
    .reduce((a, b) => a + b, 0);
  const totalText = "Total";

  const chartData = {
    labels: data?.map((graphData) => graphData.label),
    datasets: [
      {
        data: data?.map((graphData) => graphData.value),
        backgroundColor: data?.map((graphData) => graphData.color),
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
        color: "#000000",
        padding: 15,
        rightPadding: 60,
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
