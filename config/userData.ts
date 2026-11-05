import type { UserData } from "@/types";
const userData:UserData = {
  "personalInfo": {
    "name": "UTKARSH SAXENA",
    "profession": "Product Manager & Software Engineer",
    "email": "utkarshsaxena2012@gmail.com",
    "github": "https://github.com/UtkarshSaxenautk",
    "twitter": "https://www.linkedin.com/in/utkarsh-saxena-5a9034201/"
  },
  "about": "Software Engineer experienced in Golang, cloud-native development and microservices. I develop distributed systems, improve database performance, and use Cloudflare and gRPC to enhance efficiency, lower costs and reduce API response times.",
  "experience": [
    {
      "id": 1,
      "role": "Product Manager & Software Engineer",
      "company": "Piovation GMBH",
      "startDate": "May 2025",
      "endDate": "Present",
      "link": "https://www.piovation.com/",
      "description": "Munich, Germany (Remote) - Leading PioWorkers, a digital workers and cloud operations platform.\nLeading product development, roadmap execution and cross-functional delivery of scalable automation solutions.\nDriving requirements, prioritization and product decisions while contributing to backend architecture.\nDeveloping Golang microservices for infrastructure management, worker orchestration, scheduling and operational automation.\nArchitecting Kubernetes deployments and managing container workloads, pod lifecycles, resource allocation and reliability.\nBuilding Docker infrastructure for consistent, scalable deployments.\nSolving distributed systems, performance and cloud resource management challenges.\nMentoring engineers, reviewing architecture and code, and establishing engineering best practices."
    },
    {
      "id": 2,
      "role": "Software Engineer",
      "company": "Rabbitloader (Yogi Network)",
      "startDate": "January 2024",
      "endDate": "May 2025",
      "link": "https://rabbitloader.com/",
      "description": "Kolkata, India - Golang microservices, distributed systems and edge applications.\nArchitected independently deployable Golang services communicating through REST and RabbitMQ, with unit testing in Linux.\nOptimized goroutines, channels and blocking operations to improve throughput by 40%.\nBuilt fault-tolerant event-driven pipelines using RabbitMQ, worker pools and concurrent consumers.\nIntegrated Cloudflare Vector AI training and Workers with WordPress CMS, reducing bounce rate by 30%.\nBuilt Dofollo using React, TypeScript, Cloudflare Workers, D1 (SQLite) and a MongoDB microservice, reducing hosting costs by 10%.\nImplemented Protocol Buffers and gRPC serialization, reducing peak transaction latency by 30 ms."
    },
    {
      "id": 3,
      "role": "Software Engineer Intern",
      "company": "Rabbitloader (Yogi Network)",
      "startDate": "August 2022",
      "endDate": "January 2024",
      "link": "https://rabbitloader.com/",
      "description": "Remote, India - High-traffic cloud services and database optimization.\nDeveloped Golang microservices for RabbitLoader, achieving a 100-page speed score with RabbitMQ and Firebase Authentication.\nBuilt services on DigitalOcean and Cloudflare supporting 60,000 daily interactions.\nOptimized MongoDB, MySQL and caching with Redis, BigCache and Memcache for sub-second responses, reducing query latency by 40% and improving throughput by 25%."
    },
    {
      "id": 4,
      "role": "Full Stack Developer Intern",
      "company": "Wizwack",
      "startDate": "May 2022",
      "endDate": "July 2022",
      "link": "/work#full-stack-developer-intern-at-wizwack",
      "description": "Remote, India - Multiplayer backend services on GCP.\nDeveloped Node.js and Express.js backend services using Firebase Pub/Sub on GCP for 100+ concurrent multiplayer users.\nDesigned REST APIs with half-second response times.\nAutomated bulk API testing in Postman for reliable communication between cloud services."
    }
  ],
  "projects": [
    {
      "title": "Vyapa AI",
      "description": "Main project: an AI Business Operating System for Indian SMEs that starts on WhatsApp. An AI business secretary that accepts voice notes, photos, PDFs and chats, extracts structured business data, and automates bookkeeping, reminders, invoicing and analytics. Roadmap: inventory, GST and supplier management, predictive insights, then an AI CFO/COO with ERP, ONDC and banking integrations.",
      "tags": [
        "AI",
        "WhatsApp",
        "SaaS"
      ],
      "Livelink": "/projects/vyapa-ai",
      "gitHubLink": null,
      "imageSrc": "/projects/vyapa-ai.svg",
      "date": "2026",
      "working": true
    },
    {
      "title": "LinkedIn-Go Pkg",
      "description": "A production-ready Golang SDK for the LinkedIn API with optimized OAuth2 and automated posting. Improved authentication speed by 30% with optimized OAuth2 handling. Reduced authentication failures from 50% to 20% by optimizing token exchange. Automated LinkedIn posting to reduce manual effort by 80%.",
      "tags": [
        "Golang",
        "OAuth2",
        "LinkedIn API"
      ],
      "Livelink": "/projects/linkedin-go-pkg",
      "gitHubLink": "https://github.com/UtkarshSaxenautk/linkedin-go-sdk",
      "imageSrc": "/projects/linkedin-go-sdk-preview.png",
      "date": "2023",
      "working": false
    },
    {
      "title": "Html-Optimizer",
      "description": "An independent Go module that optimizes HTML documents for faster page loads and improved Core Web Vitals. Engineered a standalone HTML optimization module in Go. Reduced page load times by 40% across web applications. Improved Core Web Vitals, SEO performance and user engagement.",
      "tags": [
        "Golang",
        "Microservices",
        "Docker",
        "go-doc"
      ],
      "Livelink": "/projects/html-optimizer",
      "gitHubLink": null,
      "imageSrc": "/projects/html-optimizer.png",
      "date": "2023",
      "working": false
    },
    {
      "title": "Typing Multiplayer Game",
      "description": "Real-time typing game with single-player and multiplayer modes, plus hard, medium and easy difficulty levels.",
      "tags": [
        "React.js",
        "Node.js",
        "MongoDB",
        "Socket.io",
        "Tailwind CSS"
      ],
      "imageSrc": "/projects/typing-game.png",
      "gitHubLink": "https://github.com/UtkarshSaxenautk/Typing-Game-Server",
      "Livelink": "/projects/typing-multiplayer-game",
      "date": "",
      "working": false
    },
    {
      "title": "Electric Bill Optimizer",
      "description": "An energy-consumption tracker with appliance usage reports and hourly alerts to help users manage electricity bills.",
      "tags": [
        "React.js",
        "Node.js",
        "MongoDB",
        "Twilio",
        "Tailwind CSS"
      ],
      "imageSrc": "/projects/bill-optimizer.png",
      "gitHubLink": "https://github.com/UtkarshSaxenautk/Bill-Optimizer",
      "Livelink": "/projects/electric-bill-optimizer",
      "date": "",
      "working": false
    }
  ],
  "lastUpdated": {
    "date": "NOVEMBER 5, 2026",
    "time": ""
  }
};
export default userData;
