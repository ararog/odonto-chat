import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import detector from "i18next-browser-languagedetector";

import translationPt from './locales/pt/common.json';
import translationEn from './locales/en/common.json';
import translationEs from './locales/es/common.json';
import translationFr from './locales/fr/common.json';

const resources = {
  pt: {translation: translationPt},
  en: {translation: translationEn},
  es: {translation: translationEs},
  fr: {translation: translationFr},
};

i18n
  .use(detector)
  .use(initReactI18next) 
  .init({
    resources,
    fallbackLng: "en",
    interpolation: {
      escapeValue: false // react already safes from xss
    }
  });

export default i18n;
