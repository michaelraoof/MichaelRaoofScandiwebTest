import "./header.css";
import React from "react";

import { graphql } from "@apollo/client/react/hoc";
//import { Query } from '@apollo/client/react/components'
import PopupBag from "../popupBag/popupBag";
import logo from "../../assets/images/Brand icon.svg";
import Currency from "../currency/currency";
import { connect } from "react-redux";
import { setCategoryType } from "../../redux/categorytypeSlice";
import { Get_categories_names } from "../../GraphQL/GraphQL";
import { Link } from "react-router-dom";

class Headers extends React.Component {
  componentDidUpdate() {
    var { data, type, setCategoryType } = this.props;
    if (!data.loading && type === "") {
      setCategoryType({
        type: data.categories[0].name, //set initial state to "all"
      });
    }
  }
  showheaders() {
    var { data, isproductlistclosed, switchToProductlist, setCategoryType } = this.props;
    if (!data.loading) {
      return (
        <div>
          {data.categories.map((category, index) => {
            return (
              <Link
                to={"/"}
                className="categoriesHeader"
                key={index}
                style={
                  this.props.type === category.name
                    ? { color: "#5ECE7B", backgroundColor: "transparent", borderBottom: "1px solid rgb(48, 241, 48)" }
                    : {}
                }
                onClick={() => {
                  if (isproductlistclosed) {
                    //view product list if it is not open
                    switchToProductlist();
                  }
                  setCategoryType({
                    type: category.name,
                  });
                }}
              >
                {category.name}
              </Link>
            );
          })}
        </div>
      );
    } else return <h1>Loading...</h1>;
  }

  render() {
    return (
      <div className="mainheader">
        <div className="headerlogos">
          <div>{this.showheaders()}</div>

          <img src={logo} alt="home" width="30px" heigth="30px" />
          <div className="popupslogos">
            <Currency></Currency>

            <PopupBag></PopupBag>
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
