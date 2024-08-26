module.exports = ({ config }) => {
  return {
    ...config,
    extra: {
      TMDB_KEY: process.env.TMDB_KEY,
      API_URL: process.env.API_URL,
      TOKEN: process.env.TOKEN,
      IMG_URL: process.env.IMG_URL,
    },
  };
};
