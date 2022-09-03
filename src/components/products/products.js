import "./products.css";
import { connect } from "react-redux";
import { graphql } from "@apollo/client/react/hoc";
import emptycartImg from "../../assets/images/homelogo.png";
import { addProductToCart } from "../../redux/cartSlice";
import { setproductid } from "../../redux/productid";
import React from "react";
import { Get_Products } from "../../GraphQL/GraphQL";
import { Link } from "react-router-dom";

class Products extends React.Component {
  showProducts() {
    var { data, addProductToCart, setproductid, currencyIndexArray } = this.props;
    if (!data.loading) {
      return (
        <div className="grid-container">
          {data.category.products.map((product, index) => {
            return (
              <Link
                to={"/product"}
                onClick={() => {
                  setproductid({ id: product.id, attlength: product.attributes.length });
                }}
                key={index}
                style={!product.inStock ? { filter: "opacity(50%)" } : {}}
              >
                {
                  <div>
                    <img className="productImg" src={product.gallery[0]} alt={product.name} />

                    {product.inStock && (
                      <button
                        style={{ background: "none", border: "none", padding: "0px", margin: "0px" }}
                        onClick={(e) => {
                          e.preventDefault();
                          // e.preventDefault(); //to stop the whole Link to={}
                          //  e.stopPropagation();//to stop the whole div onclick()
                          // console.log(product)

                          addProductToCart({
                            id: product.id,
                            name: product.name,
                            brand: product.brand,
                            prices: product.prices,
                            attributes: product.attributes.map((attribute) => ({ ...attribute, indexSelectedAttribute: 0 })),
                            //indexSelectedAttribute select option eg (green or blue for swatch) (small or big for size)
                            gallery: product.gallery,
                          });
                        }}
                      >
                        {" "}
                        <img className="cartimg" src={emptycartImg} alt="empty cart" />
                      </button>
                    )}

                    <div className="outStock">
                      {!product.inStock && (
                        <div>
                          <p>OUT OF STOCK</p>
                        </div>
                      )}
                    </div>
                  </div>
                }
                {
                  <div className="txt" style={product.inStock ? {} : { paddingTop: "1.7em" }}>
                    {product.name}
                  </div>
                }

                {<div className="txt">{product.prices[currencyIndexArray].currency.symbol + product.prices[currencyIndexArray].amount}</div>}
                {}
              </Link>
            );
          })}
        </div>
      );
    } else return <h1>Loading...</h1>;
  }
  render() {
    return <div className="Products">{this.showProducts()}</div>;
  }
}

const mapDispatchToProps = { addProductToCart, setproductid };
const mapStateToProps = (state) => ({
  currencyIndexArray: state.currency.currencyIndexArray,
  label: state.currency.label,
  cart: state.cart,
  type: state.headerType.type,
});

const WithGraphql = graphql(Get_Products, {
  //to fetch data when header type change
  options: (props) => ({ variables: { categorytitle: props.type } }),
})(Products);
export default connect(mapStateToProps, mapDispatchToProps)(WithGraphql);
