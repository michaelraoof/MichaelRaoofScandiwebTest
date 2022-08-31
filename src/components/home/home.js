import "./home.css";
import Headers from "../header/header";
import React from "react";
import Products from "../products/products";
import Bag from "../bag/bag";
import Productdescription from "../product/product";
import { connect } from "react-redux";
import { BrowserRouter, Routes, Route } from "react-router-dom";

class Home extends React.Component {
  render() {
    var { ispopupCartopened, categoryType } = this.props;
    return (
      <div className="Home">
        <BrowserRouter>
          <Headers></Headers>
          <Routes>
            <Route
              path="/"
              element={
                <div
                  style={
                    ispopupCartopened
                      ? {
                          paddingBottom: "10%",
                          minHeight: "100vh",
                          opacity: "0.88",
                          backgroundColor: "rgba(0, 0, 0, 0.2)",
                          filter: " grayscale(20%)",
                        }
                      : {}
                  }
                >
                  <div className="productsheader">{categoryType}</div>
                  <Products></Products>
                </div>
              }
            ></Route>
            <Route
              path="bag"
              element={
                <div
                  style={
                    ispopupCartopened
                      ? {
                          minHeight: "100vh",
                          opacity: "0.88",
                          backgroundColor: "rgba(0, 0, 0, 0.2)",
                          filter: " grayscale(20%)",
                        }
                      : {}
                  }
                >
                  <Bag></Bag>
                </div>
              }
            />
            <Route
              path="product"
              element={
                <div
                  style={
                    ispopupCartopened
                      ? { height: "100%", minHeight: "100vh", opacity: "0.88", backgroundColor: "rgba(0, 0, 0, 0.2)", filter: " grayscale(20%)" }
                      : {}
                  }
                >
                  <Productdescription />
                </div>
              }
            />
          </Routes>
        </BrowserRouter>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  ispopupCartopened: state.cart.opened,
  categoryType: state.headerType.type,
});

export default connect(mapStateToProps)(Home);
