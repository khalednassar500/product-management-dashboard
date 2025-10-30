import { useState } from "react";
import { useLocalStorage } from "../../hooks/useLocalStorage";
import "./ColumnSelector.css";

const ColumnSelector = ({
  columns,
  visibleColumns,
  onVisibleColumnsChange,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [storedColumns, setStoredColumns] = useLocalStorage(
    "visibleColumns",
    visibleColumns
  );

  const handleColumnToggle = (columnKey) => {
    const newVisibleColumns = visibleColumns.includes(columnKey)
      ? visibleColumns.filter((col) => col !== columnKey)
      : [...visibleColumns, columnKey];

    onVisibleColumnsChange(newVisibleColumns);
    setStoredColumns(newVisibleColumns);
  };

  const handleSelectAll = () => {
    const allColumns = Object.keys(columns);
    onVisibleColumnsChange(allColumns);
    setStoredColumns(allColumns);
  };

  const handleSelectNone = () => {
    onVisibleColumnsChange([]);
    setStoredColumns([]);
  };

  return (
    <div className="column-selector">
      <button className="selector-toggle" onClick={() => setIsOpen(!isOpen)}>
        Columns ({visibleColumns.length}) ▼
      </button>

      {isOpen && (
        <div className="selector-dropdown">
          <div className="selector-actions">
            <button onClick={handleSelectAll}>All</button>
            <button onClick={handleSelectNone}>None</button>
          </div>

          {Object.entries(columns).map(([key, column]) => (
            <label key={key} className="column-option">
              <input
                type="checkbox"
                checked={visibleColumns.includes(key)}
                onChange={() => handleColumnToggle(key)}
              />
              {column.header}
            </label>
          ))}
        </div>
      )}
    </div>
  );
};

export default ColumnSelector;
