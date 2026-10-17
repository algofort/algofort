const cdn = 'https://res.cloudinary.com/vfsp1egd/video/upload';
const homeVideo = 'v1792150111/algofort/assets/banner_bg';
const pageVideo = 'v1792145867/algofort/assets/68ee74b7102caefef6ce7890_2F68f23d0b14d2158ab1fa8dea_14471915_3840_2160_30fps_20_281_29-transcode';

function optimizedSources(asset) {
  return [
    { src: `${cdn}/q_auto:best/${asset}.webm`, type: 'video/webm' },
    { src: `${cdn}/q_auto:best/${asset}.mp4`, type: 'video/mp4' },
  ];
}

export const homeVideoSources = optimizedSources(homeVideo);
export const pageVideoSources = optimizedSources(pageVideo);
export const cardVideoSources = optimizedSources(pageVideo);
export const factVideoSources = [
  { src: `${cdn}/q_auto:best/v1792145910/algofort/assets/fact-card-video.mp4`, type: 'video/mp4' },
];
