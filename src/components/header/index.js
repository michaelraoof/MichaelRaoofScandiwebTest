
import './header.css';
import React from 'react';
import { gql } from '@apollo/client';
import { graphql } from '@apollo/client/react/hoc';
import { Query } from '@apollo/client/react/components'
import logo from "./Capture.PNG";
import Currency from '../currency/index';
import { connect } from "react-redux";
import { setCategoryType } from "../../redux/categorytypeSlice";
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
           
           return <a  className="categoriesHeader" key={index} onClick={() => {   
           
             
             this.props.setCategoryType({
              
               type:category.name
        })
           }} href={"#0"}>{ category.name}</a>
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
          
    <img src={logo} alt="home" width="30px" heigth="30px"/>
        <Currency></Currency>
        
      </div>
    );
  }
}






const mapStateToProps = (state) => ({
 
type:state.headerType.type,
});

const mapDispatchToProps = { setCategoryType };
const WithGraphql = graphql(Get_categories_names)(Headers);
export default connect(mapStateToProps, mapDispatchToProps)(WithGraphql);
