/* style.css */
* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
}

body {
  position: relative;
  background-color: #0d1117;
  color: #333333;
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  padding: 16px;
  overflow-x: hidden;
}

.video-background {
  position: fixed;
  top: 50%;
  left: 50%;
  width: 100vw;
  height: 100vh;
  transform: translate(-50%, -50%);
  z-index: 0;
  pointer-events: none;
  overflow: hidden;
}

.video-background iframe {
  position: absolute;
  top: 50%;
  left: 50%;
  width: 100vw;
  height: 56.25vw;
  min-height: 100vh;
  min-width: 177.77vh;
  transform: translate(-50%, -50%);
  opacity: 0.65;
  filter: brightness(0.85);
}

.card {
  position: relative;
  z-index: 10;
  background-color: rgba(255, 255, 255, 0.92);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  width: 100%;
  max-width: 420px;
  padding: 24px;
  border-radius: 16px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.37);
  border: 1px solid rgba(255, 255, 255, 0.4);
}

h1 {
  font-size: 1.5rem;
  text-align: center;
  margin-bottom: 20px;
  color: #1a1a1a;
}

.form-group {
  display: flex;
  flex-direction: column;
  margin-bottom: 16px;
}

label {
  font-size: 0.85rem;
  font-weight: 600;
  margin-bottom: 6px;
  color: #444444;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

select, input {
  width: 100%;
  padding: 12px;
  font-size: 1rem;
  border: 1px solid #cccccc;
  border-radius: 8px;
  background-color: rgba(255, 255, 255, 0.9);
  outline: none;
  transition: border-color 0.2s, background-color 0.2s;
}

select:focus, input:focus {
  border-color: #0066cc;
  background-color: #ffffff;
}

.direction-container {
  margin-bottom: 16px;
}

.direction-btn {
  width: 100%;
  padding: 10px 16px;
  font-size: 0.95rem;
  font-weight: 600;
  color: #0066cc;
  background-color: #e6f0fa;
  border: 1px solid #b3d1ff;
  border-radius: 8px;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 8px;
  transition: background-color 0.2s;
}

.direction-btn:hover {
  background-color: #d8e8fa;
}

.swap-icon {
  font-size: 1.1rem;
}

.converter-row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 12px;
}

.result-box {
  margin-top: 8px;
  padding: 16px;
  background-color: rgba(240, 247, 255, 0.95);
  border-radius: 8px;
  border: 1px solid #d0e3ff;
  text-align: center;
}

.result-label {
  font-size: 0.8rem;
  font-weight: 600;
  color: #005522;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  margin-bottom: 4px;
}

.result-value {
  font-size: 1.5rem;
  font-weight: 700;
  color: #004488;
  word-break: break-word;
}

.result-formula {
  font-size: 0.8rem;
  color: #666666;
  margin-top: 4px;
}
