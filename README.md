# Nexus-Ai CI/CD Pipeline

## Task 4: Continuous Integration (CI) Pipeline

### Overview
This project includes a CI/CD pipeline using GitHub Actions to automate building, testing, linting, security analysis, and deployment of frontend and backend containers.

### Pipeline Tasks
- **Build Containers**: Separate jobs for frontend and backend.
- **Run Unit Tests**: Executes tests inside Docker containers.
- **Run Linter & SAST**: Ensures code quality and security compliance.
- **Push Containers to DockerHub**: Tags and uploads images.

### Trigger Events
- Runs on every commit to `main`.
- Executes on every pull request creation.

### Best Practices
- Uses caching to optimize execution.
- Publishes unit test results.
- Ignores unnecessary file changes to prevent redundant runs.

### Deliverables
- CI pipeline configuration file: `.github/workflows/ci.yml`
- Code, scripts, and Docker configurations hosted on GitHub/GitLab.

### Setup Instructions
1. Ensure Docker and Node.js are installed.
2. Configure GitHub Secrets for `DOCKERHUB_USERNAME` and `DOCKERHUB_PASSWORD`.
3. Push changes to `main` to trigger the pipeline.

