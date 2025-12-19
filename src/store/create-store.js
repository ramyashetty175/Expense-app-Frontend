import { configureStore } from "@reduxjs/toolkit";
import categoryReducer from "../slices/category-slice";
import expenseReducer from "../slices/expense-slice";

const createStore = () => {
    return configureStore({
        reducer: {
            category: categoryReducer,
            expense: expenseReducer
        }
    })
}

export default createStore;