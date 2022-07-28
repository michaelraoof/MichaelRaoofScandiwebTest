
import './currency.css';



import React from 'react';
import { connect } from "react-redux";
import { setcurrency } from "../../redux/currencySlice.js";
import { gql } from '@apollo/client';
import { graphql } from '@apollo/client/react/hoc';
import arrow from "./downArrow.png";
const Get_Currencies = gql`
 query{
  currencies{
    label
    symbol
  }
    
}
`;

class Currency extends React.Component {
  constructor() {
    super();

    this.state = { currencyIndexArray: 0,symbol:"",label:""};
   this.setCurrency= this.setCurrency.bind(this);
  }

  setCurrency(index) {
    this.setState({ currencyIndexArray: index });
    
   }
 
  getCurrencies() {
      if (!this.props.data.loading) {
       
        
 return  <div className="dropdown">
    <button className="dropbtn">{this.props.data.currencies[this.state.currencyIndexArray].symbol} <img src={arrow} alt=""/>
      <i className="fa fa-caret-down"></i>
    </button>
   <div className="dropdown-content">
     {
       this.props.data.currencies.map((currency,index) => {
         return  <a key={index} href="#0" onClick={()=>this.setState({ currencyIndexArray: index,symbol:currency.symbol,label:currency.label })}>{currency.symbol +" " + currency.label}</a>
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
  currencyindex: state.currency.currencyindex,

      label: state.currency.label,
});

const mapDispatchToProps = { setcurrency };
const WithGraphql = graphql(Get_Currencies)(Currency);
export default connect(mapStateToProps, mapDispatchToProps)(WithGraphql);

//export default graphql(Get_Currencies)(Currency);
