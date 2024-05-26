export const REGEX = {
  DATE: /^\d{4}-\d{2}-\d{2}$/,
  TIME: /^([01]?[0-9]|2[0-3]):([0-5]?[0-9]):([0-5]?[0-9])$/,
  DATETIME_ISO: /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z$/,
  MEDIA_FILE: /^[\w,\s-]+\.[A-Za-z]{3}$/,
};
