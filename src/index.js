import React from 'react';
import ReactDOM from 'react-dom';
import { MoralisProvider } from "react-moralis"
import App from "./App"
import { ChakraProvider } from "@chakra-ui/react"

appId = "xxxx"
serverUrl = "https://xxxx/server"

ReactDOM.render(
  <React.StrictMode>
    <MoralisProvider appId={appId} serverUrl={serverUrl}>
      <ChakraProvider>
        <App />
      </ChakraProvider>
    </MoralisProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

