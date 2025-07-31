# Use official lightweight nginx image
FROM nginx:alpine

# Copy all files into the nginx html folder
COPY . /usr/share/nginx/html

# Expose port 80 inside the container
EXPOSE 80

# Start nginx when container starts
CMD ["nginx", "-g", "daemon off;"]
