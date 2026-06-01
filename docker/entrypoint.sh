#!/bin/sh
set -e

# Default base path is empty (serve at /)
BASE_PATH="${OASTATWEB3_BASE_PATH:-}"

# Strip trailing slash for normalization
BASE_PATH="${BASE_PATH%/}"

# Generate runtime config
cat > /tmp/config-runtime.js <<EOF
{
   "application" : {
      "connection_string" : "mysql:database=oastat;user=testuser;password=password",
      "media_path" : "../media",
      "static_media" : "${BASE_PATH}/files/static",
      "root_path" : "${BASE_PATH}"
   },
    "service" : {
        "ip"  : "0.0.0.0",
        "api" : "http",
        "port" : 27960
    },
    "http" : {
        "script_names" : ["${BASE_PATH}"]
    },
    "file_server" : {
        "enable": true,
        "document_root" : ".",
        "alias" : [
            { "url" : "${BASE_PATH}/files/media" , "path" : "./media" },
            { "url" : "${BASE_PATH}/files/static/" ,"path" : "./static_media"}
        ]
    }
}
EOF

exec ./OaStatWeb3 -c /tmp/config-runtime.js
