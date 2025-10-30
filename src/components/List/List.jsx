import React, { useState } from "react";
import "./List.css";

const List = ({
  data,
  columns,
  visibleColumns,
  sortConfig,
  onSort,
  onDataUpdate,
}) => {
  const [editingCell, setEditingCell] = useState(null);
  const [editValue, setEditValue] = useState("");

  const handleSort = (key) => {
    if (!columns[key]?.sortable) return;

    let direction = "asc";
    if (sortConfig.key === key && sortConfig.direction === "asc") {
      direction = "desc";
    }
    onSort({ key, direction });
  };

  const handleEditStart = (rowId, columnKey, value) => {
    if (!columns[columnKey]?.editable) return;

    setEditingCell({ rowId, columnKey });
    setEditValue(value);
  };

  const handleEditSave = () => {
    if (editingCell) {
      onDataUpdate(editingCell.rowId, editingCell.columnKey, editValue);
      setEditingCell(null);
      setEditValue("");
    }
  };

  const handleEditCancel = () => {
    setEditingCell(null);
    setEditValue("");
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleEditSave();
    } else if (e.key === "Escape") {
      handleEditCancel();
    }
  };

  const getSortIcon = (key) => {
    if (sortConfig.key !== key) return "↕️";
    return sortConfig.direction === "asc" ? "↑" : "↓";
  };

  const renderCellContent = (item, columnKey) => {
    const columnConfig = columns[columnKey];

    if (
      editingCell?.rowId === item.id &&
      editingCell?.columnKey === columnKey
    ) {
      return (
        <div className="editing-cell">
          <input
            type="text"
            value={editValue}
            onChange={(e) => setEditValue(e.target.value)}
            onKeyDown={handleKeyPress}
            onBlur={handleEditSave}
            autoFocus
            className="edit-input"
          />
          <div className="edit-actions">
            <button onClick={handleEditSave} className="save-btn">
              ✓
            </button>
            <button onClick={handleEditCancel} className="cancel-btn">
              ✕
            </button>
          </div>
        </div>
      );
    }

    return (
      <div
        className={`cell-content ${columnConfig?.editable ? "editable" : ""}`}
        onClick={() =>
          handleEditStart(item.id, columnKey, columnConfig.render(item))
        }
      >
        {columnConfig?.render(item)}
        {columnConfig?.editable && <span className="edit-hint">✏️</span>}
      </div>
    );
  };

  return (
    <div className="list-container">
      <table className="list-table">
        <thead>
          <tr>
            {visibleColumns.map((columnKey) => (
              <th
                key={columnKey}
                onClick={() => handleSort(columnKey)}
                className={columns[columnKey]?.sortable ? "sortable" : ""}
              >
                <span>
                  {columns[columnKey]?.header}
                  {columns[columnKey]?.sortable && (
                    <span className="sort-icon">{getSortIcon(columnKey)}</span>
                  )}
                </span>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((item) => (
            <tr key={item.id}>
              {visibleColumns.map((columnKey) => (
                <td key={columnKey}>{renderCellContent(item, columnKey)}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>

      {data.length === 0 && (
        <div className="no-data">No products found matching your criteria.</div>
      )}
    </div>
  );
};

export default List;
