import React, { useState, useEffect, useRef } from 'react';
import { Typography, Button, Space, Slider, message } from 'antd';
import { PlayCircleOutlined, PauseCircleOutlined } from '@ant-design/icons';
import './addiction.less';
import S4 from './images/S_4.png';
import MusicPlayer from './MusicPlayer';
import { motion } from 'framer-motion';

// Import audio files
import AmbientSound from './Data/Music/Ambient Sound.mp3';
import BirdsChirping from './Data/Music/Birds Chirping.mp3';
import Rain from './Data/Music/Rain.mp3';
import SoundOfWaves from './Data/Music/Sound of Waves.mp3';

const { Title, Paragraph } = Typography;

const BREATHE_IN_TIME = 5;
const HOLD_TIME = 7;
const BREATHE_OUT_TIME = 8;
const TOTAL_CYCLE_TIME = BREATHE_IN_TIME + HOLD_TIME + BREATHE_OUT_TIME;

const initialState = {
  isBreathing: false,
  countdown: 3,
  breathPhase: '',
  breathProgress: 0,
  duration: 5,
  remainingTime: 5 * 60,
  selectedMusic: null,
  cycleTime: 0,
};

const Breath = () => {
  const [state, setState] = useState(initialState);
  const audioRef = useRef(null);
  const intervalRef = useRef(null);

  const musicFiles = [
    { name: 'Ambient Sound', file: AmbientSound },
    { name: 'Birds Chirping', file: BirdsChirping },
    { name: 'Rain', file: Rain },
    { name: 'Sound of Waves', file: SoundOfWaves }
  ];

  useEffect(() => {
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, []);

  useEffect(() => {
    if (state.isBreathing) {
      intervalRef.current = setInterval(updateBreathingState, 100);
    } else {
      if (intervalRef.current) clearInterval(intervalRef.current);
    }

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [state.isBreathing]);

  const updateBreathingState = () => {
    setState(prevState => {
      if (prevState.countdown > 0) {
        return { ...prevState, countdown: prevState.countdown - 0.1 };
      }

      let { cycleTime, breathPhase, breathProgress, remainingTime } = prevState;
      cycleTime = (cycleTime + 0.1) % TOTAL_CYCLE_TIME;
      
      if (cycleTime < BREATHE_IN_TIME) {
        breathPhase = 'Breathe in';
        breathProgress = (cycleTime / BREATHE_IN_TIME) * 100;
      } else if (cycleTime < BREATHE_IN_TIME + HOLD_TIME) {
        breathPhase = 'Hold';
        breathProgress = 100;
      } else {
        breathPhase = 'Breathe out';
        breathProgress = ((TOTAL_CYCLE_TIME - cycleTime) / BREATHE_OUT_TIME) * 100;
      }

      // 计算当前阶段的剩余时间
      let phaseRemainingTime;
      if (cycleTime < BREATHE_IN_TIME) {
        phaseRemainingTime = BREATHE_IN_TIME - cycleTime;
      } else if (cycleTime < BREATHE_IN_TIME + HOLD_TIME) {
        phaseRemainingTime = BREATHE_IN_TIME + HOLD_TIME - cycleTime;
      } else {
        phaseRemainingTime = TOTAL_CYCLE_TIME - cycleTime;
      }

      remainingTime -= 0.1;

      if (remainingTime <= 0) {
        message.success('Breathing exercise completed!');
        return initialState;
      }

      return {
        ...prevState,
        cycleTime,
        breathPhase,
        breathProgress,
        remainingTime,
        phaseRemainingTime,
      };
    });
  };

  const startBreathing = () => {
    setState(prevState => ({
      ...prevState,
      isBreathing: true,
      countdown: 3,
      remainingTime: prevState.duration * 60,
    }));
    playMusic();
  };

  const stopBreathing = () => {
    setState(initialState);
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }
  };

  const playMusic = () => {
    if (!state.selectedMusic) {
      const randomMusic = musicFiles[Math.floor(Math.random() * musicFiles.length)];
      setState(prevState => ({ ...prevState, selectedMusic: randomMusic }));
      if (audioRef.current) {
        audioRef.current.src = randomMusic.file;
        audioRef.current.play().catch(e => console.error("Error playing audio:", e));
      }
    } else if (audioRef.current) {
      audioRef.current.play().catch(e => console.error("Error playing audio:", e));
    }
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="breath-exercise">
      <Title className="page-title">Relax and Breathe: Take a Moment to Calm Your Mind</Title>
      <Paragraph>
        Feeling stressed? Take a deep breath. Follow this guided breathing exercise to reduce your
        stress and refocus your energy. Breathing deeply can help regulate your heart rate, reduce
        anxiety, and bring you back to a calm state.
      </Paragraph>
      <div className="exercise-container">
        <img src={S4} alt="Breathing exercise" className="breath-image" />
        <div className="breath-progress-bar">
          <motion.div 
            className="breath-progress" 
            initial={{ height: '0%' }}
            animate={{ height: `${state.breathProgress}%` }}
            transition={{ duration: 0.1, ease: "linear" }}
          ></motion.div>
        </div>
        <div className="breath-controls">
          <Title level={3}>
            {state.isBreathing 
              ? (state.countdown > 0 
                ? `Get Ready, your breathing journey starts in ${Math.ceil(state.countdown)}` 
                : `${state.breathPhase} ${state.phaseRemainingTime ? Math.ceil(state.phaseRemainingTime) : ''}`) 
              : 'Ready to start?'}
          </Title>
          <Space direction="vertical" size="large" style={{ width: '100%' }}>
            {!state.isBreathing && (
              <div className="duration-slider">
                <Paragraph>Set duration (minutes):</Paragraph>
                <Slider
                  min={1}
                  max={15}
                  value={state.duration}
                  onChange={(value) => setState(prevState => ({ ...prevState, duration: value, remainingTime: value * 60 }))}
                  tooltipVisible
                />
              </div>
            )}
            <Button 
              type="primary" 
              onClick={state.isBreathing ? stopBreathing : startBreathing} 
              icon={state.isBreathing ? <PauseCircleOutlined /> : <PlayCircleOutlined />}
            >
              {state.isBreathing ? 'Stop' : 'Start'}
            </Button>
            {state.isBreathing && <div className="remaining-time">Time remaining: {formatTime(state.remainingTime)}</div>}
            <MusicPlayer 
              musicFiles={musicFiles} 
              selectedMusic={state.selectedMusic} 
              setSelectedMusic={(music) => setState(prevState => ({ ...prevState, selectedMusic: music }))} 
              audioRef={audioRef} 
            />
          </Space>
        </div>
      </div>
      <audio ref={audioRef} loop />
    </div>
  );
};

export default Breath;