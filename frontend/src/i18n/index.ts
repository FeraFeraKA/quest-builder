import i18n from "i18next";
import { initReactI18next } from "react-i18next";

import enCommon from "./locales/en/common.json";
import enEditor from "./locales/en/editor.json";
import enLayout from "./locales/en/layout.json";
import enPlaytest from "./locales/en/playtest.json";
import enQuests from "./locales/en/quests.json";
import ruCommon from "./locales/ru/common.json";
import ruEditor from "./locales/ru/editor.json";
import ruLayout from "./locales/ru/layout.json";
import ruPlaytest from "./locales/ru/playtest.json";
import ruQuests from "./locales/ru/quests.json";

const namespaces = [
  "common",
  "quests",
  "editor",
  "playtest",
  "layout",
] as const;

export const defaultNS = namespaces;

export const resources = {
  ru: {
    common: ruCommon,
    quests: ruQuests,
    editor: ruEditor,
    playtest: ruPlaytest,
    layout: ruLayout,
  },
  en: {
    common: enCommon,
    quests: enQuests,
    editor: enEditor,
    playtest: enPlaytest,
    layout: enLayout,
  },
} as const;

void i18n.use(initReactI18next).init({
  resources,
  lng: "ru",
  fallbackLng: "en",
  ns: [...namespaces],
  defaultNS,
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
