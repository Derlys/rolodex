import * as Localization from 'expo-localization'
import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import en from '../locales/en.json'
import es from '../locales/es.json'

const locales = Localization.getLocales()
const languageCode = locales?.[0]?.languageCode?.toLowerCase() ?? 'en'
const detectedLanguage = languageCode.startsWith('es') ? 'es' : 'en'

const resources = {
  en: {
    translation: en,
  },
  es: {
    translation: es,
  },
} as const

if (!i18n.isInitialized) {
  void i18n.use(initReactI18next).init({
    resources,
    lng: detectedLanguage,
    supportedLngs: ['en', 'es'],
    nonExplicitSupportedLngs: true,
    load: 'languageOnly',
    fallbackLng: 'en',
    returnNull: false,
    interpolation: {
      escapeValue: false,
    },
  })
}

export default i18n
