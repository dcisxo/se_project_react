import { useContext } from "react";
import "./ToggleSwitch.css";
import { CurrentTemperatureUnitContext } from "../../contexts/CurrentTemperatureUnitContext";

function ToggleSwitch() {
  const { currentTemperatureUnit, handleToggleSwitchChange } = useContext(
    CurrentTemperatureUnitContext
  );

  return (
    <div className="switch">
      <label className="switch__label">
        <input
          type="checkbox"
          className="switch__checkbox"
          checked={currentTemperatureUnit === "C"}
          onChange={handleToggleSwitchChange}
        />
        <span className="switch__slider">
          <span className="switch__temp-f">°F</span>
          <span className="switch__temp-c">°C</span>
        </span>
      </label>
    </div>
  );
}

export default ToggleSwitch;
