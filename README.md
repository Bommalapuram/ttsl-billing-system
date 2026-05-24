# 🏗️ TTSL Next-Gen CRM & Real-Time Billing Platform

### 🌐 Client: Tata Teleservices Limited (Telecom Domain)
### ⚙️ Automation Framework: GitOps with Jenkins, Docker, Kubernetes, Helm, & ArgoCD

---

## 📌 Project Overview
This project represents the cloud-native modernization of the legacy telecom billing system for **Tata Teleservices Limited (TTSL)**. The platform is structured as a resilient **3-Tier Microservices Architecture** capable of handling data for over 10 million active telecom subscribers, processing millions of Call Detail Records (CDRs) daily with zero downtime.

---

## 🏗️ 3-Tier Architecture Framework

Our application is split into three decoupled operational layers:
1. **Frontend Tier (Node.js/Express):** A high-performance web interface used by telecom customer service executives to view billing cycles and subscriber statuses.
2. **Backend Tier (Python/Flask Billing Engine):** The core business logic layer responsible for real-time rating calculation, core mediation, and balance auditing.
3. **Database Tier (PostgreSQL Ledger):** A reliable transaction database management system maintaining secure and ACID-compliant records of customer prepaid balance ledgers.

---

## 📂 Repository Directory Structure

```text
ttsl-billing-system/
├── README.md               # Detailed project documentation and architecture flow
├── Jenkinsfile             # Declarative CI pipeline configuration for building Docker images
├── argo-app.yaml           # Declarative GitOps deployment manifest for ArgoCD
├── src/                    # Application source code directory
│   ├── frontend/           # Node.js User Interface files & custom Dockerfile
│   └── backend/            # Python Billing Logic files & custom Dockerfile
└── helm-chart/             # Kubernetes orchestration templates managed via Helm packaging
    ├── Chart.yaml          # Helm metadata structure and chart versioning
    ├── values.yaml         # Centralized environment parameters for cluster configuration
    └── templates/          # Isolated deployment manifests for Frontend, Backend, & Database
```

---

## 🔄 Automated CI/CD & GitOps Workflow

The entire software delivery lifecycle is fully automated, eliminating manual infrastructure interactions:

1. **Continuous Integration (CI via Jenkins):**
   * Code changes pushed to GitHub automatically trigger the Jenkins multi-stage pipeline using dynamic **Webhooks**.
   * Jenkins clones the code, initiates secure isolated builds for both Frontend and Backend Docker containers, and pushes versioned tags directly to the private **Docker Hub registry**.
2. **Continuous Delivery (CD via ArgoCD GitOps):**
   * **ArgoCD** continuously polls this GitHub repository to match the live Kubernetes state with the declarative manifests inside the `/helm-chart` directory.
   * Enables automated self-healing and instant rolling-updates without manual `kubectl apply` interventions.

---

## 🔥 Production Troubleshooting Case Study: Resolving `CrashLoopBackOff`

### What is CrashLoopBackOff?
A `CrashLoopBackOff` status means that a scheduled Kubernetes pod starts up, encounters an application or structural error, crashes immediately, and enters a progressive restart delay loop controlled by the cluster engine.

### How it is simulated & diagnosed in this project:
1. **The Issue Trigger:** Misconfiguring database connection secrets or changing command targets inside `helm-chart/templates/backend-deploy.yaml` forces the billing microservice pod straight into a crash loop.
2. **Step 1 - Detection:** Tracked via live **Prometheus alerts** and isolated inside the active namespace using:
   ```bash
   kubectl get pods -n default
   ```
3. **Step 2 - Deep Inspection:** Pulling deep cluster-level orchestration event streams to identify entry issues:
   ```bash
   kubectl describe pod <crashed-pod-name>
   ```
4. **Step 3 - Root Cause Analysis (RCA):** Retrieving dead container termination console streams to catch precise software bugs:
   ```bash
   kubectl logs <crashed-pod-name> --previous
   ```
5. **Step 4 - Resolution:** Fix the schema parameter or target script locally, commit to GitHub, and let **ArgoCD auto-sync** roll out healthy self-healing configurations instantly.

---
### 🛠️ Configured and Maintained by Siva Chandaluri (Cloud DevOps & Production Engineer)
