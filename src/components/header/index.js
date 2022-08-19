
import './header.css';
import React from 'react';
import { gql } from '@apollo/client';
import { graphql } from '@apollo/client/react/hoc';
//import { Query } from '@apollo/client/react/components'
import PopupBag from "../popupBag/index";
import logo from "./Brand icon.svg";
import Currency from '../currency/index';
import { connect } from "react-redux";
import { setCategoryType } from "../../redux/categorytypeSlice";

import { Link }  from "react-router-dom";

  const Get_categories_names = gql`
 query{categories{
  name

}
}
`;

class Headers extends React.Component {
  
  componentDidUpdate() {
    if ( !this.props.data.loading &&
      this.props.type === "") {
       this.props.setCategoryType({
          type: this.props.data.categories[0].name,//set initial state to "all"
          
        });
      }
  }
   showheaders() {
     if (!this.props.data.loading) {
       
       return <div >
         
         {this.props.data.categories.map((category ,index) => {
           
           return <Link to={"/"} className="categoriesHeader" key={index} style={this.props.type === category.name ? { color: "#5ECE7B", backgroundColor: 'transparent', borderBottom: "1px solid rgb(48, 241, 48)" } : {}}
             onClick={() => {   
           if(this.props.isproductlistclosed)
           {//view product list if it is not open
             this.props.switchToProductlist();
        }
             this.props.setCategoryType({
              
               type:category.name
        })
           }} >{ category.name}</Link>
         })
         }
         
       </div>
     }
        else return <h1>Loading...</h1>
  }
  

  render() {
    return (
      <div className='mainheader'>
      <div className="headerlogos">
     
        <div >{ this.showheaders()}</div>
          
    <img src={logo} alt="home" width="30px" heigth="30px"/>
      <div className='popupslogos'>
            <Currency></Currency>
      
             <PopupBag  ></PopupBag>        
         
        </div>
      
  
        </div>
       
     
        
        </div>
    );
  }
}






const mapStateToProps = (state) => ({
 
  type: state.headerType.type,
  
});

const mapDispatchToProps = { setCategoryType };
const WithGraphql = graphql(Get_categories_names)(Headers);
export default connect(mapStateToProps, mapDispatchToProps)(WithGraphql);
