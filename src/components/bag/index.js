
import React from 'react';
import "./bag.css";
import { connect } from "react-redux";
import {changeimgindex, togglepopupCart, selectAttribute, plusCart, minusCart, emptyCart } from "../../redux/cartSlice";
import leftarrow from "./CaretLeft.svg";
import rightarrow from "./CaretRight.svg";
class Bag extends React.Component {

  viewbag() {
      var totalprice = 0;
    var symbol = "";

    
      return <>
        {
          this.props.products.map((product, index) => {
          
          totalprice += product.prices[this.props.currencyIndexArray].amount * product.count;
          symbol = product.prices[this.props.currencyIndexArray].currency.symbol;
          return <React.Fragment key={index}>
            <hr style={{ height: "1px", borderWidth: "0", color: "gray", backgroundColor: "gray" }} />
            <div className='cartcontent' >
          
              <div className='leftcart'>
        
                <h4> {product.brand}</h4>
               
                <p>   {product.name}</p>
               <h4>{ product.prices[this.props.currencyIndexArray].currency.symbol+product.prices[this.props.currencyIndexArray].amount}</h4>
           
                  {product.attributes.map((att,attindex) => {
                 return <div key={attindex}>
                 <h6 style={{marginBottom:0}}>{att.id}</h6>
                   {
                     <div style={{display:"flex",flexDirection:"row"}}>{
                       att.items.map((item, itemindex) => {
                      
                         if (att.id === "Color") {
                           return <div key={itemindex} style={{border: att.indexSelectedAttribute === itemindex ? "1px solid #5ECE7B" : "none",width:"23px",height:"23px"}}><button onClick={() => { this.props.selectAttribute({ indexproduct: index, indexattribute: attindex, valueindexSelectedAttribute: itemindex }) }} className='attribute' style={{ background: item.value, width: "20px", height: "20px",border:"none" }}></button></div>
                      
                         }
                         return <button key={itemindex} onClick={() => { this.props.selectAttribute({ indexproduct: index, indexattribute: attindex, valueindexSelectedAttribute: itemindex }) }} className='attribute' style={(att.indexSelectedAttribute === itemindex) ? { color: "white", backgroundColor: "black" } : {}}>{item.value}</button>
                           
                       }
                       )
                     }  </div>
                 }
</div>

               })}






              </div>
              <div className='rightcart'>
                <button   className='plusbtncart' onClick={()=>{this.props.plusCart({index})}}>+</button>
             <button className='negativebtncart' onClick={()=>{this.props.minusCart({index})}}>−</button>
                <button className='countbtncart'>{product.count}</button>
                <>
                 
                  <img src={product.gallery[this.props.products[index].imgindex]} alt="" />
                  <button className='imgleftslider' onClick={() => { 
                    if (this.props.products[index].imgindex === 0) {
           
                      this.props.changeimgindex({value: product.gallery.length -1,productindex:index});
                    }
                    else {
                
                         this.props.changeimgindex({value: this.props.products[index].imgindex-1 ,productindex:index});
                    }

                    
                  }}><img src={leftarrow } alt=""/></button>
                  <button className='imgrightslider' onClick={() => {
                    
     if (this.props.products[index].imgindex === product.gallery.length-1) {
      
           this.props.changeimgindex({value: 0,productindex:index});
                    }
                    else {
                          this.props.changeimgindex({value: this.props.products[index].imgindex+1 ,productindex:index});
                    }

                  }}><img src={rightarrow } alt="" /></button>
             
                </>
              
              
              </div>
   
              
            </div>
   
   
   
          </React.Fragment>
        })
        
        }
         <hr style={{ height: "1px", borderWidth: "0", color: "gray", backgroundColor: "gray" }} />

               
            <p>Tax 21%:<strong>{symbol + (totalprice*21)/100}</strong></p>
            <p>Quantity:<strong>{this.props.totalcountProducts}</strong></p>
            <p>Total:<strong>{"\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0"+symbol+(totalprice).toString()}</strong></p>
                <button  onClick={()=>{this.props.emptyCart()}} className='orderbtn' >ORDER</button>

      </>
      }

    
  
  render() {
    return (
      <div className='maincart'>
        <h2>CART</h2>
      

        {
          this.viewbag()
}
 
        
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  totalcountProducts: state.cart.totalcountProducts,
iscartopened:state.cart.opened,
  products: state.cart.products,
    currencyIndexArray : state.currency.currencyIndexArray,
      
});

const mapDispatchToProps = {changeimgindex, togglepopupCart ,selectAttribute,plusCart,minusCart,emptyCart};

export default connect(mapStateToProps, mapDispatchToProps)(Bag);

