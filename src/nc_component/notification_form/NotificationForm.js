import React, { useState } from "react";
import NotificationIcon from "../../image/notification_icon.png";

function NotificationForm({ csvData = [], markers = [] }) {
  const [title, setTitle] = useState("");
  const [image, setImage] = useState(null);
  const [content, setContent] = useState("");
  const [link, setLink] = useState("");
  const [linkTitle, setLinkTitle] = useState("");
  const [pushMessage, setPushMessage] = useState("");
  const [pushEnabled, setPushEnabled] = useState(false);
  const combinedMarkers = markers.length > 0 ? markers : csvData;

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setImage(imageUrl);
    }
  };

  // 確認ダイアログを表示し、"はい"の場合にalertを表示
  const handleSubmit = (event) => {
    event.preventDefault();

    // 確認ダイアログの表示
    const confirmed = window.confirm("配信承認依頼をしますか？");

    if (confirmed) {
      // 全ての項目をリセット
      setTitle("");
      setImage(null);
      setContent("");
      setLink("");
      setLinkTitle("");
      setPushMessage("");
      setPushEnabled(false);

      // "はい"が選択された場合に、アラートを表示
      alert("配信承認依頼をしました。");
    } else {
      // "いいえ"が選択された場合、何も行わない
      console.log("配信承認依頼がキャンセルされました。");
    }
  };

  return (
    <div className="container">
      {/* 左側フォーム */}
      <div className="form-label">
        <h2>お知らせ</h2>
        <div className="label-container">
          タイトル&nbsp;&nbsp;&nbsp;&nbsp;
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="お知らせタイトル (30文字以内)"
            maxLength={30}
            required
          />
        </div>

        <div className="label-container">
          イメージ&nbsp;&nbsp;&nbsp;&nbsp;
          <label className="image-upload-label">
            {/* 非表示のinput要素 */}
            <input
              type="file"
              onChange={handleImageUpload}
              className="file-input"
            />
            {/* 画像を表示：アップロードされた画像か、プレースホルダー画像 */}
            <img
              src={image || NotificationIcon}
              alt="アイコン"
              className="image-upload"
            />
          </label>
        </div>

        <div className="label-container">
          本文&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="お知らせ本文 (600文字以内)"
            maxLength={600}
            rows="5"
            required
          />
        </div>
        <div className="label-container-link">
          リンク先&nbsp;&nbsp;&nbsp;&nbsp;
          <input
            type="url"
            value={link}
            onChange={(e) => setLink(e.target.value)}
            placeholder="https://"
          />
          <br></br>
          <input
            className="label-link2"
            type="text"
            value={linkTitle}
            onChange={(e) => setLinkTitle(e.target.value)}
            placeholder="リンク先URL名 (30文字以内)"
            maxLength={20}
            required
          />
        </div>
        <div
          style={{
            border: "1px solid rgb(225, 225, 225)",
            width: "71%",
            marginLeft: "17px",
          }}
        />
        <div className="label-container">
          <label className="toggle-label">
            Push通知
            <div className="switch">
              <input
                type="checkbox"
                checked={pushEnabled}
                onChange={(e) => setPushEnabled(e.target.checked)}
                className="switch-input"
              />
              <span className="slider"></span>
            </div>
          </label>

          {/* textareaをトグルスイッチに応じて有効化/無効化 */}
          <textarea
            value={pushMessage}
            onChange={(e) => setPushMessage(e.target.value)}
            placeholder="Push通知メッセージ (200文字以内)"
            maxLength={200}
            rows="6"
            disabled={!pushEnabled} // pushEnabledがfalseなら非活性化
            className="push-message-textarea"
          />
        </div>
      </div>

      {/* 右側の検索条件とボタン */}
      <div className="search-conditions">
        <h2>検索条件</h2>
        <p>都道府県指定: 都道府県</p>
        <p>お客さまID指定: お知らせ配信対象.csv</p>
        <p>対象お客さま件数: {combinedMarkers.length}件</p>
        <button className="approve-button" onClick={handleSubmit}>
          配信承認依頼
        </button>
      </div>
    </div>
  );
}

export default NotificationForm;
