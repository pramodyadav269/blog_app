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

