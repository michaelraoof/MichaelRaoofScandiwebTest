import "./bag.css";
import React from "react";
import popupBagimg from "../../assets/images/Empty Cart.svg";
import { connect } from "react-redux";
import { togglepopupCart, selectAttribute, plusCart, minusCart, emptyCart } from "../../redux/cartSlice";
import { Link } from "react-router-dom";
class PopupBag extends React.Component {
  constructor(props) {
    super(props);

    this.wrapperRef = React.createRef();
    this.handleClickOutside = this.handleClickOutside.bind(this);
  }
  componentDidMount() {
    document.addEventListener("mousedown", this.handleClickOutside);
  }

  componentWillUnmount() {
    document.removeEventListener("mousedown", this.handleClickOutside);
  }
  handleClickOutside(event) {
    var { togglepopupCart, iscartopened } = this.props;
    if (this.wrapperRef && !this.wrapperRef.current.contains(event.target) && iscartopened) {
      // alert("You clicked outside of me!");
      togglepopupCart();
    }
  }
  showCart() {
    var totalprice = 0;
    var symbol = "";
    var { totalcountProducts, iscartopened, products, currencyIndexArray, selectAttribute, plusCart, minusCart, togglepopupCart, emptyCart } =
      this.props;
    if (totalcountProducts === 0) {
      return (
        <div className="bag" style={{ display: iscartopened ? "grid" : "none" }}>
          <p>Empty cart </p>
        </div>
      );
    } else {
      return (
        <div className="bag" style={{ display: iscartopened ? "grid" : "none" }}>
          <div className="bagheader">
            <p>
              <strong>My Bag, </strong>
              {totalcountProducts} items
            </p>
          </div>

          {products.map((product, index) => {
            totalprice += product.prices[currencyIndexArray].amount * product.count;
            symbol = product.prices[currencyIndexArray].currency.symbol;
            return (
              <React.Fragment key={index}>
                <div className="leftcontent">
                  {
                    <div>
                      <p> {product.brand}</p>

                      <p> {product.name}</p>

                      <p>{product.prices[currencyIndexArray].currency.symbol + product.prices[currencyIndexArray].amount}</p>

                      {product.attributes.map((att, attindex) => {
                        return (
                          <div key={attindex}>
                            <p>{att.id}</p>
                            {
                              <div style={{ display: "flex", flexDirection: "row" }}>
                                {att.items.map((item, itemindex) => {
                                  if (att.id === "Color") {
                                    return (
                                      <div
                                        key={itemindex}
                                        style={{
                                          border: att.indexSelectedAttribute === itemindex ? "1px solid #5ECE7B" : "none",
                                          width: "18px",
                                          height: "20px",
                                          margin: "2.5px",
                                        }}
                                      >
                                        <button
                                          onClick={() => {
                                            selectAttribute({
                                              indexproduct: index,
                                              indexattribute: attindex,
                                              valueindexSelectedAttribute: itemindex,
                                            });
                                          }}
                                          className="attribute"
                                          style={{
                                            background: item.value,
                                            width: "16px",
                                            height: "18px",
                                            border: "none",
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
                  }
                </div>

                <div className="rightcontent">
                  <button
                    className="plusbtn"
                    onClick={() => {
                      plusCart({ index });
                    }}
                  >
                    +
                  </button>
                  <button
                    className="negativebtn"
                    onClick={() => {
                      minusCart({ index });
                    }}
                  >
                    −
                  </button>
                  <button className="countbtn">{product.count}</button>
                  <img src={product.gallery[0]} alt="" />
                </div>
              </React.Fragment>
            );
          })}

          <>
            <p style={{ marginTop: "10px" }} className="leftcontent">
              <strong>Total</strong>
            </p>
            <p style={{ textAlign: "right", marginTop: "10px" }} className="rightcontent">
              <strong> {symbol + totalprice}</strong>
            </p>
          </>
          <>
            <Link
              to={"/bag"}
              onClick={() => {
                togglepopupCart();
              }}
              className="viewbtn"
            >
              VIEW BAG
            </Link>
            <button
              onClick={() => {
                emptyCart();
              }}
              className="checkoutbtn"
            >
              CHECK OUT
            </button>
          </>
        </div>
      );
    }
  }
  render() {
    var { togglepopupCart, totalcountProducts } = this.props;
    return (
      <div ref={this.wrapperRef}>
        <React.Fragment>
          <button
            onClick={() => {
              togglepopupCart();
            }}
            className="popupbtncart"
          >
            {" "}
            <img src={popupBagimg} alt="" />
          </button>
          {totalcountProducts ? <button className="numproducts">{totalcountProducts}</button> : ""}
          {this.showCart()}
        </React.Fragment>
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

const mapDispatchToProps = { togglepopupCart, selectAttribute, plusCart, minusCart, emptyCart };

export default connect(mapStateToProps, mapDispatchToProps)(PopupBag);
