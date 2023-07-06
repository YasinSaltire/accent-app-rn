const generateAudioLink = (
  filename: string,
) => {
    return `https://saltire.com/speech/server/upload/${filename}.mp3`
};

export default generateAudioLink;
