
import './header.css';
import React from 'react';
import { gql } from '@apollo/client';
import { graphql } from '@apollo/client/react/hoc';
import { Query } from '@apollo/client/react/components'
import logo from "./Capture.PNG";
import Currency from '../currency/index';
  const Get_categories_names = gql`
 query{categories{
  name

}
}
`;

class Headers extends React.Component {
  
   showheaders() {
     if (!this.props.data.loading) {
       
       return <div >
         
         {this.props.data.categories.map((category ,index) => {
           
           return  <a className="categoriesHeader" key={index} href={"/category/" + category.name} >{ category.name}</a>
         })
         }
         
       </div>
     }
        else return <h1>Loading...</h1>
  }
  

  render() {
    return (
      <div className="header">
     
        <div >{ this.showheaders()}</div>
          
    <img src={logo}alt="" width="30px" heigth="30px"/>
        <Currency></Currency>
        
      </div>
    );
  }
}

export default graphql(Get_categories_names)(Headers);
