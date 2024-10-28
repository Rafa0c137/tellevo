import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'io.ionic.starter',
  appName: 'tellevo',
  webDir: 'www',
  plugins: {
    GoogleMaps: {
      apiKey: "AIzaSyBMkdfHMGsKuqLBgfrxVhV6PZbatTKxzh8", // Asegúrate de que esta clave sea correcta
    },
  },
};

export default config;
