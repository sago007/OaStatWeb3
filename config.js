{
  "application": {
    // user specific data
    "media_path": "/media",
    "static_media": "/static",
    "connection_string": "mysql:database=oastat",
    "root_path": "/oastatweb"
  },
  "service": {
    "api": "http",
    "port": 27960
  },
  "file_server": {
    "enable": true,
    "document_root": ".",
    "alias": [
      { "url": "/media/", "path": "./media/" },
      { "url": "/static/", "path": "./static_media/" }
    ]
  }
}
