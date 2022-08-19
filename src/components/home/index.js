import './home.css';
import Headers from "../header/index";
import React from 'react';
import Products from '../products/index';
import Bag from '../bag/index';
import Productdescription from "../product/index";
import { connect } from "react-redux";
import {
  BrowserRouter,
  Routes,
  Route,
    
} from "react-router-dom";


class Home extends React.Component {
  
  render() {
    return (

      <div className="Home">
        
        <BrowserRouter>
            <Headers ></Headers>
    <Routes>
      <Route path="/" element={  < div style={this.props.ispopupCartopened ? {height:"calc(100% + 100vh)", opacity: "0.88", backgroundColor: "rgba(0, 0, 0, 0.2)" } : {}}>
        <div className="productsheader">Category Name</div>
        <Products ></Products>
            </div>} >
              

              
      </Route>
      <Route path="bag" element={  <Bag></Bag>} />
      <Route path="product" element={<Productdescription />} />
    </Routes>
  </BrowserRouter>
        </div>  
      
    
    );
  }
}

const mapStateToProps = (state) => ({

    ispopupCartopened : state.cart.opened,
  
});


export default connect(mapStateToProps)(Home);