import React, { useState, useRef, useEffect } from 'react';
import Switch from 'react-switch';
import './App.css';

const App: React.FC = () => {
  const [switches, setSwitches] = useState<boolean[]>([false, false, false]);
  const [togglesQueue, setTogglesQueue] = useState<number[]>([]);
  const [reverseEffect, setReverseEffect] = useState<boolean>(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    if (checkReverse(switches[1])) {
      audioRef.current?.play();
    } else {
      audioRef.current?.pause();
    }
  // eslint-disable-next-line
  }, [switches[1], reverseEffect])

  useEffect(() => {
    setReverseEffect(switches[2])
  // eslint-disable-next-line
  }, [switches[2]])

  const updateSwitches = (index: number) => {
    const newSwitches = [...switches];
    newSwitches[index] = !newSwitches[index];

    if (newSwitches.filter(Boolean).length > 2) {
      const fistActiveToggle = togglesQueue.shift()
      if (fistActiveToggle !== undefined) newSwitches[fistActiveToggle] = false;

      setTogglesQueue([...togglesQueue, index]);
    } else {
      if (newSwitches[index]) {
        setTogglesQueue([...togglesQueue, index]);
      } else {
        setTogglesQueue(togglesQueue.filter(i => i !== index));
      }
    }

    setSwitches(newSwitches);
  };

  const checkReverse = (mode: boolean) => {
    return reverseEffect ? !mode : mode;
  }

  return (
    <div className={`container ${checkReverse(switches[0]) ? 'dark' : 'light'}`}>
      <div className="switch-container">
        <Switch
          onChange={() => updateSwitches(0)}
          checked={switches[0]}
        />
        <span>Dark Mode</span>
      </div>
      <div className="switch-container">
        <Switch
          onChange={() => updateSwitches(1)}
          checked={switches[1]}
        />
        <span>Play Music</span>
      </div>
      <div className="switch-container">
        <Switch
          onChange={() => updateSwitches(2)}
          checked={switches[2]}
        />
        <span>Reverse Effect</span>
      </div>
      <audio ref={audioRef} src="https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3" />
    </div>
  );
};

export default App;
