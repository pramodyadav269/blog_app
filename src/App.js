// import logo from './logo.svg';
import './App.css';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Register from './FunctionComponent/Register';
import Login from './FunctionComponent/Login';
import Blog from './FunctionComponent/Blog';
import Home from './FunctionComponent/Home';
import PageNotFound from './FunctionComponent/PageNotFound';
//Comment section
const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/home" element={<Home />} />
        <Route path="/" element={<Login />} />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </Router>
  );
};

export default App;

// export default class App extends Component {
//   render() {
//     return (
//       <>
//         <h1>My Name is {this.props.name}</h1>
//         <h1>My age is {this.props.age}</h1>        
//         <h1>Marital status is {this.props.isMarried.toString()}</h1>  
//       </>      
//     )
//   }
// }

// function App() {
//   return (
//     <div className="App">
//       <header className="App-header">
//         <img src={logo} className="App-logo" alt="logo" />
//         <p>
//           Edit <code>src/App.js</code> and save to reload.
//         </p>
//         <a
//           className="App-link"
//           href="https://reactjs.org"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           Learn React with XYZ
//         </a>
//       </header>
//     </div>
//   );
// }
//export default App;

// App.propTypes = {
//   name: PropTypes.string.isRequired,
//   age: PropTypes.number.isRequired,
//   isMarried: PropTypes.bool
// }
// App.defaultProps = {
//   name: 'Pramod'  
// }

/* 
Problem Statement
Building a Scalable and Reliable Web Application on AWS

Description
You are tasked with architecting and implementing a web application hosted on AWS that needs to be highly scalable, reliable, and maintainable. The application should handle a significant number of concurrent users and traffic fluctuations.

User Stories
1.	You are to design the Solution Architecture for the demo system.
2.	Frontend: Deploy a static website on AWS S3 and serve it via AWS CloudFront.
3.	Backend: Deploy a highly available and resilient Nginx Service with AWS EC2 Services
4.	Setup CI/CD Pipeline using GitHub & AWS CodePipeline for the static website described in #2
5.	Setup Observability solutions 
a.	Monitor the health of various infrastructure components through a custom built CloudWatch Dashboard e.g.: AWS EC2, AWS ELB.
b.	Creating alarms for AWS Service metrics ego: 5xx errors exceeds a threshold limit.

Guidelines
6.	Infrastructure as Code (IaC): Use AWS CloudFormation to provision and manage the required resources.
7.	High Availability: Implement an architecture that ensures high availability across multiple availability zones to prevent single points of failure.
8.	Auto Scaling: Configure auto-scaling policies to automatically adjust resources based on traffic load.
9.	Monitoring and Alerting: Set up monitoring for key performance metrics and configure alerts to notify when thresholds are breached.
10.	Logging and Troubleshooting: Implement logging mechanisms to assist in debugging and troubleshooting issues.
11.	Continuous Integration/Continuous Deployment (CI/CD): Create a CI/CD pipeline that automatically deploys changes to the application while ensuring safety and minimizing downtime.
12.	Security and Access Control: Implement appropriate security measures, including IAM roles, security groups, and encryption, to safeguard the application and data.

Evaluation
You will be evaluated based on your ability to design a scalable, reliable, and maintainable infrastructure on AWS. Key aspects include proper use of AWS services, adherence to best practices, automation, and security considerations. Additionally, you will be assessed on your approach to handling failure scenarios and troubleshooting capabilities.

Q -> install nginx on windows server 2022 using user data script.
A ->
<powershell>
# Install Chocolatey (a package manager for Windows)
Set-ExecutionPolicy Bypass -Scope Process -Force; iex ((New-Object System.Net.WebClient).DownloadString('https://chocolatey.org/install.ps1'))

# Install Nginx using Chocolatey
choco install nginx -y
</powershell>
*/