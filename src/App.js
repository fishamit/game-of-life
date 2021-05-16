import React from "react";
import PixelPaint from "./components/PixelPaint";
import { PixelPaintProvider } from "./context/pixelPaint";
function App() {
  return (
    <PixelPaintProvider>
      <PixelPaint />
    </PixelPaintProvider>
  );
}

export default App;
