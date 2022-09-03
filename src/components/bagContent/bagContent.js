import React from "react";

import leftarrow from "../../assets/images/CaretLeft.svg";
import rightarrow from "../../assets/images/CaretRight.svg";
import { connect } from "react-redux";
import {
  plusbtnStyle,
  negativebtnStyle,
  countbtnStyle,
  attributeStyle,
  cartcontentStyle,
  boldtextStyle,
  productimgStyle,
} from "../../assets/styleobjects/popupStyle";
import { changeimgindex, togglepopupCart, selectAttribute, plusCart, minusCart, emptyCart } from "../../redux/cartSlice";

class BagContent extends React.Component {
  viewbagcontent() {
    var totalprice = 0;
    var symbol = "";
    var { asBigBag, products, currencyIndexArray, selectAttribute, plusCart, minusCart, changeimgindex, line, totalcountProducts } = this.props;
    return (
      <>
        {products.map((product, index) => {
          totalprice += product.prices[currencyIndexArray].amount * product.count;

          symbol = product.prices[currencyIndexArray].currency.symbol;

          return (
            <React.Fragment key={index}>
              <div className="cartcontent" style={!asBigBag ? cartcontentStyle : {}}>
                <div className="leftcart">
                  <p>
                    <span className="productdetailsbag" style={asBigBag ? boldtextStyle : {}}>
                      {product.brand}
                    </span>
                  </p>

                  <p className="productdetailsbag"> {product.name}</p>
                  <p>
                    <span className="productdetailsbag" style={asBigBag ? boldtextStyle : {}}>
                      {symbol + product.prices[currencyIndexArray].amount}
                    </span>
                  </p>
                  {product.attributes.map((att, attindex) => {
                    return (
                      <div key={attindex}>
                        <p style={{ marginBottom: 0, fontWeight: asBigBag ? "bold" : "" }}>{att.id}</p>
                        {
                          <div style={{ display: "flex", flexDirection: "row" }}>
                            {att.items.map((item, itemindex) => {
                              if (att.id === "Color") {
                                return (
                                  <div
                                    key={itemindex}
                                    style={{
                                      border: att.indexSelectedAttribute === itemindex ? "1px solid #5ECE7B" : "none",
                                      width: !asBigBag ? "20px" : "",
                                      height: !asBigBag ? "23px" : "",
                                      padding: !asBigBag ? "1px" : "",
                                      margin: "2.5px",
                                      paddingTop: !asBigBag ? "0px" : "",
                                    }}
                                    className="colordiv"
                                  >
                                    <button
                                      onClick={() => {
                                        selectAttribute({
                                          indexproduct: index,
                                          indexattribute: attindex,
                                          valueindexSelectedAttribute: itemindex,
                                        });
                                      }}
                                      className="colorbtn"
                                      style={{
                                        background: item.value,
                                        width: !asBigBag ? "20px" : "",
                                        height: !asBigBag ? "21px" : "",
                                        border: "none",
                                        padding: !asBigBag ? "0px" : "",

                                        margin: !asBigBag ? "0px" : "",
                                      }}
                                    ></button>
                                  </div>
                                );
                              }
                              return (
                                <button
                                  key={itemindex}
                                  onClick={() => {
                                    selectAttribute({
                                      indexproduct: index,
                                      indexattribute: attindex,
                                      valueindexSelectedAttribute: itemindex,
                                    });
                                  }}
                                  className="attribute"
                                  style={
                                    !asBigBag
                                      ? attributeStyle(att.indexSelectedAttribute === itemindex)
                                      : att.indexSelectedAttribute === itemindex
                                      ? { color: "white", backgroundColor: "black" }
                                      : {}
                                  }
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
                </div>
                <div className="rightcart">
                  <button
                    className="plusbtncart"
                    onClick={() => {
                      plusCart({ index });
                    }}
                    style={!asBigBag ? plusbtnStyle : {}}
                  >
                    +
                  </button>
                  <button
                    className="negativebtncart"
                    onClick={() => {
                      minusCart({ index });
                    }}
                    style={!asBigBag ? negativebtnStyle : {}}
                  >
                    −
                  </button>
                  <button className="countbtncart" style={!asBigBag ? countbtnStyle : {}}>
                    {product.count}
                  </button>
                  <>
                    <img style={!asBigBag ? productimgStyle : {}} src={product.gallery[asBigBag ? products[index].imgindex : 0]} alt="" />
                    {product.gallery.length > 1 && asBigBag && (
                      <>
                        <button
                          className="imgleftslider"
                          onClick={() => {
                            if (products[index].imgindex === 0) {
                              changeimgindex({ value: product.gallery.length - 1, productindex: index });
                            } else {
                              changeimgindex({ value: products[index].imgindex - 1, productindex: index });
                            }
                          }}
                        >
                          <img src={leftarrow} alt="" />
                        </button>
                        <button
                          className="imgrightslider"
                          onClick={() => {
                            if (products[index].imgindex === product.gallery.length - 1) {
                              changeimgindex({ value: 0, productindex: index });
                            } else {
                              changeimgindex({ value: products[index].imgindex + 1, productindex: index });
                            }
                          }}
                        >
                          <img src={rightarrow} alt="" />
                        </button>
                      </>
                    )}
                  </>
                </div>
              </div>
              {asBigBag && line}
            </React.Fragment>
          );
        })}
        {asBigBag && (
          <>
            <p>
              Tax 21%:<strong>{symbol + Math.round(((totalprice * 21) / 100) * 100) / 100}</strong>
            </p>
            <p>
              Quantity:<strong>{totalcountProducts}</strong>
            </p>

            <p>
              Total:
              <strong>{"\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0" + symbol + (Math.round(totalprice * 100) / 100).toString()}</strong>
            </p>
          </>
        )}

        {!asBigBag && (
          <p style={{ marginTop: "40px" }}>
            <strong>Total</strong>

            <strong style={{ position: "absolute", right: "10px" }}>{symbol + (Math.round(totalprice * 100) / 100).toString()}</strong>
          </p>
        )}
      </>
    );
  }

  render() {
    return <div>{this.viewbagcontent()}</div>;
  }
}

const mapStateToProps = (state) => ({
  totalcountProducts: state.cart.totalcountProducts,
  iscartopened: state.cart.opened,
  products: state.cart.products,
  currencyIndexArray: state.currency.currencyIndexArray,
});

const mapDispatchToProps = { changeimgindex, togglepopupCart, selectAttribute, plusCart, minusCart, emptyCart };

export default connect(mapStateToProps, mapDispatchToProps)(BagContent);
