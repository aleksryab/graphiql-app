import i18next from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

import commonEn from './en/common.json';
import commonRu from './ru/common.json';
import { LanguageEnums } from './languages';

const lang =
  localStorage.getItem('i18nextLng') === LanguageEnums.RU ? LanguageEnums.RU : LanguageEnums.EN;

i18next
  .use(initReactI18next)
  .use(LanguageDetector)
  .init({
    debug: false,
    lng: lang,
    fallbackLng: LanguageEnums.EN,
    interpolation: {
      escapeValue: false,
    },
    resources: {
      en: {
        common: commonEn,
      },
      ru: {
        common: commonRu,
      },
    },
  });

export default i18next;
