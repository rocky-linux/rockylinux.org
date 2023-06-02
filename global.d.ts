/* eslint-disable no-unused-vars */
// Use type safe message keys with `next-intl`
type Messages = typeof import("./dictionaries/en.json");
declare interface IntlMessages extends Messages {}
