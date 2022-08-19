import './bag.css';
import React from 'react';
import popupBagimg from "./Empty Cart.svg";
import { connect } from "react-redux";
import { togglepopupCart, selectAttribute, plusCart, minusCart, emptyCart } from "../../redux/cartSlice";
import { Link } from "react-router-dom";
class PopupBag extends React.Component {
 constructor(props) {
    super(props);

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
    if (this.wrapperRef && !this.wrapperRef.current.contains(event.target)&&this.props.iscartopened) {
     // alert("You clicked outside of me!");
      this.props.togglepopupCart();
    }
  }
  showCart() {
          var totalprice = 0;
          var symbol = "";
    if(this.props.totalcountProducts===0){
             return <div className="bag" style={{ display: this.props.iscartopened ? "grid" : "none" }}><p>Empty cart </p></div>
    }
    else {
           return     <div className="bag" style={{ display: this.props.iscartopened ? "grid" : "none" }}>
         
      
        <div className='bagheader'><p><strong>My Bag, </strong>{this.props.totalcountProducts} items</p></div>
       
        {
       
         this.props.products.map((product, index) => {
           totalprice +=  product.prices[this.props.currencyIndexArray].amount*product.count;
           symbol = product.prices[this.props.currencyIndexArray].currency.symbol;
         return     <React.Fragment key={index} >
           <div className='leftcontent' >{
             <div>
               
               
               <p> {product.brand}</p>
               
               <p>   {product.name}</p> 
               
               <p>{ product.prices[this.props.currencyIndexArray].currency.symbol+product.prices[this.props.currencyIndexArray].amount}</p>
           
               {product.attributes.map((att,attindex) => {
                 return <div key={attindex}>
                 <p>{att.id}</p>
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
            
           
           
           
           }</div>
     
           <div className='rightcontent'>
             <button   className='plusbtn' onClick={()=>{this.props.plusCart({index})}}>+</button>
             <button className='negativebtn' onClick={()=>{this.props.minusCart({index})}}>−</button>
             <button className='countbtn'>{ product.count}</button>
             <img src={product.gallery[0]} alt="" />
        </div>
</React.Fragment> 
        })
}
  
      
<>
               <p  style={{marginTop:"10px"}} className='leftcontent'>total</p>
               <p style={{textAlign:"right",marginTop:"10px"}} className='rightcontent'>{symbol+totalprice}</p>
             </>
             <>
               <Link to={"/bag"} onClick={() => {  this.props.togglepopupCart(); }} className='viewbtn'>VIEW BAG</Link>
             <button  onClick={()=>{this.props.emptyCart()}} className='checkoutbtn' >CHECK OUT</button>
             
             </>
              </div>
    }
 }
  render() {
    return (
      <div ref={this.wrapperRef}>
      <React.Fragment >
        <button  onClick={() => { this.props.togglepopupCart();  }} className='popupbtncart'>  <img src={popupBagimg} alt="" /></button> 
          {(this.props.totalcountProducts)?
          <button className='numproducts'>{this.props.totalcountProducts}</button>:""
          }
          {
           
       
        this.showCart()
          
         
          }
        </React.Fragment >
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

const mapDispatchToProps = { togglepopupCart ,selectAttribute,plusCart,minusCart,emptyCart};

export default connect(mapStateToProps, mapDispatchToProps)(PopupBag);

