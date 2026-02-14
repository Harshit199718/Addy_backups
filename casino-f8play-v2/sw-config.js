const { BroadcastUpdatePlugin } = require('workbox-webpack-plugin');

module.exports = {
  runtimeCaching: [
    {
      urlPattern: new RegExp(process.env.REACT_APP_URL ? `^${process.env.REACT_APP_URL}.*` : ''),
      handler: 'networkFirst',
    },
  ],
  plugins: [
    new BroadcastUpdatePlugin(),
  ],
  manifestTransforms: [
    async (manifest) => {
      manifest.icons = [
        {
          "src": "./public/logo.png",
          "sizes": "192x192",
          "type": "image/png"
        }
      ];
      return manifest;
    },
  ],
};
