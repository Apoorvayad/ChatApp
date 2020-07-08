module.exports = {
    assets: ['react-native-vector-icons'],

    project: {
        ios: {},
        android: {}, // grouped into "project"
      },
      assets: ['../mobile/src/assets/fonts/'], // stays the same 


      dependencies: {
        'react-native-custom-tabs': {
          platforms: {
            ios: {}
          },
        },
      }, 
};

