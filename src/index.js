import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';
import App from './App';

//import {BrowserRouter as Router,Switch,Route,Link} from "react-route-dom";

ReactDOM.createRoot(document.getElementById('root')).render(<App />, document.getElementById("root"));
// const root = ReactDOM.createRoot(document.getElementById('root'));
// root.render(
//   <React.StrictMode>    
//     {/* <Login /> */}
//     <Register />
//     {/* <Blog /> */}
//   </React.StrictMode>
// );

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
