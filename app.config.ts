module.exports = ({ config }) => {
  return {
    ...config,
    plugins: [
      ...config.plugins,
      [
        "@config-plugins/react-native-branch",
        {
          apiKey: process.env.BRANCH_KEY,
          iosAppDomain: "wtmmf-alternate.app.link",
        },
      ],
    ],
    extra: {
      TMDB_KEY: process.env.TMDB_KEY,
      API_URL: process.env.API_URL,
      TOKEN: process.env.TOKEN,
      IMG_URL: process.env.IMG_URL,
    },
  };
};
