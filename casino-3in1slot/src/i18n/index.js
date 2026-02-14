import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import my from "./locales/my.json"
import en from "./locales/en.json"
import th from "./locales/th.json"
import id from "./locales/id.json"
import enAu from "./locales/en-au.json"
import zh from "./locales/zh.json"
import vn from "./locales/vn.json"

i18n
  .use(initReactI18next) // Pass i18n instance to react-i18next
  .init({
    resources: {
      'my': {
        translation: my,
      },
      'en': {
        translation: en,
      },
      'th': {
        translation: th,
      },
      'id': {
        translation: id,
      },
      'en-au': {
        translation: enAu,
      },
      'zh': {
        translation: zh,
      },
      'vn': {
        translation: vn,
      },
    },
    fallbackLng: 'my/my', // Default to US English
    debug: false,
    interpolation: {
      escapeValue: false,
    },
    react: {
      useSuspense: false, // Depending on your preference
    },
  });

export default i18n;
