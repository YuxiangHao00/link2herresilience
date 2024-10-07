import React from 'react';
import { Select, Slider } from 'antd';
import { SoundOutlined } from '@ant-design/icons';

const { Option } = Select;

const MusicPlayer = ({ musicFiles, selectedMusic, setSelectedMusic, audioRef }) => {
  const handleMusicChange = (value) => {
    const selected = musicFiles.find(file => file.name === value);
    setSelectedMusic(selected);
    if (audioRef.current) {
      audioRef.current.src = selected.file;
      audioRef.current.play();
    }
  };

  const handleVolumeChange = (value) => {
    if (audioRef.current) {
      audioRef.current.volume = value / 100;
    }
  };

  return (
    <div className="music-player">
      <Select
        style={{ width: 200, marginRight: 16 }}
        placeholder="Select Music"
        onChange={handleMusicChange}
        value={selectedMusic?.name}
      >
        {musicFiles.map(file => (
          <Option key={file.name} value={file.name}>{file.name}</Option>
        ))}
      </Select>
      <div className="volume-control">
        <SoundOutlined style={{ marginRight: 8 }} />
        <Slider
          min={0}
          max={100}
          defaultValue={50}
          onChange={handleVolumeChange}
          style={{ width: 100 }}
        />
      </div>
    </div>
  );
};

export default MusicPlayer;