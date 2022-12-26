FROM nginx:stable

# Copy the static website
# Use the .dockerignore file to control what ends up inside the image!
COPY nginx-server.conf /etc/nginx/conf.d/default.conf
COPY dist /usr/share/nginx/html