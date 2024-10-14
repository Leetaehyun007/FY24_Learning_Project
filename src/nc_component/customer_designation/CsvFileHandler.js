import Papa from "papaparse";
import { locationMapping } from "./locationMapping";

/**
 * CSVファイルを処理する関数
 * @param {File} file - アップロードされたCSVファイル
 * @param {Function} onFileUpload - CSVデータを親コンポーネントに渡すための関数
 */
export const handleCsvFileUpload = (file, onFileUpload) => {
  Papa.parse(file, {
    header: true,
    complete: (result) => {
      const csvData = result.data;
      const newMarkers = csvData
        .map((row) => locationMapping[row.地域]) // CSVの地域列に基づいて座標を取得
        .filter(Boolean); // 有効な地域だけを残す
      onFileUpload(newMarkers); // データを親に渡す
    },
  });
};
