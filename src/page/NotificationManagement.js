import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import SearchResults from "../nm_component/SearchResults";
import mockData from "../json_db/nm_search_results_mock.json"; // JSONデータのインポート

function NotificationManagement() {
  const [status, setStatus] = useState("all");
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [filteredData, setFilteredData] = useState([]);
  const [selectedNotification, setSelectedNotification] = useState(null); // クリックされた通知

  // 検索ボタンを押した時の処理
  const handleSearch = () => {
    const filteredResults = mockData.filter((item) => {
      const itemDate = new Date(item.scheduled_delivery);
      const matchesStatus = status === "all" || item.status === status;
      const matchesDateRange = itemDate >= startDate && itemDate <= endDate;

      return matchesStatus && matchesDateRange;
    });
    setFilteredData(filteredResults);
    setSelectedNotification(null); // 新しい検索時に選択をクリア
  };

  // 行クリック時の処理
  const handleRowClick = (notification) => {
    // 検索結果内にクリックされた行がある場合のみ選択
    const isNotificationInSearchResults = filteredData.some(
      (item) => item.id === notification.id
    );

    if (notification.status === "承認待ち" && isNotificationInSearchResults) {
      setSelectedNotification(notification); // 承認待ちかつ検索結果にある場合のみ選択
    } else {
      setSelectedNotification(null); // クリア
    }
  };

  return (
    <div className="notification_Management">
      <div className="bar">お知らせ管理</div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <h2>&nbsp;&nbsp;&nbsp;&nbsp;検索条件</h2>
        <button className="custom-button" onClick={handleSearch}>
          検索
        </button>
      </div>

      <div className="status-container">
        配信状態
        <div className="status-options">
          <label>
            <input
              type="radio"
              name="status"
              value="all"
              checked={status === "all"}
              onChange={() => setStatus("all")}
            />
            全て
          </label>
          <label>
            <input
              type="radio"
              name="status"
              value="承認待ち"
              checked={status === "承認待ち"}
              onChange={() => setStatus("承認待ち")}
            />
            承認待ち
          </label>
          <label>
            <input
              type="radio"
              name="status"
              value="承認完了"
              checked={status === "承認完了"}
              onChange={() => setStatus("承認完了")}
            />
            承認完了
          </label>
          <label>
            <input
              type="radio"
              name="status"
              value="差し戻し"
              checked={status === "差し戻し"}
              onChange={() => setStatus("差し戻し")}
            />
            差し戻し
          </label>
        </div>
      </div>

      <div className="status-container">
        <label>配信日 (予定日)</label>
        <div className="date-picker-container">
          <DatePicker
            selected={startDate}
            onChange={(date) => setStartDate(date)}
            dateFormat="yyyy/MM/dd"
          />
          <span> ~ </span>
          <DatePicker
            selected={endDate}
            onChange={(date) => setEndDate(date)}
            dateFormat="yyyy/MM/dd"
          />
        </div>
      </div>
      <hr />

      {/* 検索結果を表示 */}
      <SearchResults data={filteredData} onRowClick={handleRowClick} />

      <hr />

      {/* 承認待ちの通知が選択された時にコンテンツ内容とボタンを表示 */}
      {selectedNotification && (
        <div className="action-buttons-container">
          <h3>検索条件</h3>
          <p>都道府県指定: 都道府県</p>
          <p>お客さまID指定: お知らせ配信対象.csv</p>
          <p>対象お客さま件数: 110件</p>
          <h3>配信対象者件数</h3>
          <p>お客さま一覧: CSVダウンロード</p>
          <button className="action-button">差し戻し</button>&nbsp;&nbsp;&nbsp;
          <button className="action-button">配信承認</button>
        </div>
      )}
    </div>
  );
}

export default NotificationManagement;
