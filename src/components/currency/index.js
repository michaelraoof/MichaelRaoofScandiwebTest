
import './currency.css';



import React from 'react';
import { connect } from "react-redux";
import { setcurrency } from "../../redux/currencySlice.js";
import { gql } from '@apollo/client';
import { graphql } from '@apollo/client/react/hoc';
import arrow from "./downArrow.svg";
const Get_Currencies = gql`
 query{
  currencies{
    label
    symbol
  }
    
}
`;

class Currency extends React.Component {
   constructor(props) {
    super(props);
     this.state = { opened: false };
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
    if (this.wrapperRef && !this.wrapperRef.current.contains(event.target)&&this.state.opened) {
     // alert("You clicked outside of me!");
      this.setState({ opened: !this.state.opened });
    }
  }
  componentDidUpdate() {
//to set the initial value after closing the tap. we set currency inside local storage and then checking for it
    if (localStorage.getItem("currencyIndex") != null // to see if i decided the currency before then closed the tap
      && !this.props.data.loading && //to see if apollo finished from getting the data
      this.props.currencyIndexArray === 0) { // to set the 
 this.props.setcurrency({
          currencyIndexArray: localStorage.getItem("currencyIndex"),
          label: this.props.data.currencies[ localStorage.getItem("currencyIndex")].label,
        });
    }
    // in the first time ever. we set state to (USD)
    else if (localStorage.getItem("currencyIndex") === null//to check if i opened the app ever
      && !this.props.data.loading &&
      this.props.currencyIndexArray === 0)
    {
      this.props.setcurrency({
          currencyIndexArray: 0,
          label: this.props.data.currencies[0].label,
        });
      }
   
 }

  getCurrencies() {
      if (!this.props.data.loading) {
     
       
 return  <div className="dropdown" ref={this.wrapperRef}>
   <button onClick={()=>{this.setState({opened:!this.state.opened})}} className="dropbtn">{this.props.data.currencies[this.props.currencyIndexArray].symbol} <img src={arrow} alt="" style={this.props.iscartopened ? {transform:" rotate(0deg)"}:{transform:this.state.opened?"rotate(180deg)":"rotate(0deg)"}}/>

    </button>
   <div className="dropdown-content" style={this.props.iscartopened ? {display:"none"}:{display:this.state.opened?"block":""}}>
     {
       this.props.data.currencies.map((currency,index) => {
         return <a key={index} href="# " onClick={() => {
          this.setState({opened:!this.state.opened})
           this.props.setcurrency({ currencyIndexArray: index, label: currency.label })
         }
}>{currency.symbol +" " + currency.label}</a>
       })
     }
     
            </div>
            </div>
     }
        else return <h1>Loading...</h1>
  }
  render() {
    return (

      <div>
  { this.getCurrencies()}
        </div>
    );
  }
}

const mapStateToProps = (state) => ({
  currencyIndexArray: state.currency.currencyIndexArray,
iscartopened:state.cart.opened,
      label: state.currency.label,
});

const mapDispatchToProps = { setcurrency };
const WithGraphql = graphql(Get_Currencies)(Currency);
export default connect(mapStateToProps, mapDispatchToProps)(WithGraphql);


