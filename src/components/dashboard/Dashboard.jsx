import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import GraphIcon from "../../assets/bar-chart.png";
import Card from "../common/Widget";
import Navbar from "../navigation/Navbar";
import { groupBy } from "../../helpers/helper";
import { selectVisibleWidgets } from "../../store/slices/widgetSlice";
import DonutChart from "../charts/DonutChart";
import SegmentedProgressBar from "../charts/ProgressChart";
import { GRAPH_TYPE_DONUT, GRAPH_TYPE_PROGRESS } from "../common/constants";
import CategoryNavbar from "../navigation/CategoryNavbar";

const renderGraph = (graph) => {
  switch (graph.type) {
    case GRAPH_TYPE_PROGRESS:
      return <SegmentedProgressBar data={graph.data} />;
    case GRAPH_TYPE_DONUT:
      return <DonutChart data={graph.data} />;
    default:
      break;
  }
};

const Dashboard = () => {
  const widgets = useSelector(selectVisibleWidgets);

  const [_widgets, setWidgets] = useState([]);
  const [groupedWidgets, setGroupedWidgets] = useState({});

  useEffect(() => {
    setWidgets(widgets);
  }, [widgets]);

  useEffect(() => {
    setGroupedWidgets(groupBy(_widgets, "category"));
  }, [_widgets]);

  const handleSearch = (query) => {
    if (query) {
      const filtered = widgets.filter((widget) =>
        widget.title.toLowerCase().includes(query.toLowerCase())
      );
      setWidgets(filtered);
    } else {
      setWidgets(widgets);
    }
  };

  return (
    <>
      <Navbar handleSearch={handleSearch} />
      <div className="bg-blue-50 w-full h-full p-6">
        <CategoryNavbar />
        <div className="space-y-2">
          {Object.keys(groupedWidgets).map((category, ind) => {
            return (
              <div key={ind}>
                <p className="card-category-heading">{category}</p>
                <div className="grid grid-cols-3">
                  {groupedWidgets[category].map((widget) => {
                    return (
                      <Card key={widget.id} title={widget.title}>
                        {widget.graph ? (
                          renderGraph(widget.graph)
                        ) : (
                          <div className="flex mt-12 flex-col w-full h-full justify-center items-center">
                            <img src={GraphIcon} width="40px" />
                            <p className="py-2"> No Graph data available!</p>
                          </div>
                        )}
                      </Card>
                    );
                  })}
                  <Card />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default Dashboard;
