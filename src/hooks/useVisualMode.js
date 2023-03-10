import { useState } from "react";

export default function useVisualMode(initial) {
  const [mode, setMode] = useState(initial);
  const [history, setHistory] = useState([initial]);

  const transition = (newMode, replace = false) => {
    if (replace) {
      history.pop();
      setMode(history[history.length - 1]);
    }

    setMode((prev) => newMode);
    setHistory((prev) => [...prev, newMode]);
    return { mode };
  };

  const back = () => {
    if (history.length > 1) {
      history.pop();
    }

    setMode(history[history.length - 1]);
  };

  return { mode, transition, back };
}
