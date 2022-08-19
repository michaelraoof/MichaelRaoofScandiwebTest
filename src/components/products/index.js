import './products.css';
import { connect } from "react-redux";
import { gql } from '@apollo/client';
import { graphql } from '@apollo/client/react/hoc';
import emptycartImg from "./Empty Cart.png";
import { addProductToCart } from "../../redux/cartSlice";
import { setproductid } from "../../redux/productid";
import React from 'react';

import { Link }  from "react-router-dom";

 const Get_Products = gql`
query  category($categorytitle:String!){

  category(input:{title: $categorytitle}){
  
  products{
    category
    brand
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

       attributes {
        id
        name
        type
        items {
          displayValue
          value
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
       
           return   <Link to={product.inStock?"/product":"/"} onClick={() => {
            
             if (product.inStock) {
   

    
               this.props.setproductid({ id: product.id ,attlength:product.attributes.length});
           
               
           }
           
           
           }} key={index} style={!product.inStock ? { filter: "opacity(50%)" ,cursor:"default"}:{}}>{<div>
             <img className='productImg' src={product.gallery[0]} alt={product.name} />
       
             {product.inStock &&
               <button style={{  background: "none"
                     , border: "none"
                   }} onClick={(e) => {
              e.preventDefault();
// e.preventDefault(); //to stop the whole Link to={}
               //  e.stopPropagation();//to stop the whole div onclick()
                // console.log(product)
                 
                 this.props.addProductToCart({
                   id: product.id,
                   name: product.name,
                   brand: product.brand,
                   prices: product.prices,
                   attributes: product.attributes.map((attribute) => ({ ...attribute, indexSelectedAttribute: 0 })),
                   //indexSelectedAttribute select option eg (green or blue for swatch) (small or big for size)
                   gallery: product.gallery,
           
                 });
                 
}} > <img className='cartimg' src={emptycartImg} alt="empty cart" /></button>}
                   
              <div className='outStock'>
                 {
                   !product.inStock && <div><p>OUT OF STOCK</p></div>
                 }
             </div>
             
             </div>
             }
             {<div className='txt' style={product.inStock ? {}:{paddingTop:"1.7em"}}>
               {product.name}
               </div>
             }
          
             
             {<div className='txt'>
               {
                product.prices[this.props.currencyIndexArray].currency.symbol + product.prices[this.props.currencyIndexArray].amount
          
               
               }
               </div>
             }
             {
             
             }
           
             </Link>
             
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



const mapDispatchToProps = { addProductToCart ,setproductid};
const mapStateToProps = (state) => ({
  currencyIndexArray: state.currency.currencyIndexArray,
  label: state.currency.label,
  cart:state.cart,
      type:state.headerType.type
});


const WithGraphql = graphql(Get_Products, {//to fetch data when header type change
  options: (props) => ({ variables: { categorytitle: props.type} })
})(Products);
export default connect(mapStateToProps,mapDispatchToProps)(WithGraphql);
