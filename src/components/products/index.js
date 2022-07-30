import './products.css';
import { connect } from "react-redux";
import { gql } from '@apollo/client';
import { graphql } from '@apollo/client/react/hoc';
import React from 'react';
 const Get_Products = gql`
query  category($categorytitle:String!){

  category(input:{title: $categorytitle}){
  
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
                product.prices[this.props.currencyIndexArray].currency.symbol + product.prices[this.props.currencyIndexArray].amount
          
               
               }
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




const mapStateToProps = (state) => ({
  currencyIndexArray: state.currency.currencyIndexArray,
  label: state.currency.label,
  
      type:state.headerType.type
});


const WithGraphql = graphql(Get_Products, {
  options: (props) => ({ variables: { categorytitle: props.type} })
})(Products);
export default connect(mapStateToProps)(WithGraphql);
