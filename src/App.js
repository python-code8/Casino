import React from "react";
import { useMoralis } from "react-moralis"
import { Button, Text, Box, Container } from "@chakra-ui/react"
import Flip from "./Flip";

function App() {

  const { authenticate, isAuthenticated, logout } = useMoralis()

  if (isAuthenticated) {
    return (
      <Container centerContent>
        <Text fontSize="3xl" textAlign="center">Welcome to the Casino</Text>
        <Box borderRadius="md"  color="white" px={4} h={8} alignContent="center">
          <Button colorScheme="purple" variant="ghost" onClick={() => logout()}>Log-out</Button>
        </Box>
        <br/>
        <Text textAlign="left" lineHeight="1.6">First you will send 0.1 LINK token to access the oracle and another transaction to get the random number</Text>
        <Text textAlign="left" lineHeight="1.6">You have to wait for an minute for the oracle to respond. And your flip transaction will occur</Text>
        <Text textAlign="left" lineHeight="1.6">A total of three transactions. And if you win you will receive double the amount you bet and if you lose...you lose</Text>
        <br/>
        <Flip />
        <br/>
        <br/>
        <a href="https://rinkeby.etherscan.io/address/0x7128700423f2B7fcB2cd34fac865300cA7E74F98#code" target="_blank"><Text>View Contract in Etherscan</Text></a>
      </Container>
    )
  }

  return (
  <>
    <Button colorScheme="purple" variant="solid" onClick={() => authenticate()}>Authenticate</Button>
  </>
  )



}

export default App;
