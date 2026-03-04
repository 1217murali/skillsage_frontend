// src/data/SystemDesignCourseData.ts

import React from "react";
import { CheckCircle } from "lucide-react";

/* -------------------- INTERFACES -------------------- */
export interface QuizQuestion { 
    id: string; 
    question: string; 
    options: string[]; 
    answer: number; 
}

export interface DetailedSubmodule { 
    id: string; 
    title: string; 
    content: React.ReactNode; 
    estimatedReadingTime: string; 
    moduleId: string; 
}

export interface ModuleProgress { 
    readProgress: number; 
    isCompleted: boolean; 
    isQuizCompleted: boolean; 
}

export interface ModuleDefinition {
    id: string;
    title: string;
    submodules: DetailedSubmodule[];
    quizId: string;
    nextModuleId: string | null;
}

/* -------------------- QUIZ DATA -------------------- */
export const QUIZ_QUESTIONS: Record<string, QuizQuestion[]> = {
    "m-101-final": [
        { id: "m101-q1", question: "What is the primary goal of the high-level design phase in System Design?", options: ["Writing the production-ready code.", "Defining the system's architecture, components, and services.", "Optimizing database queries and indexes.", "Deploying the system to a cloud provider."], answer: 1, },
        { id: "m101-q2", question: "Which of the following is a key characteristic of a **scalable** system component?", options: ["It uses a single, monolithic database.", "It can handle an increasing number of users/requests by adding resources.", "It is entirely composed of legacy class components.", "It prioritizes low latency over high availability."], answer: 1, },
        { id: "m101-q3", question: "In the context of system design, what does **Latency** specifically refer to?", options: ["The number of requests a system handles per second.", "The amount of time it takes for a request to travel from client to server and back.", "The maximum amount of data the system can store.", "The percentage of time the system is operational."], answer: 1, },
        { id: "m101-q4", question: "What is **Availability** in System Design?", options: ["How quickly the system responds to a request.", "The measure of how often the system successfully executes the correct operations.", "The percentage of time the system is fully functional and accessible to users.", "The capacity of the system to manage simultaneous user connections."], answer: 2, },
        { id: "m101-q5", question: "What is the key difference between **High-Level Design (HLD)** and **Low-Level Design (LLD)**?", options: ["HLD uses NoSQL, while LLD uses SQL.", "HLD focuses on the system's overall architecture; LLD focuses on specific component implementation details.", "HLD is done by developers; LLD is done by architects.", "HLD covers security; LLD covers performance."], answer: 1, },
    ],
    "m-201-final": [
        { id: "m201-q1", question: "Which layer of the OSI model primarily deals with Load Balancing and Reverse Proxies?", options: ["Layer 2 (Data Link)", "Layer 3 (Network)", "Layer 4 (Transport)", "Layer 7 (Application)"], answer: 3, },
        { id: "m201-q2", question: "What is the main benefit of using a Content Delivery Network (CDN)?", options: ["Reducing database query latency.", "Enforcing strict security protocols on internal APIs.", "Caching static assets closer to the user to reduce load time and latency.", "Handling large volumes of asynchronous message processing."], answer: 2, },
        { id: "m201-q3", question: "What problem does a **Reverse Proxy** primarily solve?", options: ["It routes traffic from internal servers out to the internet.", "It balances incoming client requests across multiple backend servers, hiding the internal structure.", "It converts SQL queries into NoSQL operations.", "It manages the state between stateless HTTP requests."], answer: 1, },
        { id: "m201-q4", question: "How does **HTTPS** differ fundamentally from **HTTP**?", options: ["HTTPS is a newer version of HTTP/2.", "HTTPS is stateful, while HTTP is stateless.", "HTTPS encrypts communication using TLS/SSL.", "HTTPS uses UDP instead of TCP."], answer: 2, },
        { id: "m201-q5", question: "Which networking component is responsible for translating a human-readable domain name (e.g., google.com) into an IP address?", options: ["Load Balancer", "Reverse Proxy", "DNS (Domain Name System)", "API Gateway"], answer: 2, },
    ],
    "m-301-final": [
        { id: "m301-q1", question: "Which scaling strategy involves replacing servers with more powerful hardware?", options: ["Horizontal Scaling", "Vertical Scaling", "Asynchronous Scaling", "Functional Decomposition"], answer: 1, },
        { id: "m301-q2", question: "What is a major trade-off when optimizing a system for extremely low latency?", options: ["Reduced overall cost.", "Potentially lower durability or consistency.", "Higher throughput.", "Simpler system architecture."], answer: 1, },
        { id: "m301-q3", question: "In performance metrics, what is a **99th Percentile Latency** (P99)?", options: ["The fastest 99% of requests.", "The latency at which 99% of requests are faster.", "The latency at which 99% of requests are faster.", "The average latency multiplied by 99."], answer: 2, },
        { id: "m301-q4", question: "What is the primary goal of making a web server **stateless**?", options: ["To prevent SQL injection attacks.", "To ensure data is always stored in the database.", "To allow horizontal scaling by adding more servers easily.", "To reduce network bandwidth consumption."], answer: 2, },
        { id: "m301-q5", question: "Which metric measures the number of operations a system can handle per second?", options: ["Latency", "Availability", "Throughput", "Durability"], answer: 2, },
    ],
    "m-401-final": [
        { id: "m401-q1", question: "What core guarantee does **ACID** (in SQL databases) primarily concern?", options: ["High Availability.", "Data Integrity and Reliability.", "Eventual Consistency.", "Low Latency."], answer: 1, },
        { id: "m401-q2", question: "Which NoSQL database type is best suited for social network connections and transit routes?", options: ["Key-Value Store.", "Document Database.", "Graph Database.", "Column-Family Store."], answer: 2, },
        { id: "m401-q3", question: "What is **Database Sharding**?", options: ["Replicating the entire database on multiple machines.", "Splitting a database into smaller, independent partitions (shards).", "Creating a read replica for faster queries.", "Using an ORM to access the database."], answer: 1, },
        { id: "m401-q4", question: "What does **CAP Theorem** state about distributed databases?", options: ["Consistency and Partition Tolerance cannot both be fully achieved.", "Availability and Partition Tolerance cannot both be fully achieved.", "Only two of Consistency, Availability, and Partition Tolerance can be fully achieved simultaneously.", "Databases must be Consistent, Available, and Partition Tolerant."], answer: 2, },
        { id: "m401-q5", question: "In a Master-Slave replication setup, which node handles all write operations?", options: ["The Slave node.", "The Read Replica.", "The Master node.", "The Load Balancer."], answer: 2, },
    ],
    "m-501-final": [
        { id: "m501-q1", question: "What is **Eventual Consistency**?", options: ["All nodes agree on data immediately.", "Data will eventually be consistent across all nodes, given enough time.", "The system will eventually fail if consistency is not maintained.", "Only the Master node maintains consistency."], answer: 1, },
        { id: "m501-q2", question: "What is a common strategy to mitigate a single point of failure (SPOF)?", options: ["Implementing a single, large, central server.", "Using synchronous replication.", "Introducing redundancy and failover mechanisms.", "Prioritizing read operations over write operations."], answer: 2, },
        { id: "m501-q3", question: "Which protocol is commonly used to establish a consensus among a cluster of machines?", options: ["HTTP/2", "TLS/SSL", "Paxos or Raft", "FTP"], answer: 2, },
        { id: "m501-q4", question: "When designing a system, what is the 'Two Generals' Problem' an example of?", options: ["A common database deadlock scenario.", "The difficulty of achieving reliable communication over an unreliable network.", "A complex routing algorithm.", "A conflict between Availability and Consistency."], answer: 1, },
        { id: "m501-q5", question: "What is the key benefit of distributing a system across multiple geographic regions?", options: ["To reduce development cost.", "To ensure data is only available locally.", "To improve disaster recovery and global availability.", "To eliminate the need for load balancing."], answer: 2, },
    ],
    "m-601-final": [
        { id: "m601-q1", question: "Which Load Balancing algorithm distributes requests to the server with the fewest active connections?", options: ["Round Robin", "Least Connections", "IP Hash", "Weighted Round Robin"], answer: 1, },
        { id: "m601-q2", question: "What is a **Cache Stampede**?", options: ["A sudden influx of read requests to the database.", "Multiple clients simultaneously refreshing a single cache entry.", "A cache failure that requires a full system restart.", "When stale data is served from the cache."], answer: 1, },
        { id: "m601-q3", question: "Where is a **CDN** primarily deployed?", options: ["Close to the database server.", "In the core processing datacenter.", "At 'edge' locations close to the end-users.", "Inside the application server process."], answer: 2, },
        { id: "m601-q4", question: "What is the **Cache-Aside** pattern?", options: ["The application directly manages the cache, checking it before querying the database.", "The cache layer sits transparently between the application and the database.", "Data is written directly to both the cache and the database simultaneously.", "Only static assets are allowed in the cache."], answer: 0, },
        { id: "m601-q5", question: "What does Load Balancer **Session Affinity** (Sticky Sessions) ensure?", options: ["All requests from a user go to a single, specific backend server.", "The Load Balancer uses HTTPS.", "The user's session never expires.", "The Load Balancer is highly available."], answer: 0, },
    ],
    "m-701-final": [
        { id: "m701-q1", question: "What is the primary characteristic of a **Microservice** architecture?", options: ["A single, large codebase (Monolith).", "Services are loosely coupled, independently deployable, and focused on specific business capabilities.", "Services must all use the same database.", "The system runs on a single physical server."], answer: 1, },
        { id: "m701-q2", question: "The **API Gateway** pattern is primarily used to:", options: ["Implement all business logic in one place.", "Provide a single entry point for clients, handling routing, authentication, and rate limiting.", "Completely replace the need for load balancers.", "Only route traffic to a monolithic application."], answer: 1, },
        { id: "m701-q3", question: "What is **Rate Limiting**?", options: ["Reducing the size of API responses.", "Limiting the number of requests a client can make in a given time period.", "Ensuring API responses are delivered in a specific order.", "Calculating the throughput of an API."], answer: 1, },
        { id: "m701-q4", question: "Which is a major challenge of a Microservices architecture?", options: ["Overly simple deployment.", "Increased inter-service communication complexity (e.g., distributed tracing).", "Inability to use different technologies for different services.", "High deployment coupling."], answer: 1, },
        { id: "m701-q5", question: "What is **Service Discovery**?", options: ["The process of locating available service instances on a network.", "The business logic of a service.", "Monitoring the health of a database.", "Identifying user activity."], answer: 0, },
    ],
    "m-801-final": [
        { id: "m801-q1", question: "The main benefit of using a **Message Queue** is to enable:", options: ["Synchronous, low-latency communication.", "Direct point-to-point network calls.", "Asynchronous communication and decoupling of services.", "Real-time, two-way data streaming."], answer: 2, },
        { id: "m801-q2", question: "What is the core difference between a Queue (e.g., SQS) and a Stream/Log (e.g., Kafka)?", options: ["Queues are faster than Streams.", "Queues typically offer at-most-once delivery; Streams are durable and allow replaying of events.", "Streams use push communication; Queues use pull.", "Queues are only for internal services."], answer: 1, },
        { id: "m801-q3", question: "What does **Idempotency** mean in the context of message processing?", options: ["Processing the message is guaranteed to be fast.", "Processing the message multiple times has the same result as processing it once.", "The message must be processed at least once.", "The message contains sensitive data."], answer: 1, },
        { id: "m801-q4", question: "Which tool is commonly used for real-time data ingestion and processing?", options: ["MySQL", "Redis", "Kafka", "Nginx"], answer: 2, },
        { id: "m801-q5", question: "In an event-driven architecture, what is an **Event**?", options: ["A user login to the system.", "A significant change in the state of a system.", "A message sent over HTTP.", "A configuration file."], answer: 1, },
    ],
    "m-901-final": [
        { id: "m901-q1", question: "What is the primary purpose of the **Circuit Breaker** pattern?", options: ["To log errors to a central server.", "To prevent a failing service from continuously overwhelming another service.", "To encrypt inter-service communication.", "To route traffic to the fastest server."], answer: 1, },
        { id: "m901-q2", question: "Which principle is often applied to ensure system components are only responsible for one thing?", options: ["DRY (Don't Repeat Yourself)", "YAGNI (You Aren't Gonna Need It)", "Single Responsibility Principle (SRP)", "Occam's Razor"], answer: 2, },
        { id: "m901-q3", question: "What is **Domain-Driven Design (DDD)** focused on?", options: ["High-performance data access.", "Modeling software to match a specific business domain.", "Designing the network infrastructure.", "Writing clear documentation."], answer: 1, },
    ],
    "m-1001-final": [
        { id: "m1001-q1", question: "What is the risk addressed by **Input Validation**?", options: ["Distributed tracing latency.", "Cross-Site Scripting (XSS) and SQL Injection.", "High database load.", "Slow API response times."], answer: 1, },
        { id: "m1001-q2", question: "What is a **Disaster Recovery Plan**?", options: ["A set of procedures to restore the system after a major, catastrophic failure.", "The budget for server upgrades.", "The plan for a new feature launch.", "A security audit report."], answer: 0, },
        { id: "m1001-q3", question: "What is the function of **TLS/SSL Certificates**?", options: ["To compress network traffic.", "To encrypt communication and verify server identity.", "To handle database connections.", "To manage user sessions."], answer: 1, },
    ],
    "m-1101-final": [
        { id: "m1101-q1", question: "What is the main advantage of using **Containers (e.g., Docker)** in deployment?", options: ["They are cheaper than virtual machines.", "They ensure the application runs consistently across all environments.", "They completely eliminate the need for operating systems.", "They only run Python applications."], answer: 1, },
        { id: "m1101-q2", question: "Which platform is most commonly used for automating the deployment and scaling of containers?", options: ["Git", "Kubernetes", "Redis", "Elasticsearch"], answer: 1, },
        { id: "m1101-q3", question: "What is a **Blue/Green Deployment** strategy?", options: ["Deploying a new version to a separate, identical environment before switching traffic to it.", "Splitting traffic 50/50 between two versions.", "A fast rollback mechanism.", "Testing on a developer's local machine."], answer: 0, },
    ],
    "m-1201-final": [
        { id: "m1201-q1", question: "When designing a large-scale system like Twitter, what is the primary challenge for the 'Timeline Feed' service?", options: ["Minimizing the number of API endpoints.", "Ensuring low latency for read operations (read-heavy).", "Enforcing strong ACID compliance.", "Handling a high volume of synchronous RPC calls."], answer: 1, },
        { id: "m1201-q2", question: "A system with a very high Read-to-Write ratio (e.g., YouTube video views) benefits most from which strategy?", options: ["Read Replicas and heavy Caching/CDNs.", "Vertical scaling of the main write database.", "Strictly transactional consistency.", "Using a simple Key-Value store for all data."], answer: 0, },
        { id: "m1201-q3", question: "What is a key consideration when designing a reliable payment gateway?", options: ["Eventually consistent data.", "Ensuring the system is always in a strongly consistent state (e.g., using two-phase commit).", "Prioritizing high throughput over consistency.", "Using UDP for communication."], answer: 1, },
    ],
};

/* -------------------- MODULE CONTENT DATA -------------------- */

const createModuleContent = (moduleId: string, title: string, estimatedReadingTime: string, content: React.ReactNode): DetailedSubmodule => ({
    moduleId, title, estimatedReadingTime, content, id: title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, ''),
});

const MODULE_M101_SUBMODULES: DetailedSubmodule[] = [
    createModuleContent("m-101", "1.1 What is System Design?", "7 min", (() => (
        <React.Fragment>
            <p className="mb-4">
                <strong>System Design</strong> is the process of defining the architecture, modules, interfaces, and data for a system to satisfy specific requirements.
                It's about figuring out <strong>what</strong> components are needed and <strong>how</strong> they interact to solve a complex problem reliably and at scale.
            </p>

            <h4 className="text-xl font-semibold mt-6 mb-3">The Core Objective:</h4>
            <p className="mb-4">
                The core objective is to create a robust blueprint that balances conflicting forces like cost, performance, security, and complexity.
                A good design is one that is <strong>scalable, available, and maintainable</strong>.
            </p>

            <div className="p-3 mt-4 rounded-md bg-blue-100 dark:bg-blue-900/50 border border-blue-200 dark:border-blue-800">
                <p className="font-medium text-blue-800 dark:text-blue-200">
                    <strong>Example:</strong> When designing an e-commerce platform, system design determines if you need a single database (simple, low scale)
                    or multiple distributed databases, caching layers, and microservices (complex, high scale).
                </p>
            </div>
        </React.Fragment>
    ))()),

    createModuleContent("m-101", "1.2 Importance of System Design in Interviews", "5 min", (() => (
        <React.Fragment>
            <p className="mb-4">
                System Design interviews test your ability to think like a senior engineer or architect. They assess your proficiency beyond simple coding tasks.
            </p>

            <h4 className="text-xl font-semibold mt-6 mb-3">What Interviewers Look For:</h4>
            <ul className="list-disc ml-6 space-y-2">
                <li><strong>Structural Thinking:</strong> Can you break a huge problem (like "Design Twitter") into manageable components?</li>
                <li><strong>Trade-off Analysis:</strong> Can you explain <em>why</em> you chose NoSQL over SQL for a specific use case?</li>
                <li><strong>Scalability & Performance:</strong> Do you know how to handle millions of users and high traffic?</li>
                <li><strong>Communication:</strong> Can you clearly articulate and justify your design decisions?</li>
            </ul>

            <div className="p-3 mt-4 rounded-md bg-green-100 dark:bg-green-900/50 border border-green-200 dark:border-green-800">
                <p className="font-medium text-green-800 dark:text-green-200">
                    <strong>Key Insight:</strong> The interviewer isn't looking for the <em>perfect</em> answer, but rather a structured approach and justification for key decisions.
                </p>
            </div>
        </React.Fragment>
    ))()),
    
    createModuleContent("m-101", "1.3 Types of System Design (HLD vs LLD)", "8 min", (() => (
        <React.Fragment>
            <h4 className="text-xl font-semibold mb-3">High-Level Design (HLD)</h4>
            <p className="mb-4">
                <strong>HLD</strong> is the <strong>big-picture</strong> view. It outlines the major components, the overall architecture, services, and how they connect.
            </p>
            <h4 className="text-xl font-semibold mt-6 mb-3">Low-Level Design (LLD)</h4>
            <p className="mb-4">
                <strong>LLD</strong> dives into the <strong>details</strong> of specific components. It deals with class structure, data schemas, algorithms, and interface methods.
            </p>
            <div className="p-3 mt-4 rounded-md bg-yellow-100 dark:bg-yellow-900/50 border border-yellow-200 dark:border-yellow-800">
                <p className="font-medium text-yellow-800 dark:text-yellow-200">
                    <strong>Analogy:</strong> HLD is the city map, showing where major buildings and roads are. LLD is the blueprint for a specific building, detailing rooms and plumbing.
                </p>
            </div>
        </React.Fragment>
    ))()),
    
    createModuleContent("m-101", "1.4 Key Components of a Scalable System", "10 min", (() => (
        <React.Fragment>
            <p className="mb-4">
                A scalable system typically involves several interconnected components designed to distribute load and handle failures:
            </p>
            <ul className="list-disc ml-6 space-y-3">
                <li><strong>Load Balancers:</strong> Distribute incoming network traffic across a group of backend servers. (e.g., Round Robin, Least Connections).</li>
                <li><strong>Web/App Servers:</strong> Handle business logic and API requests. (Stateless is key for scalability).</li>
                <li><strong>Databases (DB):</strong> Persistent storage for data.</li>
                <li><strong>Caches (In-Memory Data Store):</strong> Temporarily store frequently accessed data to speed up reads and reduce DB load. (e.g., Redis).</li>
                <li><strong>Message Queues:</strong> Enable asynchronous communication between services. (e.g., Kafka).</li>
            </ul>
            <p className="mb-8">
                Client → CDN → Load Balancer → Web/App Server ↔ Cache ↔ Database
            </p>
        </React.Fragment>
    ))()),
    
    createModuleContent("m-101", "1.5 Common Design Terminologies", "7 min", (() => (
        <React.Fragment>
            <p className="mb-4">
                Mastering the vocabulary is crucial for effective communication in System Design.
            </p>
            <ul className="list-disc ml-6 space-y-3">
                <li><strong>Latency:</strong> The <strong>delay</strong> before a transfer of data begins.</li>
                <li><strong>Throughput:</strong> The <strong>number of units</strong> (requests, data) a system can process per time unit.</li>
                <li><strong>Availability:</strong> The percentage of time a system is <strong>operational and accessible</strong>.</li>
                <li><strong>Scalability:</strong> The ability of a system to <strong>handle increased load</strong> by adding resources.</li>
                <li><strong>Durability:</strong> The assurance that data is <strong>safely stored</strong> and will not be lost.</li>
            </ul>
            <p className="mt-4 mb-8">
                These foundational terms will be referenced throughout the entire course.
            </p>
        </React.Fragment>
    ))()),
];

const MODULE_M201_SUBMODULES: DetailedSubmodule[] = [
    createModuleContent("m-201", "2.1 Basics of Computer Networks", "8 min", (() => (
        <React.Fragment>
            <p className="mb-4">
                System Design is built on top of networking. You need to understand the
                <strong> OSI model</strong> and the <strong>TCP/IP stack</strong> to grasp how requests travel through your system.
            </p>

            <h4 className="text-xl font-semibold mt-6 mb-3">OSI Model Layers (Focus):</h4>
            <ul className="list-disc ml-6 space-y-2">
                <li>
                    <strong>Layer 4 (Transport):</strong> Deals with segments, port numbers, and protocols like TCP/UDP.
                    Used by L4 Load Balancers.
                </li>
                <li>
                    <strong>Layer 7 (Application):</strong> Deals with data formatting (HTTP, REST, JSON) and user interaction.
                    Used by L7 Load Balancers and APIs.
                </li>
            </ul>

            <div className="p-3 mt-4 rounded-md bg-blue-100 dark:bg-blue-900/50 border border-blue-200 dark:border-blue-800">
                <p className="font-medium text-blue-800 dark:text-blue-200">
                    <strong>Deep Dive:</strong> Understanding the difference between
                    <strong> TCP (reliable)</strong> and
                    <strong> UDP (fast, unreliable)</strong> is critical for designing
                    low-latency systems (e.g., real-time gaming or video streaming).
                </p>
            </div>
        </React.Fragment>
    ))()),

    createModuleContent("m-201", "2.2 Client-Server Model & HTTP/S", "10 min", (() => (
        <React.Fragment>
            <p className="mb-4">
                The <strong>Client-Server model</strong> is the foundation of distributed systems, where the client requests a resource or service, and the server provides it.
            </p>

            <h4 className="text-xl font-semibold mt-6 mb-3">HTTP, HTTPS, REST, and WebSockets:</h4>
            <ul className="list-disc ml-6 space-y-2">
                <li><strong>HTTP (Hypertext Transfer Protocol):</strong> The primary protocol for communication, fundamentally <strong>stateless</strong>.</li>
                <li><strong>HTTPS:</strong> HTTP secured by <strong>TLS/SSL encryption</strong>. Essential for production systems.</li>
                <li><strong>REST:</strong> An architectural style (not a protocol) that uses standard HTTP methods (GET, POST, etc.) for communication. It prioritizes simplicity and statelessness.</li>
                <li><strong>WebSockets:</strong> Provides a <strong>full-duplex, persistent connection</strong> over a single TCP connection, ideal for real-time applications like chat or live updates.</li>
            </ul>
        </React.Fragment>
    ))()),
    
    createModuleContent("m-201", "2.3 Load Balancing and Reverse Proxies", "7 min", (() => (
        <React.Fragment>
            <p className="mb-4">
                A <strong>Reverse Proxy</strong> sits in front of one or more web servers, forwarding client requests to one of them. It provides an additional layer of abstraction and security.
            </p>
            <h4 className="text-xl font-semibold mt-6 mb-3">Load Balancing (LB):</h4>
            <p className="mb-4">
                Load balancing is a primary function of a reverse proxy. It distributes network traffic across multiple servers, ensuring no single server is overwhelmed.
            </p>
            <div className="p-3 mt-4 rounded-md bg-yellow-100 dark:bg-yellow-900/50 border border-yellow-200 dark:border-yellow-800">
                <p className="font-medium text-yellow-800 dark:text-yellow-200">
                    <strong>Benefit:</strong> Load balancers dramatically increase the <strong>availability</strong> (if one server fails, others take over) and <strong>scalability</strong> (allows adding more servers) of a system.
                </p>
            </div>
        </React.Fragment>
    ))()),
    
    createModuleContent("m-201", "2.4 CDN (Content Delivery Networks)", "5 min", (() => (
        <React.Fragment>
            <p className="mb-4">
                A <strong>CDN</strong> is a geographically distributed network of proxy servers and their data centers. Their purpose is to provide high availability and high performance by distributing the service spatially relative to end-users.
            </p>
            <h4 className="text-xl font-semibold mt-6 mb-3">Edge Caching:</h4>
            <p className="mb-4">
                CDNs cache static assets (images, CSS, JavaScript) at <strong>edge locations</strong> (Points of Presence) close to the user. This reduces the <strong>latency</strong> for the end-user and significantly offloads traffic from the origin server.
            </p>
        </React.Fragment>
    ))()),
    
    createModuleContent("m-201", "2.5 DNS (Domain Name System)", "6 min", (() => (
        <React.Fragment>
            <p className="mb-4">
                The <strong>DNS</strong> is the internet's phonebook. It translates human-friendly domain names (like <code>example.com</code>) into computer-friendly <strong>IP addresses</strong> (like <code>192.0.2.1</code>).
            </p>
            <h4 className="text-xl font-semibold mt-6 mb-3">Key DNS Role in SD:</h4>
            <p className="mb-4">
                DNS is the <strong>first step</strong> in almost every web request. Advanced DNS routing techniques (like Geolocation or Weighted Round Robin) can be used for basic <strong>traffic management</strong> even before a Load Balancer is reached.
            </p>
        </React.Fragment>
    ))()),
];

const MODULE_M301_SUBMODULES: DetailedSubmodule[] = [
    createModuleContent("m-301", "3.1 Understanding Scalability: Vertical vs. Horizontal", "10 min", (() => (
        <React.Fragment>
            <p className="mb-4">
                <strong>Scalability</strong> is a system's ability to handle a growing amount of work by adding resources. There are two primary ways to scale:
            </p>

            <h4 className="text-xl font-semibold mt-6 mb-3">Vertical Scaling (Scaling Up)</h4>
            <p className="mb-4">
                This means <strong>adding more power</strong> (CPU, RAM, Disk) to an existing single machine.
                It's simpler to implement but hits a hard limit on hardware capacity and suffers from a Single Point of Failure (SPOF).
            </p>

            <h4 className="text-xl font-semibold mt-6 mb-3">Horizontal Scaling (Scaling Out)</h4>
            <p className="mb-4">
                This means <strong>adding more machines</strong> to your pool of resources. This is the preferred method for high-scale, distributed systems,
                as it allows for near-limitless capacity and built-in redundancy. It requires stateless components and a Load Balancer.
            </p>

            <div className="p-3 mt-4 rounded-md bg-green-100 dark:bg-green-900/50 border border-green-200 dark:border-green-800">
                <p className="font-medium text-green-800 dark:text-green-200">
                    <strong>Example:</strong> Moving from a single, giant PostgreSQL server (Vertical)
                    to 10 smaller, load-balanced application servers (Horizontal).
                </p>
            </div>
        </React.Fragment>
    ))()),

    createModuleContent("m-301", "3.2 Performance Metrics: Latency vs. Throughput", "8 min", (() => (
        <React.Fragment>
            <p className="mb-4">
                System performance is measured by two key metrics, which often present a trade-off:
            </p>

            <ul className="list-disc ml-6 space-y-2">
                <li><strong>Latency (Response Time):</strong> The time it takes for a request to receive a response. Lower is better. Measured in milliseconds (ms) or seconds (s).</li>
                <li><strong>Throughput (QPS/RPS):</strong> The number of requests or transactions processed per unit of time. Higher is better. Measured in Queries per Second (QPS) or Requests per Second (RPS).</li>
            </ul>

            <h4 className="text-xl font-semibold mt-6 mb-3">The Importance of Percentiles (P95, P99)</h4>
            <p className="mb-4">
                Instead of just using the average (mean) latency, we use percentiles (like <strong>P99</strong> — the 99th percentile)
                which represents the worst-case response time for 99% of users. This is crucial for catching "long tail" performance issues
                that affect a small but significant number of users.
            </p>
        </React.Fragment>
    ))()),
    
    createModuleContent("m-301", "3.3 Amdahl's Law and Scaling Bottlenecks", "7 min", (() => (
        <React.Fragment>
            <p className="mb-4">
                <strong>Amdahl's Law</strong> states that the theoretical speedup of a task is limited by the portion of the task that cannot be parallelized (the sequential part).
            </p>
            <h4 className="text-xl font-semibold mt-6 mb-3">Scaling Bottlenecks:</h4>
            <ul className="list-disc ml-6 space-y-2">
                <li><strong>Database:</strong> Often the first bottleneck due to the difficulty of sharing write operations (statefulness).</li>
                <li><strong>Inter-Service Communication:</strong> Network overhead and serialization/deserialization add latency.</li>
                <li><strong>Single Point of Failure (SPOF):</strong> Any non-redundant component (like a single database master or a single load balancer) that, if it fails, brings down the entire system.</li>
            </ul>
            <div className="p-3 mt-4 rounded-md bg-yellow-100 dark:bg-yellow-900/50 border border-yellow-200 dark:border-yellow-800">
                <p className="font-medium text-yellow-800 dark:text-yellow-200">
                    <strong>Lesson:</strong> Even if you scale your application servers infinitely, if your database takes 100ms for every request, your best-case latency will still be over 100ms.
                </p>
            </div>
        </React.Fragment>
    ))()),
];

const MODULE_M401_SUBMODULES: DetailedSubmodule[] = [
    createModuleContent("m-401", "4.1 SQL vs. NoSQL: Choosing the Right Store", "12 min", (() => (
        <React.Fragment>
            <h4 className="text-xl font-semibold mb-3">Relational (SQL) Databases</h4>
            <ul className="list-disc ml-6 space-y-2 mb-4">
                <li><strong>Focus:</strong> Data integrity, complex joins, predefined schema.</li>
                <li><strong>Key Concept:</strong> <strong>ACID</strong> properties (Atomicity, Consistency, Isolation, Durability) which guarantee reliable transactions.</li>
                <li><strong>Use Case:</strong> Financial transactions, user authentication, inventory management.</li>
            </ul>
            <h4 className="text-xl font-semibold mt-6 mb-3">Non-Relational (NoSQL) Databases</h4>
            <ul className="list-disc ml-6 space-y-2">
                <li><strong>Focus:</strong> Horizontal scalability, flexibility, high performance.</li>
                <li><strong>Key Concept:</strong> <strong>BASE</strong> properties (Basically Available, Soft State, Eventual Consistency).</li>
                <li><strong>Use Case:</strong> User profiles (Document DB - MongoDB), high-speed logs (Column-Family - Cassandra), caching (Key-Value - Redis), social graphs (Graph DB - Neo4j).</li>
            </ul>
        </React.Fragment>
    ))()),
    
    createModuleContent("m-401", "4.2 Database Replication and Partitioning (Sharding)", "10 min", (() => (
        <React.Fragment>
            <h4 className="text-xl font-semibold mb-3">Replication (Master-Slave)</h4>
            <p className="mb-4">
                Copies data across multiple servers. <strong>Master</strong> handles all writes, and <strong>Slaves</strong> (Read Replicas) handle reads. This dramatically increases read throughput and provides a failover mechanism for the Master.
            </p>
            <h4 className="text-xl font-semibold mt-6 mb-3">Partitioning (Sharding)</h4>
            <p className="mb-4">
                Splitting a single logical database into multiple, independent databases (shards). This solves the problem of a database growing too large to fit on a single server, significantly increasing write and read capacity.
            </p>
            <div className="p-3 mt-4 rounded-md bg-blue-100 dark:bg-blue-900/50 border border-blue-200 dark:border-blue-800">
                <p className="font-medium text-blue-800 dark:text-blue-200">
                    <strong>Challenge:</strong> Sharding introduces complexity in data access, cross-shard queries, and maintaining a consistent hashing scheme.
                </p>
            </div>
        </React.Fragment>
    ))()),
    
    createModuleContent("m-401", "4.3 The CAP Theorem", "7 min", (() => (
        <React.Fragment>
            <p className="mb-4">
                The <strong>CAP Theorem</strong> (Consistency, Availability, Partition Tolerance) states that a distributed data store can only guarantee two out of the three properties:
            </p>
            <ul className="list-disc ml-6 space-y-2">
                <li><strong>Consistency (C):</strong> Every read receives the most recent write or an error.</li>
                <li><strong>Availability (A):</strong> Every request receives a response (without guarantee that it is the latest write).</li>
                <li><strong>Partition Tolerance (P):</strong> The system continues to operate despite arbitrary message loss or failure of parts of the system.</li>
            </ul>
            <h4 className="text-xl font-semibold mt-6 mb-3">The Real-World Choice: CP vs. AP</h4>
            <p className="mb-4">
                In a distributed system, <strong>Partition Tolerance (P) is mandatory</strong>. You must choose between <strong>Consistency (CP)</strong> or <strong>Availability (AP)</strong>. Databases like traditional SQL tend towards C, while systems like Cassandra/DynamoDB prioritize A and P using eventual consistency.
            </p>
        </React.Fragment>
    ))()),
];

const MODULE_M501_SUBMODULES: DetailedSubmodule[] = [
    createModuleContent("m-501", "5.1 Consistency Models (Strong vs. Eventual)", "9 min", (() => (
        <React.Fragment>
            <p className="mb-4">
                Consistency defines what data is visible to a user at any given time, especially in a distributed system where data is replicated across multiple nodes.
            </p>
            <ul className="list-disc ml-6 space-y-2">
                <li><strong>Strong Consistency:</strong> Once a write is completed, all future reads will see that write. (e.g., Traditional RDBMS, Spanner).</li>
                <li><strong>Eventual Consistency:</strong> If no new updates are made, all reads will eventually return the latest value. Reads may see stale data for a period. (e.g., Cassandra, DynamoDB, DNS).</li>
                <li><strong>Causal Consistency:</strong> A stricter form of eventual consistency where events that are causally related are seen in the correct order.</li>
            </ul>
            <div className="p-3 mt-4 rounded-md bg-yellow-100 dark:bg-yellow-900/50 border border-yellow-200 dark:border-yellow-800">
                <p className="font-medium text-yellow-800 dark:text-yellow-200">
                    <strong>Trade-off:</strong> Strong Consistency implies lower Availability and higher Latency, while Eventual Consistency offers higher Availability and lower Latency.
                </p>
            </div>
        </React.Fragment>
    ))()),
    
    createModuleContent("m-501", "5.2 Redundancy, Fault Tolerance, and Failover", "8 min", (() => (
        <React.Fragment>
            <p className="mb-4">
                A system is considered <strong>Fault Tolerant</strong> if it can continue to operate despite the failure of one or more of its components.
            </p>
            <h4 className="text-xl font-semibold mt-6 mb-3">Key Mechanisms:</h4>
            <ul className="list-disc ml-6 space-y-2">
                <li><strong>Redundancy:</strong> Having backup copies of data (Replication) or multiple instances of a service (Load Balancing).</li>
                <li><strong>Failover:</strong> The process of automatically switching to a redundant or standby system when the primary system fails.</li>
                <li><strong>Health Checks:</strong> Mechanisms used by Load Balancers and orchestration systems to constantly monitor the responsiveness of services and remove unhealthy ones from the rotation.</li>
            </ul>
        </React.Fragment>
    ))()),
    
    createModuleContent("m-501", "5.3 Distributed Consensus (Paxos/Raft)", "7 min", (() => (
        <React.Fragment>
            <p className="mb-4">
                <strong>Distributed Consensus</strong> is the process of getting all nodes in a cluster to agree on a single value, even if some nodes fail. This is critical for maintaining consistency in distributed state (e.g., who is the Master, cluster configuration).
            </p>
            <ul className="list-disc ml-6 space-y-2">
                <li><strong>Raft:</strong> A protocol designed to be more understandable than Paxos, aiming to ensure all nodes agree on a shared, replicated log.</li>
                <li><strong>Zookeeper/etcd:</strong> Services that implement a consensus protocol to store and manage configuration data, naming, and distributed synchronization.</li>
            </ul>
        </React.Fragment>
    ))()),
];

const MODULE_M601_SUBMODULES: DetailedSubmodule[] = [
    createModuleContent("m-601", "6.1 Load Balancer Algorithms and Sticky Sessions", "10 min", (() => (
        <React.Fragment>
            <p className="mb-4">
                The algorithm determines how a Load Balancer distributes requests to the backend servers:
            </p>
            <ul className="list-disc ml-6 space-y-2">
                <li><strong>Round Robin:</strong> Requests are distributed sequentially (Server 1, Server 2, Server 3, Server 1, ...). Simple and effective if servers have equal processing power.</li>
                <li><strong>Least Connections:</strong> Sends the request to the server with the fewest active connections. Best for handling servers with varying loads.</li>
                <li><strong>IP Hash:</strong> Uses the client's IP address to consistently route them to the same server. Useful for maintaining session state (<strong>Sticky Sessions</strong>).</li>
            </ul>
            <h4 className="text-xl font-semibold mt-6 mb-3">Sticky Sessions (Session Affinity)</h4>
            <p className="mb-4">
                A mechanism where all requests from a specific client are directed to the same backend server. This is necessary if the application servers maintain any user-specific session state (stateful). However, it hinders horizontal scaling and can lead to uneven load distribution. <strong>Design Goal:</strong> Strive for statelessness!
            </p>
        </React.Fragment>
    ))()),
    
    createModuleContent("m-601", "6.2 Caching Strategies and Tiering", "9 min", (() => (
        <React.Fragment>
            <p className="mb-4">
                Caching is one of the most effective ways to improve system performance (latency) and scalability (offloading the database).
            </p>
            <h4 className="text-xl font-semibold mt-6 mb-3">Caching Tiering:</h4>
            <ul className="list-disc ml-6 space-y-2">
                <li><strong>Client-Side Cache:</strong> Browser cache (HTTP headers). Fastest but least control.</li>
                <li><strong>CDN Cache:</strong> Edge locations globally for static and some dynamic content.</li>
                <li><strong>Application/Server Cache:</strong> In-memory store (Redis, Memcached) shared by application servers. High-speed and widely used.</li>
                <li><strong>Database Cache:</strong> Built-in DB caches (e.g., PostgreSQL buffer cache).</li>
            </ul>
            <h4 className="text-xl font-semibold mt-6 mb-3">Cache Update Strategies:</h4>
            <p className="mb-4">
                <strong>Cache-Aside:</strong> The application is responsible for reading and writing to the cache, checking it before querying the database.
            </p>
        </React.Fragment>
    ))()),
    
    createModuleContent("m-601", "6.3 Cache Invalidation and Pitfalls", "7 min", (() => (
        <React.Fragment>
            <p className="mb-4">
                The hardest problem in computer science is cache invalidation. When data changes, the corresponding cache entry must be updated or deleted.
            </p>
            <ul className="list-disc ml-6 space-y-2">
                <li><strong>Cache Stampede:</strong> A sudden spike in requests to the database when a popular cached item expires simultaneously. Solved by using <strong>probabilistic expiration</strong> (jitter) or a <strong>lock queue</strong>.</li>
                <li><strong>Thundering Herd:</strong> Similar to Stampede, where many processes wait for an expired item to be recalculated, leading to overload.</li>
                <li><strong>Cache Miss:</strong> When requested data is not found in the cache, forcing a slower database query. High cache miss rates indicate poor cache utilization.</li>
            </ul>
        </React.Fragment>
    ))()),
];

const MODULE_M701_SUBMODULES: DetailedSubmodule[] = [
    createModuleContent("m-701", "7.1 Monolithic vs. Microservices Architecture", "10 min", (() => (
        <React.Fragment>
            <h4 className="text-xl font-semibold mb-3">Monolith</h4>
            <p className="mb-4">
                A single, tightly coupled application where all business logic runs in one process. Simple to develop initially, but challenging to scale, deploy, and maintain as the team and codebase grow.
            </p>
            <h4 className="text-xl font-semibold mt-6 mb-3">Microservices</h4>
            <p className="mb-4">
                A collection of small, independent services, each focused on a single business capability. They are loosely coupled, communicate via APIs (often REST or gRPC), and can be deployed and scaled independently.
            </p>
            <div className="p-3 mt-4 rounded-md bg-green-100 dark:bg-green-900/50 border border-green-200 dark:border-green-800">
                <p className="font-medium text-green-800 dark:text-green-200">
                    <strong>Trade-off:</strong> Microservices solve the complexity of large teams/systems but introduce new operational complexity (networking, monitoring, deployment).
                </p>
            </div>
        </React.Fragment>
    ))()),
    
    createModuleContent("m-701", "7.2 API Gateway Pattern", "8 min", (() => (
        <React.Fragment>
            <p className="mb-4">
                An <strong>API Gateway</strong> is a single entry point for all client requests. It acts as a facade, hiding the complexity of the microservices architecture behind it.
            </p>
            <h4 className="text-xl font-semibold mt-6 mb-3">Key Responsibilities:</h4>
            <ul className="list-disc ml-6 space-y-2">
                <li><strong>Routing:</strong> Directing requests to the appropriate microservice.</li>
                <li><strong>Authentication & Authorization:</strong> Verifying client identity before forwarding.</li>
                <li><strong>Rate Limiting:</strong> Protecting the backend services from abuse by limiting the number of requests per client.</li>
                <li><strong>Protocol Translation:</strong> Converting requests (e.g., from REST to gRPC).</li>
                <li><strong>Request Aggregation:</strong> Combining data from multiple services into a single response for the client.</li>
            </ul>
        </React.Fragment>
    ))()),
    
    createModuleContent("m-701", "7.3 Communication: REST, gRPC, and Asynchronous APIs", "7 min", (() => (
        <React.Fragment>
            <p className="mb-4">
                Microservices need to communicate effectively:
            </p>
            <ul className="list-disc ml-6 space-y-2">
                <li><strong>REST (Representational State Transfer):</strong> The most common style, uses standard HTTP verbs (GET, POST). Simple, human-readable, but less efficient due to text (JSON) payloads.</li>
                <li><strong>gRPC (Remote Procedure Call):</strong> Uses HTTP/2 and Protocol Buffers for structured, binary data transfer. Much faster and more efficient, ideal for high-throughput, low-latency inter-service communication.</li>
                <li><strong>Asynchronous (Messaging):</strong> Communication via Message Queues or Streams (see M-801) is used for tasks that don't require an immediate response, ensuring loose coupling.</li>
            </ul>
        </React.Fragment>
    ))()),
];

const MODULE_M801_SUBMODULES: DetailedSubmodule[] = [
    createModuleContent("m-801", "8.1 Message Queues: Decoupling and Asynchronous Tasks", "9 min", (() => (
        <React.Fragment>
            <p className="mb-4">
                <strong>Message Queues</strong> (e.g., RabbitMQ, SQS) provide a buffer for messages between the sending service (Producer) and the receiving service (Consumer).
            </p>
            <h4 className="text-xl font-semibold mt-6 mb-3">Core Benefits:</h4>
            <ul className="list-disc ml-6 space-y-2">
                <li><strong>Decoupling:</strong> Services don't need to know about each other's existence or availability.</li>
                <li><strong>Resilience:</strong> If the consumer service is down, the messages wait in the queue.</li>
                <li><strong>Rate Limiting/Load Leveling:</strong> Producers can send messages faster than consumers can process them, which smooths out traffic spikes.</li>
                <li><strong>Asynchronous Tasks:</strong> Ideal for long-running jobs (e.g., processing a video upload, sending emails).</li>
            </ul>
        </React.Fragment>
    ))()),
    
    createModuleContent("m-801", "8.2 Data Streaming and Event-Driven Architecture (Kafka)", "10 min", (() => (
        <React.Fragment>
            <p className="mb-4">
                <strong>Data Streaming Platforms</strong> (e.g., Apache Kafka, Kinesis) handle a continuous flow of data (events). They differ from traditional queues by being a persistent, ordered log of events that can be read by multiple consumers simultaneously.
            </p>
            <h4 className="text-xl font-semibold mt-6 mb-3">Event-Driven Architecture (EDA)</h4>
            <p className="mb-4">
                In an EDA, services communicate by producing and consuming immutable <strong>events</strong> (a significant change in state). This allows for highly scalable and decoupled systems where new services can easily tap into existing data streams.
            </p>
            <div className="p-3 mt-4 rounded-md bg-blue-100 dark:bg-blue-900/50 border border-blue-200 dark:border-blue-800">
                <p className="font-medium text-blue-800 dark:text-blue-200">
                    <strong>Example:</strong> A <code>User_Signed_Up</code> event in an EDA might trigger three different services (Email Service, Analytics Service, Profile Service) without the original User Service knowing about them.
                </p>
            </div>
        </React.Fragment>
    ))()),
    
    createModuleContent("m-801", "8.3 Delivery Guarantees: At-Most-Once, At-Least-Once, Exactly-Once", "8 min", (() => (
        <React.Fragment>
            <p className="mb-4">
                Reliability in messaging is defined by how many times a message is processed:
            </p>
            <ul className="list-disc ml-6 space-y-2">
                <li><strong>At-Most-Once:</strong> The message is delivered zero or one time. Fast, but risks losing messages.</li>
                <li><strong>At-Least-Once:</strong> The message is delivered one or more times. Ensures no loss, but requires the consumer to be <strong>idempotent</strong> (processing it multiple times yields the same result). Most common.</li>
                <li><strong>Exactly-Once:</strong> The message is delivered and processed exactly one time. Highly complex to implement, often requires strong transactional guarantees across multiple services (Distributed Transactions).</li>
            </ul>
        </React.Fragment>
    ))()),
];

const MODULE_M901_SUBMODULES: DetailedSubmodule[] = [
    createModuleContent("m-901", "9.1 Microservice and Resilience Patterns", "10 min", (() => (
        <React.Fragment>
            <p className="mb-4">
                Design patterns are repeatable solutions to common problems in software architecture.
            </p>
            <h4 className="text-xl font-semibold mt-6 mb-3">Resilience Patterns:</h4>
            <ul className="list-disc ml-6 space-y-2">
                <li><strong>Circuit Breaker:</strong> Prevents cascading failures. If a service calls another that is failing, the circuit breaker "trips," and subsequent calls fail immediately (Fast-Fail), giving the failing service time to recover.</li>
                <li><strong>Retry:</strong> Allows an operation to be re-attempted, often with an <strong>Exponential Backoff</strong> to prevent overwhelming the downstream service.</li>
                <li><strong>Bulkhead:</strong> Isolates elements of a system into pools so that if one fails, the others can continue operating (like watertight compartments in a ship).</li>
            </ul>
        </React.Fragment>
    ))()),
    
    createModuleContent("m-901", "9.2 Domain-Driven Design (DDD) & Bounded Contexts", "8 min", (() => (
        <React.Fragment>
            <p className="mb-4">
                <strong>Domain-Driven Design (DDD)</strong> is an approach that models software around core business domains.
            </p>
            <h4 className="text-xl font-semibold mt-6 mb-3">Key Concepts:</h4>
            <ul className="list-disc ml-6 space-y-2">
                <li><strong>Domain:</strong> The subject area to which the software is applied (e.g., E-commerce, Banking).</li>
                <li><strong>Bounded Context:</strong> The explicit boundary within which a particular domain model applies. Microservices are typically designed to align with a single Bounded Context.</li>
                <li><strong>Ubiquitous Language:</strong> A shared, structured language developed by the team and domain experts for the project, used in all design, code, and communication.</li>
            </ul>
        </React.Fragment>
    ))()),
    
    createModuleContent("m-901", "9.3 Common Design Trade-offs", "7 min", (() => (
        <React.Fragment>
            <p className="mb-4">
                System Design is about choosing the best trade-offs for the requirements:
            </p>
            <ul className="list-disc ml-6 space-y-2">
                <li><strong>CAP Theorem:</strong> Consistency vs. Availability.</li>
                <li><strong>Monolith vs. Microservices:</strong> Simplicity vs. Scalability/Independence.</li>
                <li><strong>Latency vs. Cost:</strong> Extremely low latency often requires expensive global CDNs or dedicated hardware.</li>
                <li><strong>Denormalization vs. Normalization (DB):</strong> Faster reads (denormalized) vs. Faster writes and reduced redundancy (normalized).</li>
            </ul>
        </React.Fragment>
    ))()),
];

const MODULE_M1001_SUBMODULES: DetailedSubmodule[] = [
    createModuleContent("m-1001", "10.1 Security Fundamentals (Auth, TLS, Validation)", "10 min", (() => (
        <React.Fragment>
            <p className="mb-4">
                Security must be considered at every layer of the system design.
            </p>
            <h4 className="text-xl font-semibold mt-6 mb-3">Key Security Points:</h4>
            <ul className="list-disc ml-6 space-y-2">
                <li><strong>Authentication (AuthN):</strong> Verifying the user's identity (e.g., passwords, multi-factor).</li>
                <li><strong>Authorization (AuthZ):</strong> Determining what the authenticated user is allowed to do (e.g., Role-Based Access Control).</li>
                <li><strong>TLS/SSL:</strong> Encryption of data in transit (HTTPS) to prevent Man-in-the-Middle attacks.</li>
                <li><strong>Input Validation:</strong> Sanitize and validate all user input to prevent common attacks like SQL Injection and Cross-Site Scripting (XSS).</li>
                <li><strong>Secrets Management:</strong> Never hard-code sensitive data (API keys, database passwords). Use dedicated services (Vault, AWS Secrets Manager).</li>
            </ul>
        </React.Fragment>
    ))()),
    
    createModuleContent("m-1001", "10.2 Reliability, Observability, and Monitoring", "9 min", (() => (
        <React.Fragment>
            <p className="mb-4">
                A system is <strong>reliable</strong> if it consistently performs its required functions under stated conditions for a specified period of time.
            </p>
            <h4 className="text-xl font-semibold mt-6 mb-3">Observability Components:</h4>
            <ul className="list-disc ml-6 space-y-2">
                <li><strong>Monitoring:</strong> Collecting metrics (CPU, Memory, QPS, Latency) to track the system's current state (Prometheus, Datadog).</li>
                <li><strong>Logging:</strong> Centralized system to collect and search all application and server logs (ELK Stack/Splunk).</li>
                <li><strong>Distributed Tracing:</strong> Following a single request as it hops between multiple microservices (Jaeger, Zipkin) to debug complex latency issues.</li>
                <li><strong>Alerting:</strong> Setting thresholds on metrics (e.g., P99 latency  500ms) to notify operations teams of issues.</li>
            </ul>
        </React.Fragment>
    ))()),
    
    createModuleContent("m-1001", "10.3 Disaster Recovery and Backups", "6 min", (() => (
        <React.Fragment>
            <p className="mb-4">
                <strong>Disaster Recovery (DR)</strong> is the process of restoring the system after a major event (data center outage, regional failure).
            </p>
            <h4 className="text-xl font-semibold mt-6 mb-3">Recovery Metrics:</h4>
            <ul className="list-disc ml-6 space-y-2">
                <li><strong>RTO (Recovery Time Objective):</strong> The maximum tolerable length of time that a system can be down after a failure.</li>
                <li><strong>RPO (Recovery Point Objective):</strong> The maximum tolerable amount of data loss, measured in time (e.g., 5 minutes of data loss is acceptable).</li>
            </ul>
        </React.Fragment>
    ))()),
];
const MODULE_M1101_SUBMODULES: DetailedSubmodule[] = [
    createModuleContent("m-1101", "11.1 Containerization (Docker) and Orchestration (Kubernetes)", "10 min", (() => (
        <React.Fragment>
            <p className="mb-4">
                **Containers (Docker)** package an application and all its dependencies into a standard unit for development and deployment. This solves the "it works on my machine" problem.
            </p>
            <h4 className="text-xl font-semibold mt-6 mb-3">Kubernetes (K8s)</h4>
            <p>
                **Kubernetes** is an open-source system for automating deployment, scaling, and management of containerized applications. It provides key features for distributed systems:
            </p>
            <ul className="list-disc ml-6 space-y-2">
                <li>**Service Discovery:** Automatically finds and connects services.</li>
                <li>**Self-Healing:** Restarts failed containers and replaces failed nodes.</li>
                <li>**Load Balancing:** Built-in traffic distribution.</li>
            </ul>
        </React.Fragment>
    ))()),
    createModuleContent("m-1101", "11.2 Deployment Strategies (Blue/Green, Canary)", "8 min", (() => (
        <React.Fragment>
            <p className="mb-4">
                Modern systems use advanced deployment methods to minimize downtime and risk:
            </p>
            <h4 className="text-xl font-semibold mt-6 mb-3">Common Strategies:</h4>
            <ul className="list-disc ml-6 space-y-2">
                <li>**Rolling Deployment:** Replaces a small number of old instances with new ones, gradually rolling out the change.</li>
                <li>**Blue/Green Deployment:** Maintain two identical production environments (Blue is old, Green is new). Traffic is fully switched from Blue to Green instantly. Provides fast rollback.</li>
                <li>**Canary Deployment:** Rolling out a new version to a small subset of users (e.g., 1-5% of traffic). If no errors are detected, the rollout continues. Excellent for testing in a real production environment.</li>
            </ul>
        </React.Fragment>
    ))()),
    createModuleContent("m-1101", "11.3 Cloud Services and Serverless Architecture", "7 min", (() => (
        <React.Fragment>
            <p className="mb-4">
                **Serverless** (e.g., AWS Lambda, Azure Functions) allows developers to build and run applications without managing servers. The cloud provider dynamically manages the allocation of machine resources.
            </p>
            <h4 className="text-xl font-semibold mt-6 mb-3">Serverless Pros/Cons:</h4>
            <ul className="list-disc ml-6 space-y-2">
                <li>**Pros:** Extreme cost savings (pay-per-use), automatic scaling, zero server maintenance.</li>
                <li>**Cons:** Vendor lock-in, limited execution duration, and potential latency (Cold Start) when an inactive function is invoked.</li>
            </ul>
        </React.Fragment>
    ))()),
];

const MODULE_M1201_SUBMODULES: DetailedSubmodule[] = [
    createModuleContent("m-1201", "12.1 Case Study: Designing Twitter/X (Read-Heavy Systems)", "15 min", (() => (
        <React.Fragment>
            <p className="mb-4">
                The biggest challenge in designing a system like Twitter is the disproportionate volume of reads versus writes (Read-Heavy). The "fan-out" problem requires massive caching.
            </p>
            <h4 className="text-xl font-semibold mt-6 mb-3">Key Design Decisions:</h4>
            <ul className="list-disc ml-6 space-y-2">
                <li>**Timeline Feed:** Pre-generating the timeline for users (**Fanout-on-Write**) is a key strategy for low-latency reads. When a user posts, their followers' timelines are updated immediately.</li>
                <li>**Data Storage:** A combination of a durable datastore (sharded SQL or Cassandra) for the actual tweet content and a blazing-fast cache (Redis or Memcached) for the timeline pointers.</li>
                <li>**WebSockets:** Used for real-time notifications and live updates of the feed.</li>
            </ul>
        </React.Fragment>
    ))()),
    createModuleContent("m-1201", "12.2 Case Study: Designing a URL Shortener (Write-Heavy and ID Generation)", "12 min", (() => (
        <React.Fragment>
            <p className="mb-4">
                URL shorteners are fundamentally simple but introduce an interesting challenge: generating unique, short IDs at a massive scale.
            </p>
            <h4 className="text-xl font-semibold mt-6 mb-3">ID Generation Strategies:</h4>
            <ul className="list-disc ml-6 space-y-2">
                <li>**Auto-Increment (SQL):** Simple, but not scalable in a distributed environment.</li>
                <li>**UUID:** Globally unique, but too long for a short URL.</li>
                <li>**Distributed ID Generator (e.g., Snowflake):** Generates time-sortable, globally unique IDs, which can then be Base62 encoded for a short, unique URL.</li>
                <li>**Load Balancing:** The Redirect service must be extremely fast, leveraging a cache to map the short key to the long URL.</li>
            </ul>
        </React.Fragment>
    ))()),
    createModuleContent("m-1201", "12.3 Case Study: Designing a Payment Processing System (Consistency-Heavy)", "10 min", (() => (
        <React.Fragment>
            <p className="mb-4">
                Payment systems prioritize **strong consistency** and **data integrity** (ACID) over availability. Loosing a transaction is unacceptable.
            </p>
            <h4 className="text-xl font-semibold mt-6 mb-3">Key Design Decisions:</h4>
            <ul className="list-disc ml-6 space-y-2">
                <li>**Strong Consistency:** Use SQL databases or a CP-oriented distributed database.</li>
                <li>**Two-Phase Commit (2PC):** A protocol used to ensure that all participants in a distributed transaction either commit or abort the transaction. (Often avoided for scale, but essential for core financial guarantees).</li>
                <li>**Idempotency:** Crucial for handling re-attempts. A unique transaction ID ensures that even if a payment request is sent multiple times due to a network glitch, the transaction only executes once.</li>
            </ul>
        </React.Fragment>
    ))()),
];


export const ALL_COURSE_MODULES: ModuleDefinition[] = [
    { id: "m-101", title: "M-101: Introduction to System Design", submodules: MODULE_M101_SUBMODULES, quizId: "m-101-final", nextModuleId: "m-201" },
    { id: "m-201", title: "M-201: Networking Fundamentals", submodules: MODULE_M201_SUBMODULES, quizId: "m-201-final", nextModuleId: "m-301" },
    { id: "m-301", title: "M-301: Scalability & Performance", submodules: MODULE_M301_SUBMODULES, quizId: "m-301-final", nextModuleId: "m-401" },
    { id: "m-401", title: "M-401: Databases in System Design", submodules: MODULE_M401_SUBMODULES, quizId: "m-401-final", nextModuleId: "m-501" },
    { id: "m-501", title: "M-501: Distributed Systems Concepts", submodules: MODULE_M501_SUBMODULES, quizId: "m-501-final", nextModuleId: "m-601" },
    { id: "m-601", title: "M-601: Load Balancing & Caching", submodules: MODULE_M601_SUBMODULES, quizId: "m-601-final", nextModuleId: "m-701" },
    { id: "m-701", title: "M-701: Microservices & APIs", submodules: MODULE_M701_SUBMODULES, quizId: "m-701-final", nextModuleId: "m-801" },
    { id: "m-801", title: "M-801: Message Queues & Streaming", submodules: MODULE_M801_SUBMODULES, quizId: "m-801-final", nextModuleId: "m-901" },
    { id: "m-901", title: "M-901: Design Patterns & Principles", submodules: MODULE_M901_SUBMODULES, quizId: "m-901-final", nextModuleId: "m-1001" },
    { id: "m-1001", title: "M-1001: Security & Reliability", submodules: MODULE_M1001_SUBMODULES, quizId: "m-1001-final", nextModuleId: "m-1101" },
    { id: "m-1101", title: "M-1101: Cloud & Deployment", submodules: MODULE_M1101_SUBMODULES, quizId: "m-1101-final", nextModuleId: "m-1201" },
    { id: "m-1201", title: "M-1201: Real-World Case Studies", submodules: MODULE_M1201_SUBMODULES, quizId: "m-1201-final", nextModuleId: null },
];