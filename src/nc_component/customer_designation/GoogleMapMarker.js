import React from "react";
import { GoogleMap, Marker } from "@react-google-maps/api";

function GoogleMapMarker({ csvData = [], markers = [] }) {
  // 優先的にmarkersを使用し、なければcsvDataを使用する
  const combinedMarkers = markers.length > 0 ? markers : csvData;

  return (
    <div>
      <h2>検索結果（{combinedMarkers.length}件）</h2>
      <div style={{ height: "400px", width: "100%" }}>
        <GoogleMap
          mapContainerStyle={{ width: "100%", height: "100%" }}
          center={{ lat: 35.682839, lng: 139.759455 }} // 東京を中心に設定
          zoom={4}
        >
          {combinedMarkers.map((position, index) => (
            <Marker key={index} position={position} />
          ))}
        </GoogleMap>
      </div>
    </div>
  );
}

export default GoogleMapMarker;
