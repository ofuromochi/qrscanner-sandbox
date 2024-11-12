import React, { useState } from 'react';
import './App.css';

function App() {
  const [isScanning, setIsScanning] = useState(false);

  const startScanner = () => {
    setIsScanning(true);
    // ここで後ほどQRスキャナーの機能を実装します
  };

  return (
    <div className="App">
      <header className="App-header">
        {!isScanning ? (
          <button 
            onClick={startScanner}
            className="scanner-button"
          >
            QR-scannerを起動
          </button>
        ) : (
          <div className="scanner-container">
            {/* ここに後ほどスキャナーのコンポーネントを追加します */}
            <p>スキャナーを起動中...</p>
            <button onClick={() => setIsScanning(false)}>
              スキャナーを停止
            </button>
          </div>
        )}
      </header>
    </div>
  );
}

export default App;
