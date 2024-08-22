import { createSlice } from "@reduxjs/toolkit";
import widgets from "../../service/widgets.json";

const initialState = {
  widgets: widgets,
};

const widgetsSlice = createSlice({
  name: "widgets",
  initialState,
  reducers: {
    addWidget: (state, action) => {
      state.widgets.push(action.payload);
    },
    removeWidget: (state, action) => {
      state.widgets = state.widgets.filter(
        (widget) => widget.id !== action.payload.id
      );
    },
    toggleWidgetVisibility: (state, action) => {
      const widget = state.widgets.find(
        (widget) => widget.id === action.payload.id
      );
      if (widget) {
        widget.isVisible = !widget.isVisible;
      }
    },
  },
});

export const { addWidget, removeWidget, toggleWidgetVisibility } =
  widgetsSlice.actions;

export const selectVisibleWidgets = (state) => {
  return state.widgets.widgets.filter((widget) => widget.isVisible);
};

export default widgetsSlice.reducer;
