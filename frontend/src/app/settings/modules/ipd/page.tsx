"use client";
import { useState } from "react";
import styles from "./ipd.module.css";

export default function IpdSettingsPage() {
  const [includeLetterhead, setIncludeLetterhead] = useState(true);
  const [medicationType, setMedicationType] = useState<"med" | "product">("product");
  const [startNumber, setStartNumber] = useState("0");

  const [wardType, setWardType] = useState("Cabin");
  const [wardName, setWardName] = useState("");
  const [shortCode, setShortCode] = useState("");
  const [beds, setBeds] = useState("0");

  return (
    <div className={styles.drawer}>
      <h2 className={styles.title}>IPD Settings</h2>

      {/* Include Letterhead */}
      <label className={styles.checkboxRow}>
        <input
          type="checkbox"
          checked={includeLetterhead}
          onChange={(e) => setIncludeLetterhead(e.target.checked)}
        />
        Include letterhead on print
      </label>

      {/* Medication Component */}
      <h3 className={styles.sectionTitle}>Medication Component</h3>
      <div className={styles.radioRow}>
        <label>
          <input
            type="radio"
            checked={medicationType === "med"}
            onChange={() => setMedicationType("med")}
          />
          Medication
        </label>

        <label>
          <input
            type="radio"
            checked={medicationType === "product"}
            onChange={() => setMedicationType("product")}
          />
          Product Medication
        </label>
      </div>

      {/* IPD Number */}
      <div className={styles.row}>
        <label className={styles.label}>Start IPD Number From</label>
        <input
          className={styles.input}
          value={startNumber}
          type="number"
          onChange={(e) => setStartNumber(e.target.value)}
        />
        <button className={styles.updateBtn}>UPDATE</button>
      </div>

      {/* Add Wards Section */}
      <h3 className={styles.sectionTitle}>Add Wards and Cabins</h3>

      <div className={styles.wardRow}>
        {/* Ward Type Select */}
        <select
          className={styles.select}
          value={wardType}
          onChange={(e) => setWardType(e.target.value)}
        >
          <option value="Cabin">Cabin</option>
          <option value="Ward">Ward</option>
        </select>

        {/* Fields */}
        <input
          className={styles.input}
          placeholder="Ward Name"
          value={wardName}
          onChange={(e) => setWardName(e.target.value)}
        />
        <input
          className={styles.input}
          placeholder="Short Code"
          value={shortCode}
          onChange={(e) => setShortCode(e.target.value)}
        />
        <input
          className={styles.input}
          type="number"
          placeholder="Beds"
          value={beds}
          onChange={(e) => setBeds(e.target.value)}
        />
      </div>

      <button className={styles.addBtn}>ADD WARD AND BEDS</button>
    </div>
  );
}
