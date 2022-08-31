import React from "react";
import "./bag.css";
import { connect } from "react-redux";
import { changeimgindex, togglepopupCart, selectAttribute, plusCart, minusCart, emptyCart } from "../../redux/cartSlice";
import leftarrow from "../../assets/images/CaretLeft.svg";
import rightarrow from "../../assets/images/CaretRight.svg";
class Bag extends React.Component {
  viewbag() {
    var totalprice = 0;
    var symbol = "";
    var { products, totalcountProducts, emptyCart } = this.props;
    return (
      <>
        {products.map((product, index) => {
          totalprice += product.prices[this.props.currencyIndexArray].amount * product.count;
          symbol = product.prices[this.props.currencyIndexArray].currency.symbol;
          return (
            <React.Fragment key={index}>
              <hr style={{ height: "1px", borderWidth: "0", color: "gray", backgroundColor: "gray" }} />
              <div className="cartcontent">
                <div className="leftcart">
                  <h4> {product.brand}</h4>

                  <p> {product.name}</p>
                  <h4>{product.prices[this.props.currencyIndexArray].currency.symbol + product.prices[this.props.currencyIndexArray].amount}</h4>

                  {product.attributes.map((att, attindex) => {
                    return (
                      <div key={attindex}>
                        <h4 style={{ marginBottom: 0 }}>{att.id}</h4>
                        {
                          <div style={{ display: "flex", flexDirection: "row" }}>
                            {att.items.map((item, itemindex) => {
                              if (att.id === "Color") {
                                return (
                                  <div
                                    key={itemindex}
                                    style={{
                                      border: att.indexSelectedAttribute === itemindex ? "1px solid #5ECE7B" : "none",
                                      width: "30px",
                                      height: "30px",
                                    }}
                                  >
                                    <button
                                      onClick={() => {
                                        this.props.selectAttribute({
                                          indexproduct: index,
                                          indexattribute: attindex,
                                          valueindexSelectedAttribute: itemindex,
                                        });
                                      }}
                                      className="attribute"
                                      style={{ background: item.value, width: "28px", height: "28px", border: "none" }}
                                    ></button>
                                  </div>
                                );
                              }
                              return (
                                <button
                                  key={itemindex}
                                  onClick={() => {
                                    this.props.selectAttribute({
                                      indexproduct: index,
                                      indexattribute: attindex,
                                      valueindexSelectedAttribute: itemindex,
                                    });
                                  }}
                                  className="attribute"
                                  style={att.indexSelectedAttribute === itemindex ? { color: "white", backgroundColor: "black" } : {}}
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
                      this.props.plusCart({ index });
                    }}
                  >
                    +
                  </button>
                  <button
                    className="negativebtncart"
                    onClick={() => {
                      this.props.minusCart({ index });
                    }}
                  >
                    −
                  </button>
                  <button className="countbtncart">{product.count}</button>
                  <>
                    <img src={product.gallery[this.props.products[index].imgindex]} alt="" />
                    {product.gallery.length > 1 && (
                      <>
                        <button
                          className="imgleftslider"
                          onClick={() => {
                            if (this.props.products[index].imgindex === 0) {
                              this.props.changeimgindex({ value: product.gallery.length - 1, productindex: index });
                            } else {
                              this.props.changeimgindex({ value: this.props.products[index].imgindex - 1, productindex: index });
                            }
                          }}
                        >
                          <img src={leftarrow} alt="" />
                        </button>
                        <button
                          className="imgrightslider"
                          onClick={() => {
                            if (this.props.products[index].imgindex === product.gallery.length - 1) {
                              this.props.changeimgindex({ value: 0, productindex: index });
                            } else {
                              this.props.changeimgindex({ value: this.props.products[index].imgindex + 1, productindex: index });
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
            </React.Fragment>
          );
        })}
        <hr style={{ height: "1px", borderWidth: "0", color: "gray", backgroundColor: "gray" }} />

        <p>
          Tax 21%:<strong>{symbol + Math.round(((totalprice * 21) / 100) * 100) / 100}</strong>
        </p>
        <p>
          Quantity:<strong>{totalcountProducts}</strong>
        </p>
        <p>
          Total:<strong>{"\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0" + symbol + (Math.round(totalprice * 100) / 100).toString()}</strong>
        </p>
        <button
          onClick={() => {
            emptyCart();
          }}
          className="orderbtn"
        >
          ORDER
        </button>
      </>
    );
  }

  render() {
    return (
      <div className="maincart">
        <h2>CART</h2>

        {this.viewbag()}
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  totalcountProducts: state.cart.totalcountProducts,
  iscartopened: state.cart.opened,
  products: state.cart.products,
  currencyIndexArray: state.currency.currencyIndexArray,
});

const mapDispatchToProps = { changeimgindex, togglepopupCart, selectAttribute, plusCart, minusCart, emptyCart };

export default connect(mapStateToProps, mapDispatchToProps)(Bag);
