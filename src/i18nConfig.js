export const i18n = require('i18n');

i18n.configure({
  locales: ['en', 'es'],
  defaultLocale: 'en',
  directory: `${__dirname}/locales`,
});

i18n.setLocale('es');
