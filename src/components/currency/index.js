
import './currency.css';

import React from 'react';
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

    this.state = { currencyIndex: 0};
   this.setCurrency= this.setCurrency.bind(this);
  }

  setCurrency(index) {
    this.setState({ currencyIndex: index });
    
   }

  getCurrencies() {
      if (!this.props.data.loading) {
       
        
 return  <div class="dropdown">
    <button class="dropbtn">{this.props.data.currencies[this.state.currencyIndex].symbol} <img src={arrow} />
      <i class="fa fa-caret-down"></i>
    </button>
   <div class="dropdown-content">
     {
       this.props.data.currencies.map((currency,index) => {
         return  <a href="#" onClick={()=>this.setState({ currencyIndex: index })}>{currency.symbol +" " + currency.label}</a>
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

export default graphql(Get_Currencies)(Currency);
