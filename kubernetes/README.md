# Kubernetes Deployment Documentation

This directory contains Kubernetes manifests for deploying the application across dev and prod environments.

## Structure

```
kubernetes/
├── namespaces.yaml       # Namespace definitions
├── dev/                  # Development environment
│   ├── postgres-*        # PostgreSQL database manifests
│   ├── redis-*           # Redis manifests
│   ├── backend-*         # Backend service manifests
│   ├── frontend-*        # Frontend service manifests
│   └── ingress.yaml      # Ingress configuration
└── prod/                 # Production environment
    ├── postgres-*        # PostgreSQL database manifests
    ├── redis-*           # Redis manifests
    ├── backend-*         # Backend service manifests
    ├── frontend-*        # Frontend service manifests
    └── ingress.yaml      # Ingress configuration
```

## Deployment Steps

### 1. Create Namespaces

```bash
kubectl apply -f kubernetes/namespaces.yaml
```

### 2. Deploy Database Services

For development:
```bash
kubectl apply -f kubernetes/dev/postgres-pvc.yaml
kubectl apply -f kubernetes/dev/postgres-config.yaml
kubectl apply -f kubernetes/dev/postgres-secret.yaml
kubectl apply -f kubernetes/dev/postgres-statefulset.yaml
kubectl apply -f kubernetes/dev/postgres-service.yaml

kubectl apply -f kubernetes/dev/redis-pvc.yaml
kubectl apply -f kubernetes/dev/redis-statefulset.yaml
kubectl apply -f kubernetes/dev/redis-service.yaml
```

For production:
```bash
kubectl apply -f kubernetes/prod/postgres-pvc.yaml
kubectl apply -f kubernetes/prod/postgres-config.yaml
kubectl apply -f kubernetes/prod/postgres-secret.yaml
kubectl apply -f kubernetes/prod/postgres-statefulset.yaml
kubectl apply -f kubernetes/prod/postgres-service.yaml

kubectl apply -f kubernetes/prod/redis-pvc.yaml
kubectl apply -f kubernetes/prod/redis-statefulset.yaml
kubectl apply -f kubernetes/prod/redis-service.yaml
```

### 3. Deploy Backend Services

For development:
```bash
kubectl apply -f kubernetes/dev/backend-config.yaml
kubectl apply -f kubernetes/dev/backend-secret.yaml
kubectl apply -f kubernetes/dev/backend-deployment.yaml
kubectl apply -f kubernetes/dev/backend-service.yaml
```

For production:
```bash
kubectl apply -f kubernetes/prod/backend-config.yaml
kubectl apply -f kubernetes/prod/backend-secret.yaml
kubectl apply -f kubernetes/prod/backend-deployment.yaml
kubectl apply -f kubernetes/prod/backend-service.yaml
```

### 4. Deploy Frontend Services

For development:
```bash
kubectl apply -f kubernetes/dev/frontend-config.yaml
kubectl apply -f kubernetes/dev/frontend-secret.yaml
kubectl apply -f kubernetes/dev/frontend-deployment.yaml
kubectl apply -f kubernetes/dev/frontend-service.yaml
```

For production:
```bash
kubectl apply -f kubernetes/prod/frontend-config.yaml
kubectl apply -f kubernetes/prod/frontend-secret.yaml
kubectl apply -f kubernetes/prod/frontend-deployment.yaml
kubectl apply -f kubernetes/prod/frontend-service.yaml
```

### 5. Deploy Ingress Resources

For development:
```bash
kubectl apply -f kubernetes/dev/ingress.yaml
```

For production:
```bash
kubectl apply -f kubernetes/prod/ingress.yaml
```

## Environment Differences

- **Development**:
  - Uses fewer resources (CPU/memory)
  - Single replica for each service
  - Uses simple Ingress without TLS

- **Production**:
  - Higher resource limits
  - Multiple replicas for high availability
  - TLS encryption with cert-manager
  - Separate hostnames for frontend and API services

## Monitoring and Management

To view pods:
```bash
kubectl get pods -n dev
kubectl get pods -n prod
```

To view logs:
```bash
kubectl logs -f deployment/backend -n dev
kubectl logs -f deployment/frontend -n prod
```

To scale services:
```bash
kubectl scale deployment/backend -n prod --replicas=5
```

## Prerequisites

- Kubernetes cluster 1.19+
- kubectl installed and configured
- For production, cert-manager should be installed for TLS 