FROM caddy:builder AS builder


RUN xcaddy build \
    --with github.com/gamalan/caddy-tlsredis \
    --with github.com/ueffel/caddy-brotli

FROM caddy:latest

COPY --from=builder /usr/bin/caddy /usr/bin/caddy
