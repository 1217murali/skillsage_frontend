// src/data/DockerCourseData.ts

import React from "react";
import { CheckCircle, Zap, Shield, GitBranch, Archive, Database } from "lucide-react";

/* -------------------- INTERFACES (Reused for Consistency) -------------------- */
export interface QuizQuestion { id: string; question: string; options: string[]; answer: number; }
export interface DetailedSubmodule { id: string; title: string; content: React.ReactNode; estimatedReadingTime: string; moduleId: string; }
export interface ModuleProgress { readProgress: number; isCompleted: boolean; isQuizCompleted: boolean; }
export interface ModuleDefinition {
    id: string;
    title: string;
    submodules: DetailedSubmodule[];
    quizId: string;
    nextModuleId: string | null;
}

// Helper function to create content structure
const createContent = (moduleId: string, title: string, estimatedReadingTime: string, content: React.ReactNode): DetailedSubmodule => ({
    moduleId, title, estimatedReadingTime, content, id: title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, ''),
});

/* -------------------- QUIZ DATA (8 MODULES TOTAL) -------------------- */
export const QUIZ_QUESTIONS: Record<string, QuizQuestion[]> = {
    // --- D-101: Docker Fundamentals Quiz ---
    "d-101-final": [
        { id: "d101-q1", question: "What is the primary difference between a container and a virtual machine (VM)?", options: ["Containers use hardware virtualization", "Containers share the host OS kernel", "VMs are smaller and faster", "Containers require a hypervisor"], answer: 1, },
        { id: "d101-q2", question: "Which command is used to build an image from a Dockerfile?", options: ["docker create", "docker run", "docker build", "docker start"], answer: 2, },
        { id: "d101-q3", question: "Which file defines the steps to create a Docker image?", options: ["docker-compose.yml", "package.json", "Dockerfile", "ContainerConfig"], answer: 2, },
        { id: "d101-q4", question: "What does the 'FROM' instruction in a Dockerfile specify?", options: ["The command to execute", "The base image for the build", "The port to expose", "The working directory"], answer: 1, },
        { id: "d101-q5", question: "Which command stops a running container without removing it?", options: ["docker rm", "docker kill", "docker stop", "docker prune"], answer: 2, },
    ],
    // --- D-201: Kubernetes Basics Quiz ---
    "d-201-final": [
        { id: "d201-q1", question: "What is the smallest deployable unit in Kubernetes?", options: ["Node", "Service", "Deployment", "Pod"], answer: 3, },
        { id: "d201-q2", question: "Which component runs on every node to manage pods and container runtimes?", options: ["API Server", "Scheduler", "Kubelet", "Etcd"], answer: 2, },
        { id: "d201-q3", question: "Which resource defines a desired state for replicated pods?", options: ["Service", "Ingress", "ReplicaSet", "ConfigMap"], answer: 2, },
        { id: "d201-q4", question: "What is a Kubernetes Service primarily used for?", options: ["Storing configuration data", "Providing a stable network endpoint for a set of Pods", "Executing batch jobs", "Managing persistent storage"], answer: 1, },
        { id: "d201-q5", question: "What command is used to deploy a manifest file in Kubernetes?", options: ["kubectl run", "kubectl start", "kubectl get", "kubectl apply"], answer: 3, },
    ],
    // --- D-301: Networking & Service Mesh Quiz ---
    "d-301-final": [
        { id: "d301-q1", question: "Which Docker network type creates a dedicated network for containers on the same host?", options: ["Host", "None", "Bridge", "Overlay"], answer: 2, },
        { id: "d301-q2", question: "In Kubernetes, what is the function of the CNI (Container Network Interface)?", options: ["Managing persistent storage", "Enforcing security policies", "Implementing network connectivity between Pods", "Handling load balancing"], answer: 2, },
        { id: "d301-q3", question: "What resource allows external HTTP/S traffic to be routed to internal K8s Services based on path or host?", options: ["Service", "NodePort", "Ingress", "LoadBalancer"], answer: 2, },
        { id: "d301-q4", question: "Which concept abstracts and manages service-to-service communication, including traffic routing and security?", options: ["CNI", "Ingress Controller", "Service Mesh", "Kube-proxy"], answer: 2, },
        { id: "d301-q5", question: "What is a 'sidecar' container often used for in a Service Mesh context?", options: ["Running the main application logic", "Managing storage", "Handling network traffic, metrics, and security for the main container", "Defining the desired state"], answer: 2, },
    ],
    // --- D-401: Persistent Storage & Volumes Quiz ---
    "d-401-final": [
        { id: "d401-q1", question: "Why are ephemeral volumes insufficient for a database container?", options: ["They are too slow", "Data is lost when the Pod restarts or is deleted", "They are limited in size", "They cannot be backed up"], answer: 1, },
        { id: "d401-q2", question: "In Kubernetes, what resource represents the underlying storage infrastructure (e.g., an AWS EBS volume)?", options: ["PersistentVolumeClaim (PVC)", "Volume", "StorageClass", "PersistentVolume (PV)"], answer: 3, },
        { id: "d401-q3", question: "Which of the following is an example of an Access Mode for a PV?", options: ["ReadWriteOnce", "ReadMany", "ExecuteOnly", "WriteOnce"], answer: 0, },
        { id: "d401-q4", question: "What mechanism allows a PVC to dynamically provision a new PV based on defined parameters?", options: ["Volume Binding", "Static Provisioning", "Storage Class", "Claim Rebinding"], answer: 2, },
        { id: "d401-q5", question: "What is a major benefit of using a StatefulSet over a Deployment for a database?", options: ["Guaranteed faster deployment speed", "Stable network identity and persistent storage per Pod replica", "Automatic load balancing via NodePort", "Ability to run multiple replicas on one Node"], answer: 1, },
    ],
    // --- D-501: Container Security & Best Practices Quiz ---
    "d-501-final": [
        { id: "d501-q1", question: "What principle does using a non-root user in a Dockerfile adhere to?", options: ["Principle of Least Privilege", "Single Responsibility Principle", "Inversion of Control", "Volume Isolation Principle"], answer: 0, },
        { id: "d501-q2", question: "What tool is primarily used for scanning container images for known vulnerabilities (CVEs)?", options: ["Trivy", "Kubelet", "Docker Compose", "Etcd"], answer: 0, },
        { id: "d501-q3", question: "The process of reducing the attack surface by removing unnecessary packages from a base image is called:", options: ["Layering", "Multi-stage building", "Image pruning", "Image slimming"], answer: 1, },
        { id: "d501-q4", question: "In a Dockerfile, where should sensitive data (like API keys) NOT be placed?", options: ["In environment variables", "In the build arguments", "In the final image layer", "In a Kubernetes Secret"], answer: 2, },
        { id: "d501-q5", question: "What is a Kubernetes NetworkPolicy used to control?", options: ["Ingress/Egress traffic between Pods and network endpoints", "Which Node a Pod is scheduled on", "The CPU limits of a container", "The security context of the container runtime"], answer: 0, },
    ],
    // --- D-601: Helm & Package Management Quiz ---
    "d-601-final": [
        { id: "d601-q1", question: "What is the primary function of Helm in the Kubernetes ecosystem?", options: ["Container runtime interface", "Centralized configuration store", "Package manager for Kubernetes applications", "Network load balancer"], answer: 2, },
        { id: "d601-q2", question: "What is a 'Chart' in Helm terminology?", options: ["A running instance of an application", "A repository for images", "A package containing all the resource definitions for an application", "A template for a Dockerfile"], answer: 2, },
        { id: "d601-q3", question: "Which file in a Helm Chart is used to customize configuration without modifying the templates?", options: ["Chart.yaml", "values.yaml", "templates/deployment.yaml", "requirements.yaml"], answer: 1, },
        { id: "d601-q4", question: "What is the name given to a running instance of a Helm Chart deployment?", options: ["Manifest", "Chart", "Release", "Package"], answer: 2, },
        { id: "d601-q5", question: "What command is used to deploy a Helm Chart to a cluster?", options: ["helm install", "helm build", "kubectl apply", "helm package"], answer: 0, },
    ],
    // --- D-701: Observability & Monitoring Quiz ---
    "d-701-final": [
        { id: "d701-q1", question: "The three pillars of observability are Metrics, Logging, and what else?", options: ["Alerting", "Tracing", "Profiling", "Autoscaling"], answer: 1, },
        { id: "d701-q2", question: "Which tool is commonly used in Kubernetes to scrape metrics from services and store them in a time-series database?", options: ["Elasticsearch", "Fluentd", "Prometheus", "Kibana"], answer: 2, },
        { id: "d701-q3", question: "In Kubernetes, what are Liveness and Readiness probes used for?", options: ["Defining resource limits", "Checking an application's health and availability", "Injecting environment variables", "Managing persistent storage"], answer: 1, },
        { id: "d701-q4", question: "What does APM stand for in the context of application monitoring?", options: ["Application Pod Manager", "Advanced Process Metrics", "Application Performance Monitoring", "Automated Policy Maker"], answer: 2, },
        { id: "d701-q5", question: "A centralized logging system helps aggregate logs from multiple container instances. What is a popular log collector agent used within Kubernetes Pods?", options: ["NGINX", "Grafana", "Fluent Bit/Fluentd", "Istio"], answer: 2, },
    ],
    // --- D-801: Serverless & Cloud Containers Quiz ---
    "d-801-final": [
        { id: "d801-q1", question: "Which term describes a platform where the underlying server infrastructure is fully managed by the cloud provider, allowing users to focus only on their containers?", options: ["PaaS", "IaaS", "CaaS (Containers as a Service)", "SaaS"], answer: 2, },
        { id: "d801-q2", question: "In the context of AWS, what is the serverless compute engine for containers that removes the need to provision/manage EC2 instances?", options: ["EKS", "ECR", "Fargate", "Lambda"], answer: 2, },
        { id: "d801-q3", question: "Which serverless container platform is often used by Google Cloud to run containers on a fully managed environment (no cluster management)?", options: ["GKE", "Cloud Functions", "Cloud Run", "Anthos"], answer: 2, },
        { id: "d801-q4", question: "What is a primary advantage of a serverless container approach?", options: ["Maximum control over the host OS", "Fixed monthly cost regardless of usage", "Automatic scaling and pay-per-use billing", "Easier integration with legacy systems"], answer: 2, },
        { id: "d801-q5", question: "What does 'Service Mesh' *not* manage for serverless containers?", options: ["Traffic routing", "Authentication/Authorization", "The underlying VM/Node infrastructure", "Observability/Telemetry"], answer: 2, },
    ],
};

/* -------------------- STATIC MODULE CONTENT (D-101 and D-201) -------------------- */

// D-101: Docker Fundamentals (5 Submodules)
const MODULE_D101_SUBMODULES: DetailedSubmodule[] = [
    createContent("d-101", "1.1 Containers vs. VMs (Isolation)", "8 min", (
        <React.Fragment>
            <p>
                A **Virtual Machine (VM)** uses a hypervisor to virtualize the hardware, including the operating system (OS). Each VM has its own guest OS kernel. Containers, managed by Docker, share the host OS kernel, making them lightweight, faster to start, and consume significantly less disk space and RAM. Containers provide application-level isolation.
            </p>
            <h4 className="mt-4 font-semibold">Key Takeaway:</h4>
            <p>
                Containers virtualize the OS layer; VMs virtualize the hardware layer. Containers are the choice for packaging and deploying single applications reliably.
            </p>
        </React.Fragment>
    )),
    createContent("d-101", "1.2 Anatomy of a Dockerfile", "10 min", (
        <React.Fragment>
            <p>
                The **Dockerfile** is a text file containing all the commands a user could call on the command line to assemble an image. It is the blueprint for creating reproducible builds.
            </p>
            <h4 className="mt-4 font-semibold">Essential Instructions:</h4>
            <ul className="list-disc ml-6 space-y-2">
                <li>**`FROM`**: Specifies the base image (e.g., `FROM node:18-alpine`).</li>
                <li>**`WORKDIR`**: Sets the working directory for subsequent instructions.</li>
                <li>**`COPY`**: Copies local files/directories into the container image.</li>
                <li>**`RUN`**: Executes commands during the image build process (e.g., installing packages).</li>
                <li>**`EXPOSE`**: Documents which ports the container will listen on (does not publish them).</li>
                <li>**`CMD` / `ENTRYPOINT`**: Defines the default command to run when the container starts.</li>
            </ul>
        </React.Fragment>
    )),
    createContent("d-101", "1.3 Building and Layering Images", "12 min", (
        <React.Fragment>
            <p>
                When you run `docker build`, Docker processes each instruction in the Dockerfile, creating a read-only **layer** for every command. This layering is key to caching and efficiency. If an instruction (and its dependencies) hasn't changed, Docker uses the cached layer from a previous build.
            </p>
            <h4 className="mt-4 font-semibold">Build Optimization Tip:</h4>
            <p>
                Place frequently changing files (like application source code) near the end of the Dockerfile, and stable files (like package definitions and base OS installs) near the top. This maximizes the use of the build cache.
            </p>
        </React.Fragment>
    )),
    createContent("d-101", "1.4 Running and Inspecting Containers", "10 min", (
        <React.Fragment>
            <p>
                The `docker run` command creates and starts a container from an image. Key flags are essential for runtime management:
            </p>
            <ul className="list-disc ml-6 space-y-2">
                <li>**`-d`**: Runs the container in detached (background) mode.</li>
                <li>**`-p 8080:80`**: Publishes port 80 in the container to port 8080 on the host machine.</li>
                <li>**`--name`**: Assigns a human-readable name to the container.</li>
                <li>**`--rm`**: Automatically removes the container when it exits.</li>
            </ul>
            <p className="mt-4">
                Use `docker ps` to list running containers and `docker logs [container-id]` to view the container's output.
            </p>
        </React.Fragment>
    )),
    createContent("d-101", "1.5 Docker Compose for Multi-Container Apps", "10 min", (
        <React.Fragment>
            <p>
                **Docker Compose** is a tool for defining and running multi-container Docker applications. Configuration is managed in a `docker-compose.yml` file (YAML format), which defines services (containers), networks, and volumes.
            </p>
            <h4 className="mt-4 font-semibold">Key Compose Commands:</h4>
            <ul className="list-disc ml-6 space-y-2">
                <li>**`docker compose up`**: Builds (if necessary), creates, and starts all services defined in the file.</li>
                <li>**`docker compose down`**: Stops and removes containers, networks, and volumes created by `up`.</li>
            </ul>
            <p className="mt-4">
                Compose simplifies local development workflows, allowing a full application stack (e.g., frontend, API, database) to be managed with a single command.
            </p>
        </React.Fragment>
    )),
];

// D-201: Kubernetes Basics (5 Submodules)
const MODULE_D201_SUBMODULES: DetailedSubmodule[] = [
    createContent("d-201", "2.1 Kubernetes Architecture: Master and Nodes", "10 min", (
        <React.Fragment>
            <p>
                **Kubernetes (K8s)** is an open-source system for automating the deployment, scaling, and management of containerized applications. It operates on a **Master-Node** architecture.
            </p>
            <h4 className="mt-4 font-semibold">Control Plane (Master Node) Components:</h4>
            <ul className="list-disc ml-6 space-y-2">
                <li>**`API Server`**: The frontend for the control plane; receives all REST commands.</li>
                <li>**`Etcd`**: The highly available key-value store for saving the cluster's state.</li>
                <li>**`Scheduler`**: Watches for new Pods and assigns them to a healthy Node.</li>
                <li>**`Controller Manager`**: Runs controller processes (Node, Replication, Endpoint controllers, etc.) to manage the cluster's state.</li>
            </ul>
        </React.Fragment>
    )),
    createContent("d-201", "2.2 The Pod: K8s' Smallest Unit", "8 min", (
        <React.Fragment>
            <p>
                A **Pod** is the smallest deployable unit in Kubernetes. It typically encapsulates one or more containers (which share the same network namespace, volumes, and lifecycle).
            </p>
            <h4 className="mt-4 font-semibold">Pod Lifecycle:</h4>
            <p>
                Pods are **ephemeral**. They are created, assigned to a Node, run their containers, and are terminated. You should never manually create a single Pod in production; instead, rely on controllers like Deployments or ReplicaSets to manage their lifecycle.
            </p>
        </React.Fragment>
    )),
    createContent("d-201", "2.3 Deployments and ReplicaSets", "10 min", (
        <React.Fragment>
            <p>
                A **Deployment** is the most common way to deploy a stateless application. It provides declarative updates for Pods and ReplicaSets. It defines the desired state: how many replicas to run, which image to use, and how to update them.
            </p>
            <h4 className="mt-4 font-semibold">Role of ReplicaSet:</h4>
            <p>
                The **ReplicaSet** ensures a specified number of Pod replicas are running at any given time. The Deployment manages the ReplicaSet, providing features like rolling updates and rollback capability.
            </p>
        </React.Fragment>
    )),
    createContent("d-201", "2.4 Services and Load Balancing", "10 min", (
        <React.Fragment>
            <p>
                A **Service** provides a stable network endpoint (a virtual IP and DNS name) for a logical set of Pods. Since Pods are ephemeral, the Service acts as a reliable front door, automatically load balancing traffic across the available Pods defined by a selector label.
            </p>
            <h4 className="mt-4 font-semibold">Service Types:</h4>
            <ul className="list-disc ml-6 space-y-2">
                <li>**`ClusterIP`**: Default type, exposes the Service only within the cluster.</li>
                <li>**`NodePort`**: Exposes the Service on a static port on each Node's IP.</li>
                <li>**`LoadBalancer`**: Exposes the Service externally using a cloud provider's load balancer.</li>
            </ul>
        </React.Fragment>
    )),
    createContent("d-201", "2.5 Configuration and Storage (ConfigMaps/Volumes)", "12 min", (
        <React.Fragment>
            <p>
                **ConfigMaps** and **Secrets** are used to inject non-sensitive and sensitive configuration data (respectively) into Pods as environment variables or mounted files. This decouples application code from configuration, enabling easier deployment across environments.
            </p>
            <h4 className="mt-4 font-semibold">Persistent Volumes (PV) and Claims (PVC):</h4>
            <p>
                Since Pods are ephemeral, **Persistent Volumes (PVs)** provide storage that persists beyond the Pod's life. A **Persistent Volume Claim (PVC)** is a request for storage by a user/Pod, abstracting the underlying storage implementation details.
            </p>
        </React.Fragment>
    )),
];


/* -------------------- NEW MODULE CONTENT (D-301 through D-801) -------------------- */

// D-301: Networking & Service Mesh
const MODULE_D301_SUBMODULES: DetailedSubmodule[] = [
    createContent("d-301", "3.1 Docker Network Drivers (Bridge, Host, Overlay)", "10 min", (
        <React.Fragment>
            <p>
                Docker uses different **network drivers** for container communication. The **bridge** driver is the default, creating a private internal network on the host. The **host** driver removes network isolation, sharing the host's networking stack. The **overlay** driver enables multi-host container communication, essential for Docker Swarm or other orchestration tools.
            </p>
            <h4 className="mt-4 font-semibold">Key Command:</h4>
            <p>
                Use `docker network ls` to view existing networks and `docker network create [driver] [name]` to create a custom one.
            </p>
        </React.Fragment>
    )),
    createContent("d-301", "3.2 Kubernetes CNI and Network Model", "12 min", (
        <React.Fragment>
            <p>
                The **Container Network Interface (CNI)** is a specification that Kubernetes uses to delegate the provisioning of network resources. This model requires that every Pod has its own unique IP address and that all Pods can communicate with all other Pods without NAT, regardless of which Node they are on.
            </p>
            <h4 className="mt-4 font-semibold">Popular CNI Plugins:</h4>
            <ul className="list-disc ml-6">
                <li>**Flannel**: Simple and widely used.</li>
                <li>**Calico**: More advanced, offers security features (NetworkPolicy).</li>
                <li>**Cilium**: Uses eBPF for high-performance networking and security.</li>
            </ul>
        </React.Fragment>
    )),
    createContent("d-301", "3.3 Ingress for External Traffic", "10 min", (
        <React.Fragment>
            <p>
                An **Ingress** object manages external access to the services in a cluster, typically HTTP and HTTPS. It acts as a layer 7 load balancer and provides routing rules, SSL termination, and host-based or path-based routing. It requires an **Ingress Controller** (like NGINX or Traefik) to be running in the cluster to fulfill the Ingress rules.
            </p>
        </React.Fragment>
    )),
    createContent("d-301", "3.4 Introduction to Service Mesh (Istio/Linkerd)", "15 min", (
        <React.Fragment>
            <p>
                A **Service Mesh** is a dedicated infrastructure layer for handling service-to-service communication. It uses a **sidecar proxy** (like Envoy) deployed alongside every application container to manage traffic, security, and observability transparently.
            </p>
            <h4 className="mt-4 font-semibold">Core Benefits:</h4>
            <p>
                Enables advanced features like **mTLS (mutual TLS)** for secure communication, **circuit breaking**, **retries**, **traffic splitting** (for canary deployments), and deep metrics collection, all without changing application code.
            </p>
        </React.Fragment>
    )),
];

// D-401: Persistent Storage & Volumes
const MODULE_D401_SUBMODULES: DetailedSubmodule[] = [
    createContent("d-401", "4.1 Data Persistence Challenges", "8 min", (
        <React.Fragment>
            <p>
                Containers are designed to be immutable and ephemeral. When a container restarts, any data written to its writable layer is lost. For applications that need to store data persistently (like databases or file servers), you must use **Volumes**.
            </p>
        </React.Fragment>
    )),
    createContent("d-401", "4.2 Docker Volumes and Bind Mounts", "10 min", (
        <React.Fragment>
            <p>
                **Docker Volumes** are the preferred mechanism for persistent data. They are managed by Docker and stored outside the container's lifecycle. **Bind Mounts** link a directory from the host filesystem directly into the container, commonly used for local development.
            </p>
            <h4 className="mt-4 font-semibold">Key Difference:</h4>
            <p>
                Volumes are abstract and platform-agnostic; Bind Mounts are host-dependent and can introduce security risks if improperly configured.
            </p>
        </React.Fragment>
    )),
    createContent("d-401", "4.3 Kubernetes Persistent Volumes (PV) and Claims (PVC)", "12 min", (
        <React.Fragment>
            <p>
                The **PV** is a cluster resource provided by an administrator (or dynamically by a provisioner) that represents the underlying storage. The **PVC** is a request for storage by an application, acting as a link between a Pod and the PV. This separation allows developers to request storage without knowing the infrastructure details.
            </p>
        </React.Fragment>
    )),
    createContent("d-401", "4.4 StorageClass and Dynamic Provisioning", "10 min", (
        <React.Fragment>
            <p>
                A **StorageClass** provides a way for administrators to describe the "classes" of storage they offer (e.g., fast-SSD, slow-HDD, backup-tier). When a PVC specifies a StorageClass, a provisioner automatically creates a matching PersistentVolume on-demand, which is known as **Dynamic Provisioning**.
            </p>
        </React.Fragment>
    )),
    createContent("d-401", "4.5 StatefulSets for State-Dependent Applications", "15 min", (
        <React.Fragment>
            <p>
                A **StatefulSet** is a workload API object used for managing stateful applications (e.g., MySQL, Kafka). Unlike Deployments, it guarantees ordering and uniqueness for Pods, giving each Pod a **stable network identity** and binding it to a **unique Persistent Volume Claim**.
            </p>
        </React.Fragment>
    )),
];

// D-501: Container Security & Best Practices
const MODULE_D501_SUBMODULES: DetailedSubmodule[] = [
    createContent("d-501", "5.1 The Principle of Least Privilege", "8 min", (
        <React.Fragment>
            <p>
                In containers, this means: **run as a non-root user** and only grant the container the minimum necessary permissions. Running as root is a major security risk, as a compromised container could gain root access on the host OS kernel it shares.
            </p>
            <h4 className="mt-4 font-semibold">Dockerfile Best Practice:</h4>
            <p>
                Always include the `USER [non-root-user]` instruction in your Dockerfile.
            </p>
        </React.Fragment>
    )),
    createContent("d-501", "5.2 Image Scanning and Vulnerability Management", "10 min", (
        <React.Fragment>
            <p>
                **Image Scanning** tools (like **Trivy** or **Clair**) analyze your container image layers against public databases of Common Vulnerabilities and Exposures (**CVEs**). This should be a mandatory step in your CI/CD pipeline to prevent known security flaws from reaching production.
            </p>
        </React.Fragment>
    )),
    createContent("d-501", "5.3 Multi-Stage Builds and Image Size Reduction", "12 min", (
        <React.Fragment>
            <p>
                A **Multi-Stage Build** uses multiple `FROM` statements in a single Dockerfile. The first stages contain build tools, dependencies, and source code, while the **final stage** only copies the minimal, necessary application binaries/files. This dramatically reduces the final image size and attack surface.
            </p>
        </React.Fragment>
    )),
    createContent("d-501", "5.4 Handling Secrets Safely (Docker Secrets / K8s Secrets)", "10 min", (
        <React.Fragment>
            <p>
                Never bake secrets (API keys, passwords, private keys) directly into a Dockerfile or a committed YAML manifest. Use Docker's built-in **Secrets** management (for Swarm) or the Kubernetes **Secret** resource, which is encrypted at rest in **Etcd** and only decrypted when mounted into a Pod.
            </p>
        </React.Fragment>
    )),
    createContent("d-501", "5.5 Kubernetes SecurityContext and NetworkPolicy", "10 min", (
        <React.Fragment>
            <p>
                The **SecurityContext** in a Pod definition controls security aspects like the user ID, group ID, and capabilities for a container. A **NetworkPolicy** defines how groups of Pods are allowed to communicate with each other and with external network endpoints (**Ingress and Egress rules**).
            </p>
        </React.Fragment>
    )),
];

// D-601: Helm & Package Management
const MODULE_D601_SUBMODULES: DetailedSubmodule[] = [
    createContent("d-601", "6.1 Why We Need a Package Manager for K8s", "8 min", (
        <React.Fragment>
            <p>
                Deploying a complex application often requires tens of Kubernetes manifests (Deployment, Service, ConfigMap, Ingress, etc.). Manually managing and updating these YAML files across environments is error-prone. **Helm** solves this by packaging these resources into a single, versioned unit.
            </p>
        </React.Fragment>
    )),
    createContent("d-601", "6.2 Anatomy of a Helm Chart", "12 min", (
        <React.Fragment>
            <p>
                A **Helm Chart** is a collection of files describing a related set of Kubernetes resources. Key components include:
            </p>
            <ul className="list-disc ml-6 space-y-2">
                <li>**`Chart.yaml`**: Metadata about the Chart (name, version).</li>
                <li>**`values.yaml`**: The default configuration values.</li>
                <li>**`templates/`**: Directory containing the actual Kubernetes manifest YAML files, which are templated using Go's template language.</li>
            </ul>
        </React.Fragment>
    )),
    createContent("d-601", "6.3 Templating and Values Overrides", "10 min", (
        <React.Fragment>
            <p>
                Helm templates allow you to inject dynamic variables (from `values.yaml`) into your static YAML manifests. Users can override default values using a custom YAML file or command-line flags (`--set`), enabling easy configuration of the same chart for different environments (dev, staging, prod).
            </p>
        </React.Fragment>
    )),
    createContent("d-601", "6.4 Managing Releases and Rollbacks", "10 min", (
        <React.Fragment>
            <p>
                A **Release** is a specific instance of a Chart deployed into a Kubernetes cluster. Helm tracks the history of every release. If a new deployment fails or introduces a bug, the `helm rollback [release-name] [revision]` command can revert the entire set of Kubernetes resources to a previous working state quickly and reliably.
            </p>
        </React.Fragment>
    )),
];

// D-701: Observability & Monitoring
const MODULE_D701_SUBMODULES: DetailedSubmodule[] = [
    createContent("d-701", "7.1 The Three Pillars of Observability", "8 min", (
        <React.Fragment>
            <p>
                **Observability** is the measure of how well you can understand the internal state of a system based on its external outputs. The three core signals are:
            </p>
            <ul className="list-disc ml-6 space-y-2">
                <li>**Metrics**: Numeric values collected over time (e.g., CPU utilization, request latency).</li>
                <li>**Logging**: Discrete, timestamped events or messages (e.g., error messages).</li>
                <li>**Tracing**: Tracking a single request's path through all services in a distributed system.</li>
            </ul>
        </React.Fragment>
    )),
    createContent("d-701", "7.2 Monitoring with Prometheus and Grafana", "12 min", (
        <React.Fragment>
            <p>
                **Prometheus** is the de facto standard for Kubernetes monitoring. It uses a **pull-based** model to scrape metrics from endpoints. **Grafana** is typically used alongside Prometheus to visualize the collected time-series data via dashboards, providing clear insights into application and cluster health.
            </p>
        </React.Fragment>
    )),
    createContent("d-701", "7.3 Kubernetes Health Checks (Liveness and Readiness)", "10 min", (
        <React.Fragment>
            <p>
                **Liveness Probes** tell Kubernetes whether an application is *running* (is it alive?). If the Liveness Probe fails, the container is restarted. **Readiness Probes** tell Kubernetes whether an application is *ready to serve traffic*. If the Readiness Probe fails, the Service temporarily stops routing traffic to that Pod.
            </p>
        </React.Fragment>
    )),
    createContent("d-701", "7.4 Centralized Logging: EFK Stack (Elasticsearch, Fluentd, Kibana)", "15 min", (
        <React.Fragment>
            <p>
                The **EFK Stack** is a common choice for centralized logging. **Fluentd** or **Fluent Bit** is deployed as a DaemonSet on every Node to collect logs from containers. **Elasticsearch** stores the logs, and **Kibana** provides a powerful UI for searching, analyzing, and visualizing the log data.
            </p>
        </React.Fragment>
    )),
];

// D-801: Serverless & Cloud Containers
const MODULE_D801_SUBMODULES: DetailedSubmodule[] = [
    createContent("d-801", "8.1 Container as a Service (CaaS) Overview", "8 min", (
        <React.Fragment>
            <p>
                **CaaS** is a cloud computing service that allows users to deploy and manage containerized applications without worrying about the underlying infrastructure. It bridges the gap between traditional IaaS/PaaS models, offering the flexibility of containers with the simplicity of managed services.
            </p>
        </React.Fragment>
    )),
    createContent("d-801", "8.2 AWS Fargate: Serverless Containers", "10 min", (
        <React.Fragment>
            <p>
                **AWS Fargate** is a serverless compute engine for both Amazon ECS (Elastic Container Service) and Amazon EKS (Elastic Kubernetes Service). With Fargate, you simply specify the CPU and memory required for your container, and AWS handles all the server/cluster management, patching, and scaling.
            </p>
        </React.Fragment>
    )),
    createContent("d-801", "8.3 Google Cloud Run: Event-Driven Containers", "10 min", (
        <React.Fragment>
            <p>
                **Google Cloud Run** is a fully managed serverless platform that allows you to run stateless containers via web requests or Pub/Sub events. It scales automatically from zero to thousands of instances and is billed only for the resources consumed during the request's processing.
            </p>
        </React.Fragment>
    )),
    createContent("d-801", "8.4 Azure Container Apps (ACA)", "10 min", (
        <React.Fragment>
            <p>
                **Azure Container Apps** is a service built for microservices and serverless containers, especially useful for applications that require scaling based on HTTP traffic, event-driven processing, or long-running background tasks. It abstracts away the complexity of managing a full Kubernetes cluster.
            </p>
        </React.Fragment>
    )),
    createContent("d-801", "8.5 When to Choose Serverless vs. Managed K8s", "12 min", (
        <React.Fragment>
            <p>
                Choose **Serverless Containers** (Fargate, Cloud Run) for simplicity, cost optimization (pay-per-use), and applications that scale easily from zero. Choose **Managed Kubernetes** (EKS, GKE, AKS) for maximum control, highly customized networking/storage, and applications that require a complex ecosystem of community tools.
            </p>
        </React.Fragment>
    )),
];


/* -------------------- DYNAMIC MODULE CONFIGURATION (TOTAL 8 MODULES) -------------------- */
// totalItems: 8
export const DOCKER_COURSE_MODULES: ModuleDefinition[] = [
    { 
        id: "m-d101", 
        title: "D-101: Docker Fundamentals & Compose", 
        submodules: MODULE_D101_SUBMODULES, 
        quizId: "d-101-final", 
        nextModuleId: "m-d201" 
    },
    { 
        id: "m-d201", 
        title: "D-201: Kubernetes Architecture & Deployment", 
        submodules: MODULE_D201_SUBMODULES, 
        quizId: "d-201-final", 
        nextModuleId: "m-d301" 
    },
    { 
        id: "m-d301", 
        title: "D-301: Networking, Ingress, & Service Mesh", 
        submodules: MODULE_D301_SUBMODULES, 
        quizId: "d-301-final", 
        nextModuleId: "m-d401" 
    },
    { 
        id: "m-d401", 
        title: "D-401: Persistent Storage & StatefulSets", 
        submodules: MODULE_D401_SUBMODULES, 
        quizId: "d-401-final", 
        nextModuleId: "m-d501" 
    },
    { 
        id: "m-d501", 
        title: "D-501: Container Security & Image Hardening", 
        submodules: MODULE_D501_SUBMODULES, 
        quizId: "d-501-final", 
        nextModuleId: "m-d601" 
    },
    { 
        id: "m-d601", 
        title: "D-601: Helm & Kubernetes Package Management", 
        submodules: MODULE_D601_SUBMODULES, 
        quizId: "d-601-final", 
        nextModuleId: "m-d701" 
    },
    { 
        id: "m-d701", 
        title: "D-701: Observability, Metrics, & Logging (Prometheus/EFK)", 
        submodules: MODULE_D701_SUBMODULES, 
        quizId: "d-701-final", 
        nextModuleId: "m-d801" 
    },
    { 
        id: "m-d801", 
        title: "D-801: Serverless Containers & Cloud Platforms (Fargate/Cloud Run)", 
        submodules: MODULE_D801_SUBMODULES, 
        quizId: "d-801-final", 
        nextModuleId: null // Final module
    },
];