import React from 'react';
import Main from "./components/main/index.js";
import { ApolloProvider, ApolloClient ,InMemoryCache} from '@apollo/client';
import './App.css';

const client = new ApolloClient({
  cache: new InMemoryCache(),
  uri: "http://localhost:4000/"
});
class App extends React.Component {
 
  render() {
    return (
      <div className="App">
      <ApolloProvider client={client}>
     <Main />
</ApolloProvider>
      </div>
    );
  }
}

export default App;
