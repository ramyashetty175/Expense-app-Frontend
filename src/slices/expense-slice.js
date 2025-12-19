import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "../config/axios";

export const fetchUserExpenses = createAsyncThunk("expense/fetchUserExpenses", async (undefined, { rejectWithValue }) => {
    try {
        const response = await axios.get('/api/expenses', { headers: { Authorization: localStorage.getItem('token')}});
        console.log(response.data);
        return response.data;
    } catch(err) {
        console.log(err);
        return rejectWithValue(err.message);
    }
})

export const createExpense = createAsyncThunk("expense/createExpense", async ({ form, resetForm }, { rejectWithValue }) => {
    try {
        const response = await axios.post('/api/expenses', form, { headers: { Authorization: localStorage.getItem('token')}});
        resetForm();
        console.log(response);
        return response.data;
    } catch(err) {
        console.log(err);
        return rejectWithValue(err.response.data.error);
    }
})

const expenseSlice = createSlice({
    name: "expense",
    initialState: {
        data: [],
        loading: false,
        errors: null,
        
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchUserExpenses.pending,(state)=>{
                state.loading = true;
                state.data = [];
                state.errors = null;
            })
            .addCase(fetchUserExpenses.fulfilled,(state,action)=>{
                state.data = action.payload;
                state.loading = false;
                state.errors = null;
            })
            .addCase(fetchUserExpenses.rejected,(state,action)=>{
                state.data = [];
                state.errors = action.payload;
                state.loading = false;
            })
            .addCase(createExpense.fulfilled,(state,action)=>{
                state.data.push(action.payload);
            })
            .addCase(createExpense.rejected,(state,action)=>{
                state.errors = action.payload;
                state.data = [];
            })
    }
})

export const { resetExpenses } = expenseSlice.actions;

export default expenseSlice.reducer;