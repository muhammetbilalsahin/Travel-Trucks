// src/redux/filters/filtersSlice.js
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  location: "",
  vehicleType: "", // örn: 'panelTruck' | 'alcove' | 'fullyIntegrated'
  equipments: {
    ac: false,
    kitchen: false,
    bathroom: false,
    tv: false,
    radio: false,
    refrigerator: false,
    microwave: false,
    gas: false,
    water: false,
  },
};

const filtersSlice = createSlice({
  name: "filters",
  initialState,
  reducers: {
    setLocation(state, action) {
      state.location = action.payload;
    },
    setVehicleType(state, action) {
      state.vehicleType = action.payload;
    },
    toggleEquipment(state, action) {
      const key = action.payload;
      state.equipments[key] = !state.equipments[key];
    },
    resetFilters() {
      return initialState;
    },
  },
});

export const { setLocation, setVehicleType, toggleEquipment, resetFilters } =
  filtersSlice.actions;

export default filtersSlice.reducer;
