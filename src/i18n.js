import i18n from "i18next";
import { reactI18nextModule } from "react-i18next";

import translationEn from "./locales/en/translation.json";
import translationRu from "./locales/ru/translation.json";

const resources = {
  en: {
    translation: translationEn,
  },
  ru: {
    translation: translationRu,
  },
};

i18n.use(reactI18nextModule).init({
  resources,
  lng: "ru",
  keySeparator: false,
  interpolation: { escapeValue: false },
});

export default i18n;
