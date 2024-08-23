import { useState } from "react";
import PlusIcon from "../../assets/plus.png";
import Drawer from "../common/Drawer";
import { useDispatch, useSelector } from "react-redux";
import { groupBy } from "../../helpers/helper";
import Tabs from "../common/Tabs";
import { toggleWidgetVisibility } from "../../store/slices/widgetSlice";

const ManageWidgets = ({ PlusIconFirst = false }) => {
  const [isDrawerOpen, setDrawerOpen] = useState(false);
  const dispatch = useDispatch();
  const widgets = useSelector((state) => state.widgets.widgets);

  const groupedWidget = groupBy(widgets, "category");

  const handleToggleVisibility = (id) => {
    dispatch(toggleWidgetVisibility({ id }));
  };

  const tabItems = Object.keys(groupedWidget).map((category) => {
    return {
      label: category.split(" ")[0],
      content: (
        <>
          <div className="flex flex-col">
            {groupedWidget[category].map((widget) => {
              return (
                <div className="flex gap-4" key={widget.id}>
                  <input
                    type="checkbox"
                    className="form-checkbox text-blue-600"
                    id={widget.id}
                    checked={widget.isVisible}
                    onChange={() => handleToggleVisibility(widget.id)}
                  />
                  <label
                    htmlFor={widget.id}
                    className="text-gray-700 cursor-pointer"
                  >
                    {widget.title}
                  </label>
                </div>
              );
            })}
          </div>
        </>
      ),
    };
  });

  const handleClick = () => {
    setDrawerOpen(true);
  };

  const handleOnClose = () => {
    setDrawerOpen(false);
  };
  const handleOnConfirm = () => {
    setDrawerOpen(false);
  };
  const handleOnCancel = () => {
    setDrawerOpen(false);
  };

  return (
    <>
      <div
        className="rounded-md border-2 cursor-pointer border-grey-200 bg-white flex justify-center items-center w-[150px] px-3 py-1 mx-auto hover:bg-blue-500 hover:text-white "
        onClick={handleClick}
      >
        {PlusIconFirst ? (
          <>
            <img src={PlusIcon} width="15px" />
            <h4 className="m-1"> Add Widget </h4>
          </>
        ) : (
          <>
            <h4 className="m-1"> Add Category </h4>
            <img src={PlusIcon} width="15px" />
          </>
        )}
      </div>
      <Drawer
        isOpen={isDrawerOpen}
        onClose={handleOnClose}
        onConfirm={handleOnConfirm}
        onCancel={handleOnCancel}
        okText="Confirm"
        cancelText="Cancel"
      >
        <p>Personalize your dashboard by adding the following widget</p>
        <Tabs items={tabItems} />
      </Drawer>
    </>
  );
};

export default ManageWidgets;
