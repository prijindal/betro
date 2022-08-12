FROM buildpack-deps:bullseye-scm

WORKDIR /app

COPY dist/ ./

CMD [ "/app/linux-x64/server" ]