import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import en from "./language/en.json"
import zh from "./language/zh.json"
import vn from "./language/vn.json"
import th from "./language/th.json"

const resources = {
    en: {
        translation: en
    },
    zh: {
        translation: zh
    },
    vn: {
        translation: vn
    },
    th: {
      translation: th
    },
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: 'en', // default language
    fallbackLng: 'en', // fallback language if translation is missing
    interpolation: {
      escapeValue: false
    }
  });
  
  export default i18n;