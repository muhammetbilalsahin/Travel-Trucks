// src/components/Filters/Filters.jsx
import { useDispatch, useSelector } from "react-redux";
import styles from "./Filters.module.css";
import {
  setLocation,
  setVehicleType,
  toggleEquipment,
  resetFilters,
} from "../../redux/filters/filtersSlice";

export default function Filters() {
  const dispatch = useDispatch();
  const { location, vehicleType, equipments } = useSelector(
    (state) => state.filters
  );

  const handleLocationChange = (e) => {
    dispatch(setLocation(e.target.value));
  };

  const handleVehicleTypeChange = (e) => {
    dispatch(setVehicleType(e.target.value));
  };

  const handleEquipmentChange = (key) => {
    dispatch(toggleEquipment(key));
  };

  const handleReset = () => {
    dispatch(resetFilters());
  };

  return (
    <aside className={styles.box}>
      <h2 className={styles.title}>Filters</h2>

      <div className={styles.section}>
        <p className={styles.label}>Location</p>
        <input
          type="text"
          value={location}
          onChange={handleLocationChange}
          placeholder="Enter location"
          className={styles.input}
        />
      </div>

      <div className={styles.section}>
        <p className={styles.label}>Vehicle type</p>
        <div className={styles.radioGroup}>
          <label className={styles.radioLabel}>
            <input
              type="radio"
              name="vehicleType"
              value=""
              checked={vehicleType === ""}
              onChange={handleVehicleTypeChange}
            />
            Any
          </label>
          <label className={styles.radioLabel}>
            <input
              type="radio"
              name="vehicleType"
              value="panelTruck"
              checked={vehicleType === "panelTruck"}
              onChange={handleVehicleTypeChange}
            />
            Panel Truck
          </label>
          <label className={styles.radioLabel}>
            <input
              type="radio"
              name="vehicleType"
              value="alcove"
              checked={vehicleType === "alcove"}
              onChange={handleVehicleTypeChange}
            />
            Alcove
          </label>
          <label className={styles.radioLabel}>
            <input
              type="radio"
              name="vehicleType"
              value="fullyIntegrated"
              checked={vehicleType === "fullyIntegrated"}
              onChange={handleVehicleTypeChange}
            />
            Fully Integrated
          </label>
        </div>
      </div>

      <div className={styles.section}>
        <p className={styles.label}>Equipments</p>
        <div className={styles.checkboxGroup}>
          <label className={styles.checkboxLabel}>
            <input
              type="checkbox"
              checked={equipments.ac}
              onChange={() => handleEquipmentChange("ac")}
            />
            AC
          </label>
          <label className={styles.checkboxLabel}>
            <input
              type="checkbox"
              checked={equipments.kitchen}
              onChange={() => handleEquipmentChange("kitchen")}
            />
            Kitchen
          </label>
          <label className={styles.checkboxLabel}>
            <input
              type="checkbox"
              checked={equipments.bathroom}
              onChange={() => handleEquipmentChange("bathroom")}
            />
            Bathroom
          </label>
          <label className={styles.checkboxLabel}>
            <input
              type="checkbox"
              checked={equipments.tv}
              onChange={() => handleEquipmentChange("tv")}
            />
            TV
          </label>
          <label className={styles.checkboxLabel}>
            <input
              type="checkbox"
              checked={equipments.radio}
              onChange={() => handleEquipmentChange("radio")}
            />
            Radio
          </label>
        </div>
      </div>

      <button type="button" className={styles.reset} onClick={handleReset}>
        Reset filters
      </button>
    </aside>
  );
}
