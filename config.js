{
   "application" : {
      // user specific data
      "connection_string" : "mysql:database=oastat",
      "media_path" : "../../files/media",
      "static_media" : "../../files/static"
   },
    "service" : {
        "api" : "http",
        "port" : 27960
    },
    "http" : {
        "script_names" :  ["/oastatweb"]
    },
    "file_server" : {
        "enable": true,
	"document_root" : ".",
	"alias" : [
    		{ "url" : "/files/media" , "path" : "./media" },
		{ "url" : "/files/static/" ,"path" : "./static_media"},
  	],
    }
}
