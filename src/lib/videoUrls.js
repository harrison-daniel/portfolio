const R2_BASE_URL = 'https://videos.harrisondaniel.dev/';

export const VIDEO_URLS = {
  picknflick: {
    src: `${R2_BASE_URL}PicknFlick%20Video%20Small.mp4`,
    poster: null,
  },

  gitpub: {
    src: `${R2_BASE_URL}GitPub%20Video%20mobile%20small.mp4`,
    poster: null,
  },

  passwordGenerator: {
    src: `${R2_BASE_URL}Password%20Generator%20Video%20Small.mp4`,
    poster: null,
  },

  droneReel: {
    src: `${R2_BASE_URL}portfolio-drone-reel-2026.mp4`,
    // poster: `${R2_BASE_URL}/drone-poster.jpg`,
  },

  // droneClip1: {
  //   src: `${R2_BASE_URL}/drone-clip-1.mp4`,
  //   poster: `${R2_BASE_URL}/drone-clip-1-poster.jpg`,
  // },
};

export const isR2Configured = () =>
  !R2_BASE_URL.includes('videos.harrisondaniel.dev');

export default VIDEO_URLS;
