import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import vi from './vi';
import my from './my';

// the translations
// (tip move them in a JSON file and import them)
const resources = {
  en: {
    translation: {},
  },
  vi: {
    translation: vi,
  },
  my: {
    translation: my,
  },
};

i18n
  .use(initReactI18next) // passes i18n down to react-i18next
  .init({
    resources,
    load: 'languageOnly',
    lng: navigator.language || navigator.userLanguage,
    fallbackLng: 'en',
    keySeparator: false, // we do not use keys in form messages.welcome
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;
