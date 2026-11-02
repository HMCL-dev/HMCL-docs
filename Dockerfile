FROM nginx:1.30.6-alpine@sha256:47928bf67eb62a1863cb08d9ecb52d3e704304ba614eaee17884204677702951
ARG DOCS_REVISION=local
LABEL net.hmcl.site="docs" org.opencontainers.image.revision="${DOCS_REVISION}"
COPY nginx.conf /etc/nginx/nginx.conf
COPY _site/ /srv/www/
USER 101:101
EXPOSE 8080
ENTRYPOINT ["nginx"]
CMD ["-g", "daemon off;"]
