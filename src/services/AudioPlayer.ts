import { Audio } from "expo-av";

interface IAudioPlayer {
  play: () => void;
  stop: () => void;
}

class AudioPlayer implements IAudioPlayer {
  private soundHandle: Audio.Sound;
  constructor(uri: string) {
    const sound = new Audio.Sound();
    sound.loadAsync({ uri });
    this.soundHandle = sound;
  }

  play = async () => {
    await this.soundHandle.playAsync();
  };

  stop = async () => {
    await this.soundHandle.stopAsync();
  };
}

export default AudioPlayer;
export { IAudioPlayer };
