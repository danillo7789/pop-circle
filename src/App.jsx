import "./App.css";
import { useState } from "react";
import Circle from "./components/Circle.jsx";

function App() {
  const [points, setPoints] = useState([]);
  const [popped, setPopped] = useState([]);

  const PlaceCircle = (e) => {
    console.log(e);
    const { clientX, clientY } = e;
    setPoints([...points, { clientX, clientY }]);
  };

  const handleUndo = () => {
    const newPoints = [...points];
    const poppedPoint = newPoints.pop();
    //so we won't pop off an empty arrray
    if (!poppedPoint) return;
    setPoints(newPoints);
    setPopped([...popped, poppedPoint]);
  };

  const handleRedo = () => {
    const newPopped = [...popped];
    const popRedo = newPopped.pop();
    if (!popRedo) return;
    setPopped(newPopped);
    setPoints([...points, popRedo])
  }

  return (
    <>
      <button disabled={points.length === 0} onClick={handleUndo}>Undo</button>
      {/* to disable d redo button when there's nothing else to redo */}
      <button disabled={popped.length === 0} onClick={handleRedo}>Redo</button>

      <div className="App" onClick={PlaceCircle}>
        {points.map((point, index) => (
          <div
            key={index}
            className="point"
            style={{
              left: point.clientX - 6 + "px",
              top: point.clientY - 6 + "px",
            }}
          >
            <Circle />
          </div>
        ))}
      </div>
    </>
  );
}

export default App;
