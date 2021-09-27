import { Button } from "../../common/Button";
import { lazy } from "react";
import { Row, Col } from "antd";
import { Slide, Zoom } from "react-awesome-reveal";
import {  ValidationTypeProps } from "../../components/Form/types";
import Input from "../../common/Input";
import {  FormGroup, Span } from "../../components/Form/styles";
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
import Links from "../../components/Links";

require('dotenv').config();
const Form = lazy(() => import("../../components/Form"));
const MiddleBlock = lazy(() => import("../../components/MiddleBlock"));
const Container = lazy(() => import("../../common/Container"));
const ScrollToTop = lazy(() => import("../../common/ScrollToTop"));
const ContentBlock = lazy(() => import("../../components/ContentBlock"));
const saleTime =  process.env.REACT_APP_SALE_TIME? parseInt(process.env.REACT_APP_SALE_TIME):0
const enableCountdown =  process.env.REACT_APP_COUNTDOWN? parseInt(process.env.REACT_APP_COUNTDOWN):false
const contractAddress = process.env.REACT_APP_CONTRACT_ADDRESS? process.env.REACT_APP_CONTRACT_ADDRESS: ""
const mintPrice: number = process.env.REACT_APP_MIN_PRICE? parseFloat(process.env.REACT_APP_MIN_PRICE):0.05
declare let window: any;

const LinkPage = () => {
  const openNewWindow = (url:String)=>
  {
   window.open(url, "_blank");
  };

  return (
    <Container>
      
     <Links></Links>
    </Container>
  );
};

export default LinkPage;
