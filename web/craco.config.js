const CracoAlias = require('craco-alias');

module.exports = {
  plugins: [
    {
      plugin: CracoAlias,

      options: {
        source: 'options',
        baseUrl: './',

        aliases: {
          '@constants': './src/constants',
          '@components': './src/components',
          '@styles': './src/styles',
          '@hooks': './src/hooks',
          '@utils': './src/utils',
          '@assets': './src/assets',
          '@services': './src/services',
          '@store': './src/store',
          '@screens': './src/screens',
        },
      },
    },
  ],
};
