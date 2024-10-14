import React, { useState } from "react";
import CsvUploadButton from "../nc_component/customer_designation/CsvUploadButton";
import GoogleMapMarker from "../nc_component/customer_designation/GoogleMapMarker";
import { locationMapping } from "../nc_component/customer_designation/locationMapping";
import mockData from "../json_db/nc_map_reference_mock.json";
import NotificationForm from "../nc_component/notification_form/NotificationForm";

function NotificationCreation() {
  const [selectedOption, setSelectedOption] = useState("option1");
  const [selectedPrefecture, setSelectedPrefecture] = useState("");
  const [markers, setMarkers] = useState([]);
  const [data, setData] = useState([]);

  const handleOptionChange = (event) => {
    setSelectedOption(event.target.value);
    setMarkers([]);
  };

  const handlePrefectureChange = (event) => {
    setSelectedPrefecture(event.target.value);
  };

  const handleFileUpload = (csvData) => {
    setData(csvData);
    console.log("アップロードされたデータ:", csvData);
  };

  const handleSearch = () => {
    if (selectedOption === "option1") {
      if (selectedPrefecture) {
        const filteredLocations = mockData
          .filter(
            (location) =>
              location.area.toLowerCase() === selectedPrefecture.toLowerCase()
          )
          .map((location) => locationMapping[location.area.toLowerCase()])
          .filter(Boolean);

        if (filteredLocations.length > 0) {
          setMarkers(filteredLocations);
        } else {
          console.log("選択された都道府県に対応するエリアがありません");
        }
      } else {
        console.log("都道府県が選択されていません");
      }
    } else if (selectedOption === "option2") {
      if (data.length > 0) {
        const csvLocations = data
          .map((row) => locationMapping[row.地域])
          .filter(Boolean);

        if (csvLocations.length > 0) {
          setMarkers(csvLocations);
        } else {
          console.log("有効な地域データがCSVにありません");
        }
      } else {
        console.log("CSVデータがありません");
      }
    }
  };

  return (
    <div className="notification_creation">
      <div className="bar">お知らせ作成</div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <h2>検索条件</h2>
        <button className="custom-button" onClick={handleSearch}>
          検索
        </button>
      </div>

      <div className="radio-group">
        {/* 都道府県指定 */}
        <label
          className={`radio-label ${
            selectedOption === "option2" ? "grayed-out" : ""
          }`}
        >
          <input
            type="radio"
            value="option1"
            checked={selectedOption === "option1"}
            onChange={handleOptionChange}
          />
          都道府県指定&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          <div className="dropdown-container">
            <label htmlFor="prefecture" className="dropdown-label"></label>
            <select
              id="prefecture"
              className="dropdown"
              value={selectedPrefecture}
              onChange={handlePrefectureChange}
              disabled={selectedOption === "option2"}
            >
              <option value="">都道府県</option>
              <option value="東京">東京</option>
              <option value="大阪">大阪</option>
              <option value="北海道">北海道</option>
              <option value="福岡">福岡</option>
            </select>
          </div>
        </label>
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;※電気契約の受電場所が対象となります。
        <br />
        <br />
        <br />
        {/* お客様ID指定 */}
        <label
          className={`radio-label ${
            selectedOption === "option1" ? "grayed-out" : ""
          }`}
        >
          <input
            type="radio"
            value="option2"
            checked={selectedOption === "option2"}
            onChange={handleOptionChange}
          />
          お客さまID指定&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          <CsvUploadButton
            onFileUpload={handleFileUpload}
            className="csv-button"
            disabled={selectedOption === "option1"}
          />
          <br />
        </label>
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;※取り込み最大数：1,000件
        <br />
        <br />
        <hr></hr>
        {/* GoogleMapMarkerを横幅いっぱいに表示 */}
        <div className="map-container">
          <GoogleMapMarker csvData={data} markers={markers} />
        </div>
        <hr></hr>
        <div className="map-container">
          <NotificationForm csvData={data} markers={markers} />
        </div>
      </div>
    </div>
  );
}

export default NotificationCreation;
