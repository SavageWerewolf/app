import { Button } from "../../common/Button";
import { lazy } from "react";
import { Row, Col } from "antd";
import { Slide, Zoom } from "react-awesome-reveal";
import {  ValidationTypeProps } from "../Form/types";
import Input from "../../common/Input";
import {  FormGroup, Span } from "../Form/styles";
import {AbiItem} from 'web3-utils';
import  { useEffect, useState } from 'react';
import { useForm } from "../../common/utils/useForm";
import CryptoJS from 'crypto-js';
import validate from "../../common/utils/validationRules";
import contractJson from "../../SmartContract.json";
import BlockUi from 'react-block-ui';
import Web3 from "web3";
import Web3Modal, { PROVIDER_CONTAINER_CLASSNAME } from "web3modal";
import WalletConnectProvider from "@walletconnect/web3-provider";
import styled from "styled-components";

require('dotenv').config();
const Form = lazy(() => import("../Form"));
const MiddleBlock = lazy(() => import("../MiddleBlock"));
const Container = lazy(() => import("../../common/Container"));
const ScrollToTop = lazy(() => import("../../common/ScrollToTop"));
const ContentBlock = lazy(() => import("../ContentBlock"));
const saleTime =  process.env.REACT_APP_SALE_TIME? parseInt(process.env.REACT_APP_SALE_TIME):0
const enableCountdown =  process.env.REACT_APP_COUNTDOWN? parseInt(process.env.REACT_APP_COUNTDOWN):false
const contractAddress = process.env.REACT_APP_CONTRACT_ADDRESS? process.env.REACT_APP_CONTRACT_ADDRESS: ""
const mintPrice: number = process.env.REACT_APP_MIN_PRICE? parseFloat(process.env.REACT_APP_MIN_PRICE):0.05
declare let window: any;


const Links = () => {
  const openNewWindow = (url:String)=>
  {
   window.open(url, "_blank");
  };

  return (
    <Container>
    <MiddleBlock
        title="Links"
        content={
          (
          <div>
          <Row align="middle">
            <div>
                <Button name="discord-btn" onClick={() =>  alert("Coming soon!")}>Discord
                </Button>
                <Button name="twitter-btn" onClick={() =>  openNewWindow("https://twitter.com/sws_werewolf")}>Twitter
                </Button>
                <Button name="instagram-btn"  onClick={() =>  openNewWindow("https://www.instagram.com/savage_werewolf_nft")}>Instagram
                </Button>
            </div>
            </Row>
            </div>
            ) 
        }
        button=""
        scrollTo=""
        id = "links"
      />
    </Container>
  );
};

export default Links;
