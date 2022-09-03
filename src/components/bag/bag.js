import React from "react";
import "./bag.css";
import { connect } from "react-redux";
import { emptyCart } from "../../redux/cartSlice";
import BagContent from "../bagContent/bagContent";
class Bag extends React.Component {
  viewbag() {
    var line = <hr style={{ height: "1px", borderWidth: "0", color: "gray", backgroundColor: "gray" }} />;
    var { emptyCart } = this.props;
    return (
      <>
        {line}
        <BagContent asBigBag={true} setSymbolandTotalprice={this.setSymbolandTotalprice} line={line}></BagContent>

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
  products: state.cart.products,
});

const mapDispatchToProps = { emptyCart };

export default connect(mapStateToProps, mapDispatchToProps)(Bag);
