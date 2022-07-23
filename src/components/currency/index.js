
import './currency.css';

import React from 'react';
import { gql } from '@apollo/client';
import { graphql } from '@apollo/client/react/hoc';
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

    this.state = { value: 0};
     this.handleChange = this.handleChange.bind(this);
  }

    handleChange(event) {
      this.setState({ value:event.target.selectedIndex-1});

      event.target.selectedIndex = 0;

  }

  getCurrencies() {
      if (!this.props.data.loading) {
       
        return <select onChange={this.handleChange} className="selector">
          
       <option id='selected' key={0} value={0} hidden defaultValue>{this.props.data.currencies[this.state.value].symbol}</option>
        
         {this.props.data.currencies.map((currency,index) => {
        
         

           return <option key={index+1} value={currency.symbol} >{currency.symbol + " " + currency.label} </option>
         })
         }
         
       </select>
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
