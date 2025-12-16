// src/redux/campers/campersThunks.js
import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../api/axiosInstance";

// LISTE + FILTRE + PAGINATION
// arg: { page, limit, filters, append }
export const fetchCampers = createAsyncThunk(
  "campers/fetchCampers",
  async (params, thunkAPI) => {
    try {
      const { page, limit, filters } = params;

      const query = new URLSearchParams();

      if (page) query.set("page", page);
      if (limit) query.set("limit", limit);

      // filters: { location, vehicleType, equipments }
      if (filters?.location) {
        // MockAPI'de alan adı 'location' ise:
        query.set("location", filters.location);
      }

      if (filters?.vehicleType) {
        // API'de alan ismi 'form' ise:
        query.set("form", filters.vehicleType);
      }

      // Ek özellikler
      const eq = filters?.equipments || {};
      if (eq.ac) query.set("AC", true);
      if (eq.kitchen) query.set("kitchen", true);
      if (eq.bathroom) query.set("bathroom", true);
      if (eq.tv) query.set("TV", true);
      if (eq.radio) query.set("radio", true);
      if (eq.refrigerator) query.set("refrigerator", true);
      if (eq.microwave) query.set("microwave", true);
      if (eq.gas) query.set("gas", true);
      if (eq.water) query.set("water", true);

      const response = await axiosInstance.get(`/campers?${query.toString()}`);

      const data = response.data;
      const headers = response.headers || {};

      let items;
      let total;

      if (Array.isArray(data)) {
        // MockAPI default: direkt array dönüyorsa
        items = data;
        const totalHeader =
          headers["x-total-count"] || headers["X-Total-Count"];
        total = totalHeader ? Number(totalHeader) : data.length;
      } else {
        // Görev tasarımındaki gibi { total, items }
        items = data.items || [];
        total = typeof data.total === "number" ? data.total : items.length;
      }

      return { items, total };
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

// DETAY
export const fetchCamperById = createAsyncThunk(
  "campers/fetchCamperById",
  async (id, thunkAPI) => {
    try {
      const { data } = await axiosInstance.get(`/campers/${id}`);
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
