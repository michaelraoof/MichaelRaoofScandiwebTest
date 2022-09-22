import React from "react";
import Main from "./components/main/main.js";
import { ApolloProvider, ApolloClient, InMemoryCache } from "@apollo/client";
import "./App.css";
import { Provider } from "react-redux";
import store from "./redux/store.js";

const client = new ApolloClient({
  cache: new InMemoryCache(),
  uri: "https://apolloendpoint.herokuapp.com/",
});
class App extends React.Component {
  render() {
    return (
      <div className="App">
        <Provider store={store}>
          <ApolloProvider client={client}>
            <Main />
          </ApolloProvider>
        </Provider>
      </div>
    );
  }
}

export default App;
