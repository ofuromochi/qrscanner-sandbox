import React, { useState, useRef, useEffect } from 'react';
import QrScanner from 'qr-scanner';
import './App.css';

function App() {
  const [scanResult, setScanResult] = useState(null);
  const videoRef = useRef(null);
  const [qrScanner, setQrScanner] = useState(null);

  useEffect(() => {
    startScanner();
    // クリーンアップ関数
    return () => {
      if (qrScanner) {
        qrScanner.stop();
        qrScanner.destroy();
      }
    };
  }, []); // コンポーネントマウント時に1回だけ実行

  const startScanner = async () => {
    try {
      if (!videoRef.current) return;

      const scanner = new QrScanner(
        videoRef.current,
        result => {
          console.log('QRコードを検出:', result);
          setScanResult(result.data);
          scanner.stop();
        },
        {
          returnDetailedScanResult: true,
          highlightScanRegion: true,
          highlightCodeOutline: true,
          maxScansPerSecond: 5,
          calculateScanRegion: (video) => {
            // ビデオ要素のサイズを取得
            const videoWidth = video.videoWidth;
            const videoHeight = video.videoHeight;
            
            // スキャン領域のサイズを計算（画面の60%）
            const scanRegionSize = Math.min(videoWidth, videoHeight) * 0.4;
            
            // 中央に配置するための位置を計算
            const x = (videoWidth - scanRegionSize) / 2;
            const y = (videoHeight - scanRegionSize) / 2;
            
            return {
              x: x,
              y: y,
              width: scanRegionSize,
              height: scanRegionSize,
              // ダウンスケール後のサイズ（パフォーマンス向上のため）
              downScaledWidth: 400,
              downScaledHeight: 400,
            };
          }
        }
      );

      await scanner.start();
      setQrScanner(scanner);

    } catch (error) {
      console.error('スキャナーエラー:', error);
      alert('カメラの起動に失敗しました');
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <h3>qr-scanner</h3>
        
        {scanResult ? (
          <div className="result-container">
            <p>スキャン結果:</p>
            <p>{scanResult}</p>
            <button 
              onClick={() => {
                setScanResult(null);
                startScanner(); // 再スキャン開始
              }}
              className="scanner-button"
            >
              再スキャン
            </button>
          </div>
        ) : (
          <div className="scanner-container">
            <video ref={videoRef} />
          </div>
        )}
      </header>
    </div>
  );
}

export default App;
