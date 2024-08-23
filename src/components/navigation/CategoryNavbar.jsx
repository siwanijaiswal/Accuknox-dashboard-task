import React from "react";
import DotsIcon from "../../assets/dots.png";
import RotateIcon from "../../assets/rotation.png";
import ManageWidgets from "../widget/ManageWidgets";
import ClockIcon from "../../assets/clock.png";

const CategoryNavbar = () => {
  return (
    <div>
      <div className="flex justify-between p-6">
        <h2 className="text-xl font-bold">CNAPP Dashboard</h2>
        <div className="flex gap-4">
          <div>
            <ManageWidgets />
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
    </div>
  );
};

export default CategoryNavbar;
