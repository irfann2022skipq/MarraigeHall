module.exports = function(api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    plugins: ['react-native-reanimated/plugin'],
    "plugins": [
      ["module:react-native-dotenv", {
        "envName": "APP_ENV",
        "moduleName": "react-native-dotenv",
        "path": ".env",
        "blocklist": null,
        "allowlist": null,
        "blacklist": null, // DEPRECATED
        "whitelist": null, // DEPRECATED
        "safe": false,
        "allowUndefined": true,
        "verbose": false
      },
      "expo-notifications",
      {
        "icon": "./local/assets/notification-icon.png",
        "color": "#ffffff",
        "sounds": [
          "./local/assets/notification-sound.wav",
          "./local/assets/notification-sound-other.wav"
        ]
      }
    ]
    ]
  };
};

module.exports = { presets: ['module:metro-react-native-babel-preset'], plugins: ['react-native-reanimated/plugin'],};