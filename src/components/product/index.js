
import React from 'react';
import './product.css';
import { connect } from "react-redux";
import {  addProductToCart} from "../../redux/cartSlice";
import { gql } from '@apollo/client';
import { graphql } from '@apollo/client/react/hoc';
import { setstatetolocalstorage ,setattributeindices} from "../../redux/productid";

const Get_Productdescription = gql`
query  product($productdescriptionID:String!){

  product(id:$productdescriptionID)
{
       category
        brand
      name
      id
      gallery
      inStock
description
      prices {
        amount
        currency {
          label
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
`;
class Productdescription extends React.Component {
  constructor() {
    super();
    this.state = { zoomedimgindex: 0 };

  }
  componentDidMount() {
    if (this.props.id === null || this.props.id === undefined || this.props.id === "")
    {
      this.props.setstatetolocalstorage();
   
    }

  }
 getText(html){
    var divContainer= document.createElement("div");
    divContainer.innerHTML = html;
    return divContainer.textContent || divContainer.innerText || "";
}
  getproductdescription() {
    
    if (!this.props.data.loading) { 
 
          return <div className='mainproductdescription'>

      
          
          
          <div className='productsmallimgs'>
              {
                this.props.data.product.gallery.map((productimg,productindex) => {
                  return <img onClick={() => {
                    this.setState({ zoomedimgindex: productindex })
             
                  }} src={productimg}
                    alt="" key={productindex} width="70px" height="70px" />
                })
    }
                
            </div>
            <div className='productbigimg'>

              <img src={this.props.data.product.gallery[this.state.zoomedimgindex]} alt="" />
            </div>
                <div className='productdescription'>
               
               
               <h1> {this.props.data.product.brand}</h1>
               
               <p style={{fontSize:"2em"}} >   {this.props.data.product.name}</p> 
               
                {this.props.data.product.attributes.map((att,attindex) => {
                 return <div key={attindex}>
                 <h2>{att.id+":"}</h2>
                   {
                     <div style={{display:"flex",flexDirection:"row"}}>{
                       att.items.map((item, itemindex) => {
                      
                         if (att.id === "Color") {
                           
                           return <div key={itemindex}
                             style={{ border: this.props.attributeindices[attindex] === itemindex ? "1px solid #5ECE7B" : "none", width: "23px", height: "23px" }}>
                             <button
                               onClick={() => {
                               this.props.setattributeindices({value:itemindex,index:attindex})
                           
                               }}
                               className='attribute'
                               style={{ background: item.value, width: "20px", height: "20px", border: "none" }}>
                             </button>
                           </div>
                      
                         }
                         return <button key={itemindex}
                           onClick={() => {
                                   this.props.setattributeindices({value:itemindex,index:attindex}) 
                           
                           }} className='attribute' style={(this.props.attributeindices[attindex] === itemindex) ? { color: "white", backgroundColor: "black" } : {}}>{item.value}</button>
                           
                       }
                       )
                     }  </div>
                 }
</div>

                })}
              <h2>PRICE:</h2>
    <h2>{ this.props.data.product.prices[this.props.currencyIndexArray].currency.symbol+this.props.data.product.prices[this.props.currencyIndexArray].amount}</h2>
              <button onClick={() => {
                
               this.props.addProductToCart({
                   id: this.props.data.product.id,
                   name: this.props.data.product.name,
                   brand: this.props.data.product.brand,
                   prices: this.props.data.product.prices,
                   attributes: this.props.data.product.attributes.map((attribute,i) => ({ ...attribute, indexSelectedAttribute: this.props.attributeindices[i] })),
                   //indexSelectedAttribute select option eg (green or blue for swatch) (small or big for size)
                   gallery: this.props.data.product.gallery,
           
                 });
           }}>  <p style={{fontSize:"1em"}} > ADD TO CART</p></button>
      <div>        {this.getText( this.props.data.product.description)}</div>
             </div>
            
                </div>
          
        }
  }
  render() {
    return (
      <div >
            {
                this.getproductdescription()
      }
        
      </div>
    );
  }
}

const mapStateToProps = (state) => ({

  id: state.productid.productdescriptionID,
  currencyIndexArray: state.currency.currencyIndexArray,
  attributeindices:state.productid.attributeindices,
});

const mapDispatchToProps = {addProductToCart,setstatetolocalstorage,setattributeindices};

  


const WithGraphql = graphql(Get_Productdescription, {//to fetch data when id of product change
  options: (props) => ({ variables: { productdescriptionID: props.id} })
})(Productdescription);


export default connect(mapStateToProps,mapDispatchToProps)(WithGraphql);