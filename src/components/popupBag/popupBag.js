import "./bag.css";
import React from "react";
import popupBagimg from "../../assets/images/Empty Cart.svg";
import { connect } from "react-redux";
import { togglepopupCart, selectAttribute, plusCart, minusCart, emptyCart } from "../../redux/cartSlice";
import { Link } from "react-router-dom";
import BagContent from "../bagContent/bagContent";
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
    var { totalcountProducts, iscartopened, togglepopupCart, emptyCart } = this.props;
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
            <BagContent asBigBag={false}></BagContent>
          </div>

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
