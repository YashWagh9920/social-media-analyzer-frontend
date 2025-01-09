import { configureStore } from "@reduxjs/toolkit";
import csvDataReducer from "../features/csvDataSlice";

export const store = configureStore({
    reducer : csvDataReducer
});
