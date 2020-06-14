import i18n from "i18next";
import detector from "i18next-browser-languagedetector";
import { reactI18nextModule } from "react-i18next";

import translationEn from "./locales/en/translation.json";
import translationRu from "./locales/ru/translation.json";
import translationUa from "./locales/ua/translation.json";

const resources = {
  en: {
    translation: translationEn,
  },
  ru: {
    translation: translationRu,
  },
  ua: {
    translation: translationUa,
  },
};

i18n
  .use(detector)
  .use(reactI18nextModule)
  .init({
    resources,
    lng: "en",
    fallbackLng: "ua",
    keySeparator: false,
    interpolation: { escapeValue: false },
  });

export default i18n;
