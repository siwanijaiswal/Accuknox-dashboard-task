import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import {
  addWidget,
  selectCategories,
  selectGraphTypes,
} from "../../store/slices/widgetSlice";

const defaultFormState = {
  title: "",
  category: "",
  type: "",
  graphData: [{ label: "", value: "", color: "#000000" }],
};

const AddWidgetForm = ({ onConfirm }) => {
  const [formState, setFormState] = useState(defaultFormState);
  const dispatch = useDispatch();

  const categories = useSelector(selectCategories);
  const graphTypes = useSelector(selectGraphTypes);

  const handleAddRow = () => {
    setFormState((prevState) => ({
      ...prevState,
      graphData: [
        ...prevState.graphData,
        { label: "", value: "", color: "#000000" },
      ],
    }));
  };

  const handleRemoveRow = (index) => {
    setFormState((prevState) => ({
      ...prevState,
      graphData: prevState.graphData.filter((_, i) => i !== index),
    }));
  };

  const handleInputChange = (index, event) => {
    const { name, value } = event.target;
    const newGraphData = [...formState.graphData];
    newGraphData[index][name] = name === "value" ? parseFloat(value) : value;

    setFormState((prevState) => ({
      ...prevState,
      graphData: newGraphData,
    }));
  };

  const resetFormState = () => {
    setFormState(defaultFormState);
  };

  const handleFormChange = (event) => {
    const { name, value } = event.target;
    setFormState((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    localStorage.setItem("add_widget_data", JSON.stringify(formState));
    dispatch(
      addWidget({
        category: formState.category,
        title: formState.title,
        graph: {
          type: formState.type,
          data: formState.graphData,
        },
      })
    );
    resetFormState();
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-lg mx-auto p-4 bg-white shadow-md rounded-lg space-y-4"
    >
      <div className="flex flex-col">
        <label className="mb-2 font-semibold text-gray-700">Category</label>
        <select
          required
          name="category"
          className="p-2 border border-gray-300 rounded-md"
          value={formState.category}
          onChange={handleFormChange}
        >
          <option value="" disabled>
            Select a category
          </option>
          {categories.map((cat, index) => (
            <option key={index} value={cat}>
              {cat}
            </option>
          ))}
        </select>
      </div>

      <div className="flex flex-col">
        <label className="mb-2 font-semibold text-gray-700">Graph Type</label>
        <select
          required
          name="type"
          className="p-2 border border-gray-300 rounded-md"
          value={formState.type}
          onChange={handleFormChange}
        >
          <option value="" disabled>
            Select a graph type
          </option>
          {graphTypes.map((typ, index) => (
            <option key={index} value={typ}>
              {typ}
            </option>
          ))}
        </select>
      </div>

      <div className="flex flex-col">
        <label className="mb-2 font-semibold text-gray-700">Title</label>
        <input
          required
          type="text"
          name="title"
          className="p-2 border border-gray-300 rounded-md"
          value={formState.title}
          onChange={handleFormChange}
        />
      </div>

      <div className="flex flex-col items-start">
        <label className="mb-2 font-semibold text-gray-700">Graph Data</label>
        {formState.graphData.map((data, index) => (
          <div key={index} className="flex space-x-2 items-center">
            <input
              required
              type="text"
              name="label"
              placeholder="Label"
              className="p-2 border border-gray-300 rounded-md flex-grow"
              value={data.label}
              onChange={(e) => handleInputChange(index, e)}
            />
            <input
              required
              type="number"
              name="value"
              placeholder="Value"
              className="p-2 border border-gray-300 rounded-md w-20"
              value={data.value}
              onChange={(e) => handleInputChange(index, e)}
            />
            <input
              type="color"
              name="color"
              className="p-2 border border-gray-300 rounded-full w-12 h-12 cursor-pointer"
              value={data.color}
              onChange={(e) => handleInputChange(index, e)}
            />
            <button
              type="button"
              onClick={() => handleRemoveRow(index)}
              className="text-red-500 hover:text-red-700"
            >
              Remove
            </button>
          </div>
        ))}
        <button
          type="button"
          onClick={handleAddRow}
          className="bg-blue-500 text-white p-2 rounded-md mt-2"
        >
          Add Row
        </button>
      </div>

      <button
        type="submit"
        onClick={onConfirm}
        className="bg-green-500 text-white p-2 rounded-md w-full"
      >
        Submit
      </button>
    </form>
  );
};

export default AddWidgetForm;
