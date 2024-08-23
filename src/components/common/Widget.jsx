import { useRef, useState } from "react";
import AddWidgetForm from "../widget/WidgetForm";
import AddWidgetDrawer from "./AddWidgetDrawer";
import PlusIcon from "../../assets/plus.png";

const Card = ({ title, children }) => {
  const [isDrawerOpen, setDrawerOpen] = useState(false);
  const formRef = useRef(null);

  const handleOnClose = () => {
    setDrawerOpen(false);
  };

  const handleOnConfirm = () => {
    if (formRef.current) {
      formRef.current.submitForm();
    }
    setDrawerOpen(false);
  };

  return (
    <>
      <AddWidgetDrawer
        title={"Add New Widget"}
        isOpen={isDrawerOpen}
        onClose={handleOnClose}
      >
        <AddWidgetForm ref={formRef} onConfirm={handleOnConfirm} />
      </AddWidgetDrawer>
      <div className="rounded-lg border-2 border-white bg-white  min-h-64 m-2">
        {title ? (
          <>
            <p className="text-md font-bold py-2 px-3">{title}</p>
            <div className="p-4">{children}</div>
          </>
        ) : (
          <div className="flex justify-center items-center w-full h-full">
            <div
              className="rounded-md border-2 cursor-pointer border-grey-200 bg-white flex justify-center items-center px-3 py-1 mx-auto hover:bg-blue-500 hover:text-white "
              onClick={() => setDrawerOpen(true)}
            >
              <img src={PlusIcon} width="15px" />
              <h4 className="m-1"> Add Widget </h4>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Card;
