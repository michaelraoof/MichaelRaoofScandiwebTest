import Products from "../products/index";

import { BrowserRouter as Router,Routes, Route } from 'react-router-dom';
import React from 'react';

class Main extends React.Component {
  
  render() {
    return (
          <Router>
      <div className="Main">
 
                      <Routes>

              <Route exact path='/' element={< Products />}></Route>
        
           </Routes>

        </div>
               </Router>
    );
  }
}

export default Main;
