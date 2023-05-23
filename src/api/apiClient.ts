import ky from 'ky';

const BASE_URL = 'https://startup-summer-2023-proxy.onrender.com/2.0';
// const ALT_URL = 'https://startup-summer-proxy-production.up.railway.app/2.0';

export const api = ky.create({
  prefixUrl: BASE_URL,
  headers: {
    'x-secret-key': import.meta.env.VITE_X_SECRET_KEY,
    'X-Api-App-Id': import.meta.env.VITE_X_API_APP_ID,
  },
});
