# PocketBase backend. The binary is fetched at build time; compose sets
# `network: host` on this build so GitHub resolves on the VPS.
FROM alpine:3.22

ARG POCKETBASE_VERSION=0.40.5
ARG TARGETARCH

RUN apk add --no-cache ca-certificates unzip \
  && wget -qO /tmp/pb.zip "https://github.com/pocketbase/pocketbase/releases/download/v${POCKETBASE_VERSION}/pocketbase_${POCKETBASE_VERSION}_linux_${TARGETARCH}.zip" \
  && unzip /tmp/pb.zip -d /tmp/pb \
  && mv /tmp/pb/pocketbase /usr/local/bin/pocketbase \
  && chmod +x /usr/local/bin/pocketbase \
  && rm -rf /tmp/pb /tmp/pb.zip \
  && addgroup -S pocketbase \
  && adduser -S -G pocketbase pocketbase \
  && mkdir -p /pb/pb_data \
  && chown -R pocketbase:pocketbase /pb

WORKDIR /pb
USER pocketbase
EXPOSE 8090
VOLUME /pb/pb_data

ENTRYPOINT ["/usr/local/bin/pocketbase"]
CMD ["serve", "--http=0.0.0.0:8090", "--dir=/pb/pb_data"]
