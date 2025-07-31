# Remote Job Finder

## Description

Remote Job Finder is a simple web application that lets users search for remote job listings using the [Remotive API](https://remotive.io/api-documentation). Users can enter keywords and filter jobs by category (Software Dev, Marketing, Sales). The application is deployed using Docker containers with HAProxy configured as a load balancer to distribute traffic between two app instances.

---

## Features

- Search remote jobs by keyword
- Filter job results by category
- View job title, company, location, and apply link
- Load balancing across two app instances with HAProxy for improved availability and scalability

---

## Technologies Used

- HTML, CSS, JavaScript (frontend)
- Remotive API
- Docker (containerization)
- HAProxy (load balancing)

---

## Getting Started

### Prerequisites

- Docker installed on your local machine
- Docker Hub account (optional, for pulling the image)

### Running Locally

1. Clone this repository:

```bash
git clone <your-repo-url>
cd <repo-folder>
```

2. Build the Docker image for the application:

```bash
docker build -t kalasa077/remote-job-finder:v1 .
```

3. Run two containers on different ports to simulate multiple instances:

```bash
docker run -d -p 8081:80 kalasa077/remote-job-finder:v1
docker run -d -p 8082:80 kalasa077/remote-job-finder:v1
```

4. Build and run the HAProxy container which will act as the load balancer:

```bash
docker build -f Dockerfile.haproxy -t my-haproxy .
docker run -d -p 8080:80 my-haproxy
```

5. Open your browser and go to:

```
http://localhost:8080
```

You can refresh the page multiple times to see HAProxy distribute requests between the two backend containers.

---

## Load Balancer Configuration

The HAProxy backend is configured as follows in `haproxy.cfg`:

```haproxy
backend http_back
    balance roundrobin
    server web1 172.17.0.1:8081 check
    server web2 172.17.0.1:8082 check
```

**Note:**  
`172.17.0.1` is the Docker host IP inside the default Docker network on Linux.  
On Windows and Mac, `host.docker.internal` can be used instead, but this hostname does not resolve on Linux, so we use the IP address.

---

## Docker Hub Repository

The Docker image for this project is publicly available at:

[https://hub.docker.com/r/kalasa077/remote-job-finder](https://hub.docker.com/r/kalasa077/remote-job-finder)

You can pull the image using:

```bash
docker pull kalasa077/remote-job-finder:v1
```

---

## Challenges Faced

- **HAProxy hostname resolution:** On Linux, `host.docker.internal` does not resolve by default, so it was necessary to use the Docker bridge IP `172.17.0.1` for backend servers.
- **Port conflicts:** Managing multiple containers and ports required careful planning to avoid binding conflicts.
- **API rate limits and CORS:** Understanding the Remotive API’s limitations and testing via browser required handling CORS and fetching data securely.

---

## Credits

- [Remotive API Documentation](https://remotive.io/api-documentation)
- [HAProxy](https://www.haproxy.org/)
- [Docker](https://www.docker.com/)

---

## Demo Video

_[Video demonstration about the job finder application](https://youtu.be/AMfzIeAhYsE)_
