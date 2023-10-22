import {
    mobile,
    backend,
    creator,
    web,
    javascript,
    rabbitMq,
    html,
    css,
    reactjs,
    tailwind,
    nodejs,
    mongodb,
    git,
    java,
    docker,
    golang,
    c,
    loder,
    wizwack,
    htmlop,
    typing,
    bill,
  } from "../assets";
  
export const navLinks = [
  {
      id: "resume",
      title: "Resume",
    },
    {
      id: "about",
      title: "About",
    },
    {
      id: "work",
      title: "Work",
    },
    
    {
      id: "contact",
      title: "Contact",
    },
    
  ];
  
  const services = [
    {
      title: "Web Developer",
      icon: web,
    },
    {
      title: "Software developer",
      icon: mobile,
    },
    {
      title: "Backend Developer",
      icon: backend,
    },
    {
      title: "Problem Solving",
      icon: creator,
    },
  ];
  
  const technologies = [
    {
      name: "HTML 5",
      icon: html,
    },
    {
      name: "CSS 3",
      icon: css,
    },
    {
      name: "JavaScript",
      icon: javascript,
    },
    {
      name: "RabbitMQ",
      icon: rabbitMq,
    },
    {
      name: "React JS",
      icon: reactjs,
    },
    {
      name: "Tailwind CSS",
      icon: tailwind,
    },
    {
      name: "Node JS",
      icon: nodejs,
    },
    {
      name: "MongoDB",
      icon: mongodb,
    },
    {
      name: "git",
      icon: git,
    },
    {
      name: "java",
      icon: java,
    },
    {
      name: "docker",
      icon: docker,
    },
    {
      name: "Golang",
      icon: golang,
    },
    {
      name: "C++",
      icon: c,
    },
  ];
  
const experiences = [
  {
      title: "Software Engineer Intern",
      company_name: "RabbitLoader",
      icon: loder,
      iconBg: "#287FFD",
      date: "Aug 2022 – present",
      points: [
        "Developed Microservices for RabbitLoader using Golang as per market standards to provide 100-page speed., improving system efficiency using RabbitMQ for asynchronous communication",
        "Created User-MS with Firebase integration for authentication with email and referral functionality.",
        "Built and managed various microservices, including a high-traffic Cloudflare service with an average of 60k user interactions daily.",
        "Conducted unit testing and worked on APIs for enhanced functionality, covering 90% of code.",
      ],
    },
    {
      title: "Full Stack Developer Intern ",
      company_name: "Wizwack",
      icon: wizwack,
      iconBg: "#FFFEFE",
      date: "May 2022 – Aug 2022 ",
      points: [
        "Worked on different services based on Firebase(Pub/Sub) for game backend using cloud services(GCP) dealing with hundreds of users at a time.",
        "Managed Services like Payment Service, Multiplayer Service, and User Service.",
        "Done Automated bulk testing of APIs using Postman of about 1000 API's.",
      ],
    },
    
  ];
  
  const testimonials = [
    {
      testimonial:
        "I've never met a web developer who truly cares about his work that much!' success like Utkarsh does.",
      name: "Abhishek Guha Roy",
      designation: "Proprieto",
      company: "Yogi Network",
      image: "https://randomuser.me/api/portraits/men/5.jpg",
    },
    {
      testimonial:
        "After Utkarsh optimized our website, our traffic increased by 50%. We can't thank them enough!",
      name: "Sandeep Kumar",
      designation: "Project Manager",
      company: "RabbitLoader",
      image: "https://randomuser.me/api/portraits/women/6.jpg",
    },
  ];
  
  const projects = [
    {
      name: "HTML Optimizer",
      description:
        "It is an independent module written in Go to optimize a given HTML Document.It works on criticalCss, Css-Optimizer, Js-Optimizer, and image-Optimizer submodules Optimizes the preload, ads, and slider, and replaces the host if needed.",
      tags: [
        {
          name: "golang",
          color: "blue-text-gradient",
        },
        {
          name: "go-doc",
          color: "green-text-gradient",
        },
      ],
      image: htmlop,
      source_code_link: "https://github.com/UtkarshSaxenautk",
      working_code_link: "https://github.com/UtkarshSaxenautk",
    },
    {
      name: "Typing-Multiplayer-Game",
      description:
        "Real-time gaming experience for interactive and engaging gameplay. Single-player and multiplayer game modes for typing tests. Three difficulty levels: Hard, Medium, and Easy",
      tags: [
        {
          name: "Mern Stack",
          color: "blue-text-gradient",
        },
        {
          name: "go-(Socket-io)",
          color: "green-text-gradient",
        },
        {
          name: "tailwind",
          color: "pink-text-gradient",
        },  
      ],
      image: typing,
      source_code_link: "https://github.com/UtkarshSaxenautk/Typing-Game-Server",
      working_code_link: "https://drive.google.com/file/d/1pgeVrsLQfyCTVQu3dxDRC_C5GzKoa12Z/view",
    },
    {
      name: "Electric Bill Optimizer",
      description:
        "Energy Consumption Recording to optimize and alert users per hour if needed. Daily Energy Usage Report by use of Twilio integration to show appliance usage.",
      tags: [
        {
          name: "Mern Stack",
          color: "blue-text-gradient",
        },
        {
          name: "tailwind",
          color: "green-text-gradient",
        },
        {
          name: "MongoDB",
          color: "pink-text-gradient",
        },

      ],
      image: bill,
      source_code_link: "https://github.com/UtkarshSaxenautk/Bill-Optimizer",
      working_code_link: "https://drive.google.com/file/d/1HYW5Ena04dVP3nPaSmb2TToFfwkTIacg/view?usp=sharing",
    },
    
  ];
  
  export { services, technologies, experiences, testimonials, projects };