# OaStatWeb3

This is a frontend to oastat (https://github.com/sago007/oastat) written in C++11.

This is also proof of concept of a website written in C++11.

It uses libcppcms and Docker for deploying.  


## Testing

Assuming a local db with oastat data a test instance can be launched with:
```
export OASTATWEB3CONNECTIONSTRING="mysql:host=127.0.0.1;port=3306;database=oastat;user=root;password=password"
./OaStatWeb3 -c config-mysql.js
```
Thos will make the instance visible on http://localhost:27960/oastatweb/

If you are using Docker for testing and your test db is also in Docker you can use:
```
docker build -t oastatweb3 -f docker/Dockerfile .
docker run --rm \
    --add-host=host.docker.internal:host-gateway \
    -p 27960:27960 \
    -e OASTATWEB3CONNECTIONSTRING="mysql:host=host.docker.internal;port=3306;database=oastat;user=root;password=password" \
    oastatweb3
```
This will make the instance visible on http://localhost:27960/

To serve the application at a subpath (e.g. `/oastatweb/`), set the `OASTATWEB3_BASE_PATH` environment variable:
```
docker run --rm \
    --add-host=host.docker.internal:host-gateway \
    -p 27960:27960 \
    -e OASTATWEB3CONNECTIONSTRING="mysql:host=host.docker.internal;port=3306;database=oastat;user=root;password=password" \
    -e OASTATWEB3_BASE_PATH="/oastatweb" \
    oastatweb3
```
This will make the instance visible on http://localhost:27960/oastatweb/

`OASTATWEB3_BASE_PATH` also drives the `<base href>` emitted on every page, so all
links and assets resolve against that prefix regardless of trailing slash or page
depth. When running behind a reverse proxy, set this to the public path the proxy
exposes the app under (and have the proxy forward that same prefix to the backend).
