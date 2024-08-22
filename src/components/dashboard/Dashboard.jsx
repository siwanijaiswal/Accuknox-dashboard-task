import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import ClockIcon from "../../assets/clock.png";
import DotsIcon from "../../assets/dots.png";
import RotateIcon from "../../assets/rotation.png";
import GraphIcon from "../../assets/bar-chart.png";
import Card from "../common/Card";
import AddWidget from "../widget/AddWidget";
import Navbar from "../navigation/Navbar";
import { groupBy } from "../../helpers/helper";
import { selectVisibleWidgets } from "../../store/slices/widgetSlice";
import DonutChart from "../charts/DonutChart";
import SegmentedProgressBar from "../charts/ProgressChart";

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
        <div className="flex justify-between p-6">
          <h2 className="text-xl font-bold">CNAPP Dashboard</h2>
          <div className="flex gap-4">
            <div>
              <AddWidget />
            </div>
            <div className="custom-button">
              <img src={RotateIcon} width="20px" />
            </div>
            <div className="custom-button">
              <img src={DotsIcon} width="18px" />
            </div>
            <div className="custom-button w-[150px] h-[44px]">
              <img src={ClockIcon} width="20px" />
              <p className="ml-3">Last 2 days</p>
            </div>
          </div>
        </div>
        <div className="space-y-2">
          {Object.keys(groupedWidgets).map((category) => {
            return (
              <>
                <p className="card-category-heading ">{category}</p>
                <div className="flex px-6">
                  {groupedWidgets[category].map((widget, ind) => {
                    return (
                      <Card key={widget.id} title={widget.title}>
                        {widget.isGraphAvailable ? (
                          widget.category == "CSPM Excecutive Dashboard" ? (
                            widget.id == 1 ? (
                              <DonutChart
                                labels={["Connected (2)", "Not Connected (2)"]}
                                data={[2, 2]}
                                colors={["#e1f5fe", "#0091ea"]}
                              />
                            ) : (
                              <DonutChart
                                labels={[
                                  "Failed (10)",
                                  "Warning (20)",
                                  "Not Available (5)",
                                  "Passed (100)",
                                ]}
                                data={[10, 20, 5, 100]}
                                colors={[
                                  "red",
                                  "#ffff00",
                                  "#90a4ae",
                                  "#00c853",
                                ]}
                              />
                            )
                          ) : widget.id == 5 ? (
                            <SegmentedProgressBar
                              data={[
                                {
                                  label: "Critical (10)",
                                  value: 10,
                                  color: "#d50000",
                                },
                                {
                                  label: "High (100)",
                                  value: 100,
                                  color: "#f4511e",
                                },
                                {
                                  label: "Minor (50)",
                                  value: 50,
                                  color: "#ffb74d",
                                },
                                {
                                  label: "Serious (70)",
                                  value: 70,
                                  color: "#ffee58",
                                },
                                {
                                  label: "Major (30)",
                                  value: 30,
                                  color: "#bdbdbd",
                                },
                              ]}
                              text={"Total Vulnerabilities"}
                            />
                          ) : (
                            <SegmentedProgressBar
                              data={[
                                {
                                  label: "Critical (45)",
                                  value: 45,
                                  color: "#bcaaa4",
                                },
                                {
                                  label: "High (20)",
                                  value: 20,
                                  color: "#90a4ae",
                                },
                                {
                                  label: "Minor (80)",
                                  value: 80,
                                  color: "#b2ff59",
                                },
                                {
                                  label: "Serious (100)",
                                  value: 100,
                                  color: "#9fa8da",
                                },
                                {
                                  label: "Major (50)",
                                  value: 50,
                                  color: "#b2ebf2",
                                },
                              ]}
                              text={"Total Images"}
                            />
                          )
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
              </>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default Dashboard;
