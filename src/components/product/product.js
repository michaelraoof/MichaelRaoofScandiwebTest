import React from "react";
import "./product.css";
import { connect } from "react-redux";
import { addProductToCart } from "../../redux/cartSlice";
import { Get_Productdescription } from "../../GraphQL/GraphQL";
import { graphql } from "@apollo/client/react/hoc";
import { setstatetolocalstorage, setattributeindices } from "../../redux/productid";

class Productdescription extends React.Component {
  constructor() {
    super();
    this.state = { zoomedimgindex: 0 };
  }
  componentDidMount() {
    var { setstatetolocalstorage, id } = this.props;
    if (id === null || id === undefined || id === "") {
      setstatetolocalstorage();
    }
  }
  getText(html) {
    var divContainer = document.createElement("div");
    divContainer.innerHTML = html;
    return divContainer.textContent || divContainer.innerText || "";
  }
  getproductdescription() {
    var { data, attributeindices, setattributeindices, currencyIndexArray, addProductToCart } = this.props;
    if (!data.loading) {
      return (
        <div className="mainproductdescription">
          <div className="productsmallimgs">
            {data.product.gallery.map((productimg, productindex) => {
              return (
                <img
                  onClick={() => {
                    this.setState({ zoomedimgindex: productindex });
                  }}
                  src={productimg}
                  alt=""
                  key={productindex}
                  width="70px"
                  height="70px"
                />
              );
            })}
          </div>
          <div className="productbigimg">
            <img src={data.product.gallery[this.state.zoomedimgindex]} alt="" />
          </div>
          <div className="productdescription">
            <h1 style={{ marginBottom: "0px" }}> {data.product.brand}</h1>

            <p style={{ marginTop: "5px", fontSize: "2em" }}> {data.product.name}</p>

            {data.product.attributes.map((att, attindex) => {
              return (
                <div key={attindex}>
                  <h2 style={{ marginBottom: "0px" }}>{att.id + ":"}</h2>
                  {
                    <div className="atts" style={{ display: "flex", flexDirection: "row" }}>
                      {att.items.map((item, itemindex) => {
                        if (att.id === "Color") {
                          return (
                            <div
                              key={itemindex}
                              style={{
                                border: attributeindices[attindex] === itemindex ? "1px solid #5ECE7B" : "none",
                                width: "35px",
                                height: "35px",
                                margin: "3px",
                                marginLeft: "0px",
                              }}
                            >
                              <button
                                onClick={() => {
                                  setattributeindices({ value: itemindex, index: attindex });
                                }}
                                className="attribute"
                                style={{ background: item.value, width: "31.5px", height: "31.5px", border: "none" }}
                              ></button>
                            </div>
                          );
                        }
                        return (
                          <button
                            key={itemindex}
                            onClick={() => {
                              setattributeindices({ value: itemindex, index: attindex });
                            }}
                            className="attribute"
                            style={attributeindices[attindex] === itemindex ? { color: "white", backgroundColor: "black" } : {}}
                          >
                            {item.value}
                          </button>
                        );
                      })}{" "}
                    </div>
                  }
                </div>
              );
            })}
            <h2>PRICE:</h2>
            <h2>{data.product.prices[currencyIndexArray].currency.symbol + data.product.prices[currencyIndexArray].amount}</h2>
            {data.product.inStock && (
              <button
                onClick={() => {
                  addProductToCart({
                    id: data.product.id,
                    name: data.product.name,
                    brand: data.product.brand,
                    prices: data.product.prices,
                    attributes: data.product.attributes.map((attribute, i) => ({
                      ...attribute,
                      indexSelectedAttribute: attributeindices[i] === -1 ? 0 : attributeindices[i],
                    })),
                    //indexSelectedAttribute select option eg (green or blue for swatch) (small or big for size)
                    gallery: data.product.gallery,
                  });
                }}
              >
                {" "}
                <p style={{ fontSize: "1em" }}> ADD TO CART</p>
              </button>
            )}

            <div style={{ paddingTop: "5vh" }}> {this.getText(data.product.description)}</div>
          </div>
        </div>
      );
    }
  }
  render() {
    return <div>{this.getproductdescription()}</div>;
  }
}

const mapStateToProps = (state) => ({
  id: state.productid.productdescriptionID,
  currencyIndexArray: state.currency.currencyIndexArray,
  attributeindices: state.productid.attributeindices,
});

const mapDispatchToProps = { addProductToCart, setstatetolocalstorage, setattributeindices };

const WithGraphql = graphql(Get_Productdescription, {
  //to fetch data when id of product change
  options: (props) => ({ variables: { productdescriptionID: props.id } }),
})(Productdescription);

export default connect(mapStateToProps, mapDispatchToProps)(WithGraphql);
