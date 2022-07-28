import './products.css';
import { gql } from '@apollo/client';
import { graphql } from '@apollo/client/react/hoc';
import React from 'react';
 const Get_Products = gql`
query{category(input:{title:"all"}){
  
  products{
    name
    id
    gallery
    inStock
    
    prices{
      amount
      currency {
 
        symbol
      }
    }
  }
}

}
`;

class Products extends React.Component {
  showProducts() {
    if (!this.props.data.loading) {
       
       return  <div className="grid-container">
         
         {this.props.data.category.products.map((product ,index) => {
       
           return <div   key={index}>{
             <img src={product.gallery[0]} alt={product.name} />
         
           }
        
             
             {<div className='txt'>
               {product.name}
               </div>
             }
          
             
             {<div className='txt'>
               {
             product.prices[0].currency.symbol+  product.prices[0].amount }
               </div>
           }
           
           </div>
         })
         }
         
       </div>
     }
        else return <h1>Loading...</h1>
  }
  render() {
    return (

      <div className="Products">
        
       
          
       {this.showProducts()}
 
     
        </div>
    );
  }
}

export default graphql(Get_Products)(Products);

