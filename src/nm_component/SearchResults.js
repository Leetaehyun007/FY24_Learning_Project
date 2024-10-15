import React from "react";

// 配信状態の色を決定する関数
const getStatusColor = (status) => {
  switch (status) {
    case "承認待ち":
      return "#ECB429";
    case "承認完了":
      return "#9ECCE9";
    case "差し戻し":
      return "gray";
    case "承認待ち(時間経過)":
      return "darkgray";
    default:
      return "lightgray";
  }
};

function SearchResults({ data, onRowClick }) {
  return (
    <div className="search-results">
      <h2>検索結果</h2>
      <table>
        <thead>
          <tr>
            <th>タイトル</th>
            <th>Push通知</th>
            <th>配信状態</th>
            <th>配信日時 (配信予定日時)</th>
            <th>対象お客さま件数</th>
            <th>既読</th>
          </tr>
        </thead>
        <tbody>
          {data.map((row, index) => (
            <tr key={index} onClick={() => onRowClick(row)}>
              <td>{row.title}</td>
              <td>{row.push ? "○" : "-"}</td>
              <td>
                <span
                  className="status"
                  style={{ backgroundColor: getStatusColor(row.status) }}
                >
                  {row.status}
                </span>
              </td>
              <td>{row.scheduled_delivery}</td>
              <td>{row.target_customers}</td>
              <td>{row.read}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default SearchResults;
