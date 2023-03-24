module.exports = {
  "extends": "@istanbuljs/nyc-config-typescript",
  "include": [
    "src/Models",
    "src/Services",
    "src/Controllers"
  ],
  "exclude": ['src/Models/Connection.ts'],
  "reporter": [
    "text",
    "text-summary",
    "json-summary",
    "html",
    "lcov"
  ],
  "all": true
}
