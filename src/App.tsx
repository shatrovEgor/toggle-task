import React, { useState, useRef, useEffect } from 'react';
import Switch from 'react-switch';
import './App.css';

enum Toggle {
  ThemeMode = 1,
  MusicMode,
  ReverseMode
}

const App: React.FC = () => {
  const [togglesQueue, setTogglesQueue] = useState<Toggle[]>([]);
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    if (checkReverse(getCheckedState(Toggle.MusicMode))) {
      audioRef.current?.play();
    } else {
      audioRef.current?.pause();
    }
  // eslint-disable-next-line
  }, [togglesQueue])

  const updateSwitches = (index: Toggle): void => {
    const updatedQueue = [...togglesQueue];

    if (updatedQueue.find((el) => el === index)) {
        setTogglesQueue(updatedQueue.filter((el) => el !== index))
    } else {
      if (togglesQueue.length === 2) {
        updatedQueue.shift()
      }
      setTogglesQueue([...updatedQueue, index])
    }
  };

  const checkReverse = (mode: boolean): boolean => {
    const reverseEffect = !!togglesQueue.find((el) => el === Toggle.ReverseMode)
    return reverseEffect ? !mode : mode;
  }

  const getCheckedState = (index: Toggle): boolean => {
    return !!togglesQueue.find((el) => el === index);
  }

  return (
    <div className={`container ${checkReverse(getCheckedState(Toggle.ThemeMode)) ? 'dark' : 'light'}`}>
      <div className="switch-container">
        <Switch
          onChange={() => updateSwitches(Toggle.ThemeMode)}
          checked={getCheckedState(Toggle.ThemeMode)}
        />
        <span>Dark Mode</span>
      </div>
      <div className="switch-container">
        <Switch
          onChange={() => updateSwitches(Toggle.MusicMode)}
          checked={getCheckedState(Toggle.MusicMode)}
        />
        <span>Play Music</span>
      </div>
      <div className="switch-container">
        <Switch
          onChange={() => updateSwitches(Toggle.ReverseMode)}
          checked={getCheckedState(Toggle.ReverseMode)}
        />
        <span>Reverse Effect</span>
      </div>
      <audio ref={audioRef} src="https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3" />
    </div>
  );
};

export default App;
