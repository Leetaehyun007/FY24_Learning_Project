import React, { useRef } from "react";
import { handleCsvFileUpload } from "./CsvFileHandler"; // ファイルハンドラをインポート

function CsvUploadButton({ onFileUpload, className }) {
  const fileInputRef = useRef(null);

  // ファイル選択ダイアログを表示する関数
  const handleFileUploadClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  // ファイルが選択されたときの処理
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      handleCsvFileUpload(file, onFileUpload); // ファイルアップロード処理を呼び出す
    }
  };

  return (
    <div>
      <input
        type="file"
        accept=".csv"
        ref={fileInputRef}
        onChange={handleFileChange} // ファイル変更時の処理
        style={{ display: "none" }}
      />
      <button
        type="button"
        onClick={handleFileUploadClick}
        className={className}
      >
        CSV取り込み
      </button>
    </div>
  );
}

export default CsvUploadButton;
