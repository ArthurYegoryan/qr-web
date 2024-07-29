import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    cities: [],
};

export const citiesSlice = createSlice({
    name: "cities",
    initialState,
    reducers: {
        saveCities: (state, cities) => {
            state.cities = cities;
        },
    }
});

export const { saveCities } = citiesSlice.actions;
export default citiesSlice.reducer;