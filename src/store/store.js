import { configureStore } from "@reduxjs/toolkit";
import widgetsReducer from "./slices/widgetSlice";

export const store = configureStore({
  reducer: {
    widgets: widgetsReducer,
  },
});
