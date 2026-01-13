import { useEffect, useState } from "react";

function Randomszam(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

const App = () => {
  const [timer, setTimer] = useState(0);
  const [start, setStart] = useState(false);
  const [green, setGreen] = useState(false);

  useEffect(() => {
    if (!start) return;

    const varakozas = Randomszam(1000, 3000);
    const timeout = setTimeout(() => {
      setGreen(true);
      setTimer(0);
    }, varakozas);

    return () => clearTimeout(timeout);
  }, [start]);

  useEffect(() => {
    if (!green) return;

    const interval = setInterval(() => {
      setTimer(prev => prev + 1);
    }, 10);

    return () => clearInterval(interval);
  }, [green]);

  function kattintas() {
    if (!green) return;
    setGreen(false);
    setStart(false);
  }

  return (
    <div
      onClick={kattintas}
      
    >
      {!start && <button onClick={() => setStart(true)}>Start</button>}

      <p>idooo: {timer * 10} ms</p>
      <p>{green ? "kattanj" : "varj a zöldre"}</p>
      <button onClick={kattintas}>itt kattanj</button>
    </div>
  );
};

export default App;
