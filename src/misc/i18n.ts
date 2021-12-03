import i18next from 'i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import HttpBackend from 'i18next-http-backend';
import { initReactI18next } from 'react-i18next';

const allLocales = {
    zh_Hans: import('src/i18n/zh-Hans'),
    zh_Hant: import('src/i18n/zh-Hant'),
    en: import('src/i18n/en'),
};

type BackendRequestCallback = (
  err: null,
  result: { status: number; data: any }
) => void;

i18next
  .use(HttpBackend)
  .use(initReactI18next)
  .use(LanguageDetector)
  .init({
    debug: process.env.NODE_ENV === 'development',
    // resources,
    backend: {
      loadPath: '/__{{lng}}/{{ns}}.json',
      request: function (
        _options: any,
        url: string,
        _payload: any,
        callback: BackendRequestCallback
      ) {
        let p: PromiseLike<{ data: any }>;
        switch (url) {
          case '/__zh_Hans/translation.json':
            p = allLocales.zh_Hans;
            break;
          case '/__zh_Hant/translation.json':
            p = allLocales.zh_Hant;
            break;
          case '/__en/translation.json':
          default:
            p = allLocales.en;
            break;
        }
        if (p) {
          p.then((mod) => {
            callback(null, { status: 200, data: mod.data });
          });
        }
      },
    },
    supportedLngs: ['en', 'zh_Hans','zh_Hant'],


    fallbackLng: 'en',
    interpolation: {
      escapeValue: false,
    },
  });

if (process.env.NODE_ENV === 'development') {
  window.i18n = i18next;
}

export default i18next;
