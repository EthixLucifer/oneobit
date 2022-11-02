import React, { useEffect, useState } from "react";
import { Container, Button, Input, Spacer, Text } from '@nextui-org/react';
import { ethers } from "ethers";
import Web3Modal from "web3modal";
import OneOBit from "../components/ABI/OneOBit.json";
const contractAddress = "0xeE47F4743f5ae3E23bdDDBa934db5B01661fE368";
import detectEthereumProvider from "@metamask/detect-provider";
import codevalues from "./codevalues.json"

export default function Front() {

  const [userAddress, setuserAddress] = useState("");

  //sets code value given by the user and is used in claimNFTs function to validate code values 
  const [codeValue, setcodeValue] = useState('');

  async function connectUser() {
    try {
      if (window.ethereum) {
        const web3modal = new Web3Modal();
        const connection = await web3modal.connect();
        const provider = new ethers.providers.Web3Provider(connection);
        const account = await provider.listAccounts();
        setuserAddress(account)
        console.log(account);
      }
      else {
        console.log("Please install metamask wallet");
      }
    }

    catch (error) {
      console.log(":::");
    }
  }

  //Ensures selected chain is in Goerli Network
  async function setGoerChain() {
    const metamask = await detectEthereumProvider();
    const GoerliChainId = '0x5';
    if (metamask.chainId != GoerliChainId) {
      try {
        await ethereum.request({
          method: 'wallet_switchEthereumChain',
          params: [{ chainId: '0x5' }],
        });
      }

      catch (error) {
        if (error.code === 4902) {
          try {
            await window.ethereum.request({
              method: 'wallet_addEthereumChain',
              params: [
                {
                  chainId: '0x5',
                  chainName: 'Goerli Testnet',
                  nativeCurrency: {
                    name: "gETH",
                    symbol: "ETH-G",
                    decimals: 18,

                  },

                  rpcUrls: ['https://goerli.infura.io/v3/9aa3d95b3bc440fa88ea12eaa4456161'],

                  blockExplorerUrls: ['https://goerli.etherscan.io/']
                }]
            })
          } catch (error) {
            console.log("Error while connecting to Goerli Testnet ::::: ", error, ' <<<<<===========');
          }
        }
      }
    }

    else { console.log("You are already in Goerli Chain"); }
  }


  async function refreshWallet() {
    connectUser();
    setGoerChain();
  }


  async function claimNFTs() {

    console.log(`Value entered by the USER  ${codeValue} <<`);


    try {

      //checks and validates the code value given by the user with our js backend file, if correct code value is given, it mints tokens for user address


      if (codevalues[codeValue] == undefined || NaN) {
        console.log("The CodeValue is Either undefined or Nan");
      }

      else {


        console.log("Token Id at Code Value : ", codevalues[codeValue]);
        console.log("Input code value", codeValue);


        setGoerChain();
        const web3modal = new Web3Modal();
        const connection = await web3modal.connect();
        const provider = new ethers.providers.Web3Provider(connection);
        const signer = provider.getSigner();

        //contract instance
        const OneOBitAssignmentContract = new ethers.Contract(contractAddress, OneOBit, signer);


        //code value given by user is decrypted and converted into quantity for ERC721A minting
        console.log(`token Id ${codevalues[codeValue]}  is being claimed`);
        let NFTMintedTo = await provider.listAccounts();
        NFTMintedTo = NFTMintedTo.toString();

        // claiming NFTS with smart contract instance
        let mintTransaction = await OneOBitAssignmentContract.claim(codevalues[codeValue]);
        mintTransaction = await mintTransaction.wait();
        console.log(`token Id ${codevalues[codeValue]}  has been claimed`);
      }
    }

    catch (error) {
      console.log("Error occured :::: ", error);
    }

  }


  useEffect(() => {
    connectUser();
    setGoerChain();


  }, [setuserAddress]);


  return (
    <Container className=' bg-blue-200 min-h-screen rounded-sm mb-4' >
      <Text className=" uppercase p-3 font-bold flex justify-center text-2xl"> FrontEnd for Users</Text>
      <Spacer y={4} />
      <div className=' p-2'>
        <Button bordered color={"secondary"} onClick={refreshWallet} auto
          className="mt-4 m-auto">
          Connect/Refresh Wallet
        </Button>
        <Text className="font-extrabold font-mono mt-4 m-auto flex justify-center"> Current User Connected  {userAddress}</Text>
        <Spacer y={10} />

        <Input
          bordered
          underlined
          labelPlaceholder="Enter Code Value to Claim ERC721A tokens"
          color="error"
          onChange={e => setcodeValue(e.target.value)
          }
          className="p-22 flex justify-center w-96"
        />

        <Spacer y={1.5} />
        <Button bordered color={"secondary"} auto onClick={claimNFTs}
          className="m-auto">
          Mint
        </Button>
        <Spacer y={5} />
      </div>
    </Container>
  )
}

