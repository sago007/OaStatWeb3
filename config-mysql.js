{
  "application" : {
    // user specific data
    "connection_string" : "mysql:database=oastat;user=testuser;password='password'",
    "media_path" : "/media",
    "static_media" : "/static"
  },
  "service" : {
    "api" : "http",
    "port" : 27960
  },
  "http" : {
    "script_names" : ["/oastatweb"]
  },
  "file_server" : {
    "enable" : true,
    "document_root" : ".",
    "alias" : [
      { "url" : "/media", "path" : "./media" },
      { "url" : "/files/media", "path" : "./media" },
      { "url" : "/static/", "path" : "./static_media" },
      { "url" : "/files/static/", "path" : "./static_media" },
    ],
  }
}
