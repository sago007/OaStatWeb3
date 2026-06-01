FROM ubuntu:26.04

ENV DEBIAN_FRONTEND=noninteractive

RUN apt-get update && apt-get install -y \
    build-essential \
    cmake \
    git \
    libboost-dev \
    libcppdb-dev \
    libctemplate-dev \
    python3 \
    zlib1g-dev

RUN git clone https://github.com/artyom-beilis/cppcms.git /opt/cppcms && \
    git -C /opt/cppcms checkout cfaf96eb79e50c1cfe2fde448cbedb784be9ea8f && \
    cmake -B /opt/cppcms/build /opt/cppcms && \
    cmake --build /opt/cppcms/build -j$(nproc) && \
    cmake --install /opt/cppcms/build && \
    ldconfig && \
    rm -rf /opt/cppcms

WORKDIR /opt/oastatweb/OaStatWeb3

COPY . .

RUN cmake -B build -DCMAKE_BUILD_TYPE=Release && \
    cmake --build build -j$(nproc) && \
    cp build/OaStatWeb3 .

EXPOSE 27960

USER nobody

ENTRYPOINT ["./docker/entrypoint.sh"]
