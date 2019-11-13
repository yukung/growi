module.exports = {
  NODE_ENV: 'development',
  FILE_UPLOAD: 'gcs',
  // MATHJAX: 1,
  // NO_CDN: true,
  ELASTICSEARCH_URI: 'http://localhost:9200/growi',
  HACKMD_URI: 'http://localhost:3010',
  PLUGIN_NAMES_TOBE_LOADED: [
    // 'growi-plugin-lsx',
    // 'growi-plugin-pukiwiki-like-linker',
    // 'growi-plugin-attachment-refs',
  ],
  // PUBLISH_OPEN_API: true,
  // USER_UPPER_LIMIT: 0,
  // DEV_HTTPS: true,
  // FORCE_WIKI_MODE: 'private', // 'public', 'private', undefined

  // TODO: debug code
  GCS_API_KEY_JSON_PATH: 'tmp/gcs-service-account-key.json',
  GCS_BUCKET: 'growi-dev',
};
