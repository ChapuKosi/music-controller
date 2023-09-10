import React from "react";
import ReactDOM from "react-dom";
import HomePage from "./HomePage";

/*import { BrowserRouter as Router } from "react-router-dom";*/

export default function App() {
  return (
   <div className="center-container">
    <HomePage />
   </div>
  )
}

const appDiv = document.getElementById("app");
ReactDOM.render(<App />, appDiv);
