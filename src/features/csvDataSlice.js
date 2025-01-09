import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    csvData : []
}


export const csvDataSlice = createSlice({
    name : "CSVData",
    initialState,
    reducers : {
        setCSVData : (state, action) => {
            state.csvData = action.payload
        }
    }
})

export const { setCSVData } = csvDataSlice.actions

export default csvDataSlice.reducer 