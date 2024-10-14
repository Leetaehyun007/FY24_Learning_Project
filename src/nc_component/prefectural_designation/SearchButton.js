import React, { useState } from "react";
import GoogleMapMarker from "../customer_designation/GoogleMapMarker"; // GoogleMapMarkerをインポート
import mockData from "../../json_db/Mock.json"; // JSONデータをインポート
import { locationMapping } from "../customer_designation/locationMapping"; // 座標マッピングをインポート

function SearchButton({ className }) {
  const [markers, setMarkers] = useState([]);

  // 検索ボタンがクリックされた時にJSONデータをマーカーに設定
  const handleSearch = () => {
    const locations = mockData
      .map((location) => locationMapping[location.area]) // JSONのareaに基づいて座標を取得
      .filter(Boolean); // 座標が有効なエリアだけを残す
    setMarkers(locations); // マーカーの位置を更新
  };

  return (
    <div>
      <button className={className} onClick={handleSearch}>
        検索
      </button>
      {/* GoogleMapMarkerにmarkersを渡す */}
      <GoogleMapMarker markerData={markers} />
    </div>
  );
}

export default SearchButton;
