import { useState } from "react";

const Tabs = ({ items }) => {
  const [activeTab, setActiveTab] = useState(0);

  return (
    <div className="w-full">
      <div className="flex border-b">
        {items.map((item, index) => (
          <button
            key={index}
            className={`py-2 px-4 text-sm font-medium transition-colors ${
              activeTab === index
                ? "border-b-2 border-blue-500 text-blue-500"
                : "border-b-2 border-transparent text-gray-600 hover:text-blue-500"
            }`}
            onClick={() => setActiveTab(index)}
          >
            {item.label}
          </button>
        ))}
      </div>
      <div className="p-4">
        {items[activeTab] && (
          <div className="text-gray-800">{items[activeTab].content}</div>
        )}
      </div>
    </div>
  );
};

export default Tabs;
