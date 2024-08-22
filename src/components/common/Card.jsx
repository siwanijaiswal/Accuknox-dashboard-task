import AddWidget from "../widget/AddWidget";

const Card = ({ title, children }) => {
  return (
    <>
      <div className="rounded-lg border-2 border-white bg-white w-1/3 min-h-64 mx-2">
        {title ? (
          <>
            <p className="text-md font-bold py-2 px-3">{title}</p>
            <div className="p-4">{children}</div>
          </>
        ) : (
          <div className="flex justify-center items-center w-full h-full">
            <AddWidget PlusIconFirst={true} />
          </div>
        )}
      </div>
    </>
  );
};

export default Card;
