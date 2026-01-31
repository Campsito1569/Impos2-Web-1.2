import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.impos2.app',
  appName: 'Impos2',
  webDir: 'www',
  server: {
    url: 'https://impos2-web-1-2.vercel.app/',
    cleartext: false
  },
  plugins: {
    SplashScreen: {
      launchShowDuration: 2000,
      launchAutoHide: true,
      backgroundColor: "#ffffff",
      androidSplashResourceName: "splash",
      androidScaleType: "CENTER_CROP",
      showSpinner: true,
      androidSpinnerStyle: "large",
      iosSpinnerStyle: "small",
      spinnerColor: "#999999",
      splashFullScreen: true,
      splashImmersive: true,
      layoutName: "launch_screen",
      useDialog: true
    },
    StatusBar: {
      style: "dark",
      backgroundColor: "#ffffff"
    }
  },
  android: {
    allowMixedContent: false,
    captureInput: true
  },
  ios: {
    scrollEnabled: true,
    contentInset: "automatic"
  }
};

export default config;



