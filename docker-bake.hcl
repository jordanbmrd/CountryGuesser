// Build & push multi-arch images (amd64 + arm64) for this project.
// Usage:
//   export IMAGE_PREFIX=7doritos
//   export IMAGE_TAG=1.0.0
//   export REACT_APP_MAPBOX_TOKEN=pk.xxx   # optional
//   docker buildx create --use --name countryguesser || true
//   docker buildx bake --push

variable "IMAGE_PREFIX" {
  default = "countryguesser"
}

variable "IMAGE_TAG" {
  default = "latest"
}

// Comma-separated list: "linux/amd64,linux/arm64"
variable "DOCKER_PLATFORMS" {
  default = "linux/amd64,linux/arm64"
}

variable "REACT_APP_API_URI" {
  default = "/api"
}

variable "REACT_APP_WEBSOCKET_URI" {
  default = "/ws"
}

variable "REACT_APP_MAPBOX_TOKEN" {
  default = ""
}

function "split_csv" {
  params = [s]
  result = [for p in split(",", s) : trimspace(p)]
}

group "default" {
  targets = ["api", "websocket", "client"]
}

target "api" {
  context = "./server"
  dockerfile = "Dockerfile"
  tags = ["${IMAGE_PREFIX}/api:${IMAGE_TAG}"]
  platforms = split_csv(DOCKER_PLATFORMS)
}

target "websocket" {
  context = "./websocket-server"
  dockerfile = "Dockerfile"
  tags = ["${IMAGE_PREFIX}/websocket:${IMAGE_TAG}"]
  platforms = split_csv(DOCKER_PLATFORMS)
}

target "client" {
  context = "./client"
  dockerfile = "Dockerfile"
  tags = ["${IMAGE_PREFIX}/client:${IMAGE_TAG}"]
  platforms = split_csv(DOCKER_PLATFORMS)
  args = {
    REACT_APP_API_URI = REACT_APP_API_URI
    REACT_APP_WEBSOCKET_URI = REACT_APP_WEBSOCKET_URI
    REACT_APP_MAPBOX_TOKEN = REACT_APP_MAPBOX_TOKEN
  }
}

