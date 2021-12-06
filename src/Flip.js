import casinoContractAbi from "./Casinoabi";
import Linkabi from "./Linkabi";
import { Input, Button,Stack, RadioGroup, Radio, Text, Container, Box} from "@chakra-ui/react"
import { useState } from "react";
import { Moralis } from "moralis"

const { ethers } = require("ethers");
const casinoAddress = "0x7128700423f2B7fcB2cd34fac865300cA7E74F98"
const linkAddress = "0x01BE23585060835E02B77ef475b0Cc51aA1e0709"
const web3 =  Moralis.enableWeb3();

 

function Flip() {
    const [amount, setAmount] = useState(0)
    const handleAmountChange = (event) => {
        setAmount(event.target.value)
        //console.log(amount)
    }

    const [value, setValue] = useState("1")
    //console.log(value)

    async function fundlink() {
        const options = {
            contractAddress: linkAddress,
            functionName: "transfer",
            abi: Linkabi,
            params: {
                _to: casinoAddress,
                _value: ethers.utils.parseUnits("0.1", "ether"),
            }
        };
        const receipt = await Moralis.executeFunction(options)
        console.log(receipt)
    }

    async function randomnumber() {
        const options = {
            contractAddress: casinoAddress,
            abi: casinoContractAbi,
            functionName: "getRandomNumber",
        };

        const receipt = await Moralis.executeFunction(options);
        console.log(receipt)
    }

    const sleep = (milliseconds) => {
        return new Promise(resolve => setTimeout(resolve, milliseconds))
      }

    async function handleflip() {
        const options = {
            contractAddress: casinoAddress,
            abi: casinoContractAbi,
            functionName: "flip",
            msgValue: ethers.utils.parseUnits(amount.toString(), "ether"),
            params: {
                choice: value,
            }
        };

        await fundlink()
        await randomnumber()
        await sleep(60000)
        const reciept = await Moralis.executeFunction(options)
        console.log(reciept)
    }

    async function CheckBalance() {
        const options = {
            contractAddress: casinoAddress,
            abi: casinoContractAbi,
            functionName: "checkContractBalance",
        };
        const receipt = await Moralis.executeFunction(options);
        document.getElementById("bal").innerHTML = "Balance: " + receipt + " " + "wei"
    }

    return (
        <Container centerContent marginTop={100}>  
            
            <Input placeholder="Enter bet value" type="number" value={amount ? amount : ""} onChange={handleAmountChange}></Input>
            

                <RadioGroup onChange={setValue} value={value}>
                <Stack direction="row">
                    <Radio value="1">Odd</Radio>
                    <Radio value="0">Even</Radio>

                </Stack>
                </RadioGroup>
            <Stack direction="row" padding={4}>
                <Box borderRadius="md"  color="white" px={4} h={8} alignContent="center">
                    <Button colorScheme="blue" variant="solid" onClick={() => handleflip()}>FLIP!!</Button>
                </Box>
                <Box borderRadius="md"  color="white" px={4} h={8} alignContent="center">
                    <Button colorScheme="green" variant="solid" onClick={() => CheckBalance()}>Check Contract Balance</Button>
                </Box>
            </Stack>
            <Text textAlign="center" id="bal"></Text>
        </Container>
    )
}

export default Flip;