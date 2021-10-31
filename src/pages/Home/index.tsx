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
import contractJson from "../../SavageWerewolfNFT.json";
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
declare let window: any;


const featuredGallery = (
  <div className="slideshow">
  <div className="images">
      <img src="img/feature/1.jpg"/>
      <img src="img/feature/2.jpg"/>
      <img src="img/feature/3.jpg"/>
      <img src="img/feature/4.jpg"/>
      <img src="img/feature/5.jpg"/>
      <img src="img/feature/6.jpg"/>
      <img src="img/feature/7.jpg"/>
      <img src="img/feature/8.jpg"/>
      <img src="img/feature/9.jpg"/>
      <img src="img/feature/10.jpg"/>
      <img src="img/feature/11.jpg"/>
      <img src="img/feature/12.jpg"/>
      <img src="img/feature/13.jpg"/>
      <img src="img/feature/14.jpg"/>
      <img src="img/feature/15.jpg"/>
      <img src="img/feature/1.jpg"/>
      <img src="img/feature/2.jpg"/>
      <img src="img/feature/3.jpg"/>
      <img src="img/feature/4.jpg"/>
      <img src="img/feature/5.jpg"/>
      <img src="img/feature/6.jpg"/>
  </div>
  </div>)
  
  const roadMap = 
    (
      <div className="roadmap">
      <div className="content">
        <h5>Launch of Savage Werewolf Society
        </h5>
        <p><ul>
          <li>The Savage Werewolves sale will take place here on our website.</li>
          </ul></p>
      </div>
      <div className="content">
        <h5>Presale of Savage Werewolves</h5>
        <p><ul>
        <li>There will only be 2,000 werewolves available to be minted during the presale.</li>
          <li>During the presale period, there will be giveaways to randomly selected and proactive members in our community.</li>
          <li>Minted werewolves will stay hidden.</li>
          </ul></p>
      </div>
      <div className="content">
        <h5>Reveal of Savage Werewolf
        </h5>
        <p><ul>
        <li>All minted werewolves will have their traits revealed at a specified date TBC (Subject to community response)</li>
          <li>More generative and 1/1 unique werewolves to be released for public sales and giveaways (Subject to community response)</li>
          </ul></p>
      </div>
      <div className="content">
        <h5>Community Driven</h5>
        <p><ul>
        <li>This is a community driven society. We will hear out suggestions and ideas and decides on the direction of this project!</li>
          <li>We will host events and challenges with attractive prizes and gifts to be won!</li>
          </ul></p>
      </div>
      <div className="content">
        <h5>Savage Werewolf Exclusives
        </h5>
        <p><ul>
        <li>Randomly Selected NFT owners will receive ETH and NFTs as prizes</li>
          <li>Holders will have exclusive mint and future incentives beyond this ecosystem!</li>
          </ul></p>
      </div>
      </div>
      )
  

interface ProgressbarProps {
  progress :number ,max :number,height:number
}

//infuraId: process.env.REACT_APP_INFURA_ID // required
const providerOptions = {
  walletconnect: {
    package: WalletConnectProvider, // required
    options: {
      
      rpc: {
        137: "https://rpc-mainnet.maticvigil.com/",
      },
      network: "matic",
    
    }
  }
};

const web3Modal = new Web3Modal({
  network: process.env.REACT_APP_NETWORK,
  cacheProvider: false, // optional
  providerOptions // required
});
const Home = () => {
	
  document.addEventListener("contextmenu", function(e){
  	e.preventDefault();
  }, false);
  


  // const web3 = new Web3(Web3.givenProvider)

  const [account, setAccount] = useState("");
  const [balance, setBalance] = useState(0);
  const[mintPrice, setMintPrice] = useState(process.env.REACT_APP_MIN_PRICE?process.env.REACT_APP_MIN_PRICE as any:50 as any)
  const [availableToken, setAvailableToken] = useState(0);
  const [availableVoucher, setAvailableVoucher] = useState(0);
  const [voucherSupply, setVoucherSupply] = useState(0);
  const [maxToken, setMaxToken] = useState(10000);
  const [blocking, setBlocking] = useState(false);
  const [timerStarted, setTimerStarted] = useState(false);
  const [currentTime, setCurrentTime] = useState(new Date().getTime());
  const url = process.env.REACT_APP_API_URL?new Web3.providers.HttpProvider(process.env.REACT_APP_API_URL):Web3.givenProvider
  const [provider, setProvider] = useState(url);
  const [currentNetwork, setCurrentNetwork] = useState(0);

  const updateTime = () => {
    setCurrentTime(new Date().getTime())
    loadContractInfo(contractJson.abi as AbiItem[], contractAddress);
    new Web3(Web3.givenProvider).eth.net.getId().then(id=>{
      setCurrentNetwork(id)
    });
  }
  
  
  useEffect(() => {
    if(!timerStarted){
      setInterval(updateTime, 1000);
      setTimerStarted(true);
    }
    loadContractInfo(contractJson.abi as AbiItem[], contractAddress);
  }, []);


  const loadContractInfo = async (contractAbi: any, contractAddress: string) => {
    // const provider = await web3Modal.connect();

    const web3 = new Web3(provider);
    const contract = new web3.eth.Contract(contractAbi, contractAddress)
    
    const tokenLeft = await contract.methods.availableToMint().call()
    // console.log(tokenLeft)
    setAvailableToken(tokenLeft)

    const maxToken = await contract.methods.getMaxToken().call()
    setMaxToken(maxToken)
    
    if(process.env.REACT_APP_PROMO_CODE){
      const voucherJson = CryptoJS.AES.decrypt(process.env.REACT_APP_PROMO_CODE?process.env.REACT_APP_PROMO_CODE:"", process.env.REACT_APP_ENCRYPTION_KEY?process.env.REACT_APP_ENCRYPTION_KEY:"" ).toString(CryptoJS.enc.Utf8)
      const voucher = JSON.parse(voucherJson)
      const voucherLeft = await contract.methods.getAvailableVoucher(voucher).call()
      setAvailableVoucher(voucherLeft)
      setVoucherSupply(voucher.supply)
      if(voucherLeft>0){
        setMintPrice(voucher.minPrice/(10**18))
      }

    }

  }

  useEffect(() => {
    const loadUserInfo = async (contractAbi: any, contractAddress: string) => {
      // const provider = await web3Modal.connect();
      const web3 = new Web3(Web3.givenProvider);
      if(account!== undefined && account!=="" ){
        const contract = new web3.eth.Contract(contractAbi, contractAddress)
        const tokenOwn = await contract.methods.balanceOf(account).call()
        setBalance(tokenOwn)
      }else{
        const accounts = await web3.eth.getAccounts()
        if(accounts.length>0){
          const contract = new web3.eth.Contract(contractAbi, contractAddress)
          const tokenOwn = await contract.methods.balanceOf(accounts[0]).call()
          setBalance(tokenOwn)
        }
      }
    }
    loadUserInfo(contractJson.abi as AbiItem[], contractAddress);
  }, [account]);

  const disconnect = async ()=>{
    // const provider = await web3Modal.cachedProvider();
    // await provider.disconnect()
  }

  const connectWallet = async () => {
    const provider = await web3Modal.connect();
    setProvider(provider)
    const web3 = new Web3(provider);
    web3.eth.getAccounts().then((accounts)=>{
      if(accounts.length>0){
        setAccount(accounts[0]);
      }else{
        setAccount("")
      }
    }).catch((error)=>{
      console.log(error.message)
    })
  };

  const mintToken = async (qty: number) => {
    if(account.length>0){
      const web3 = new Web3(provider);
      // console.log("mintToken called")
      const contract = new web3.eth.Contract(contractJson.abi as AbiItem[], contractAddress)
      const payableAmount =  (qty* mintPrice * 10 **18).toString() 
      // console.log("mintPrice: "+mintPrice)
      // console.log("qty: "+qty)
      setBlocking(true);
  
      contract.methods.mintNFT(qty).send({from: account,value: payableAmount})
      .then((result: any) => {
        console.log("Success! Got result: " + JSON.stringify(result));
        loadContractInfo(contractJson.abi as AbiItem[], contractAddress);
        alert("Transaction Completed");
        setBlocking(false);
      }).catch((err: any) => {
        console.log("Failed with error: " + JSON.stringify(err));
        alert(err.message);
        setBlocking(false);
      });
    }
  }


  const redeemVoucher = async (qty:number, voucherCode: string)=>{
    if(account.length>0){
      const web3 = new Web3(provider);
      const contract = new web3.eth.Contract(contractJson.abi as AbiItem[], contractAddress)
      const accounts:string[] = await web3.eth.getAccounts()
      setAccount(accounts[0])
      const voucherJson = CryptoJS.AES.decrypt(voucherCode,process.env.REACT_APP_ENCRYPTION_KEY?process.env.REACT_APP_ENCRYPTION_KEY: "" ).toString(CryptoJS.enc.Utf8)
      const voucher = JSON.parse(voucherJson)
      // console.log(voucher.minPrice)
      const payableAmount =  (qty * voucher.minPrice).toString() 
      // console.log(qty)
      // console.log(payableAmount)
      contract.methods.redeem(accounts[0], voucher, qty).send({from: accounts[0],value: payableAmount})  
      .then((result:any) => {
        console.log("Success! Got result: " + JSON.stringify(result));
      }).catch((err:any) => {
        console.log("Failed with error: " + JSON.stringify(err));
      });
    }
  }

  const onMint = async (event : any) =>{
    const web3 = new Web3(provider);
    if(availableToken==0){
      event.preventDefault();
    }else {
      const contract = new web3.eth.Contract(contractJson.abi as AbiItem[], contractAddress)
      handleSubmit(event, mintToken, redeemVoucher, contract)
    }
  }

  const { values, errors, handleChange, handleSubmit } = useForm(
    validate
  ) as any;

  const ValidationType = ({ type }: ValidationTypeProps) => {
    const ErrorMessage = errors[type];
    return (
        <Span erros={errors[type]}>{ErrorMessage}</Span>
    );
  };

  const a = ()=>{

  }

  const mintComponent = () =>{
    var mintComponent:any = ""

    if (account !== undefined && account !== "" && currentNetwork==137){
      mintComponent = (
        <div>
       <FormGroup autoComplete="off" onSubmit={onMint}>
        {availableToken>0?
        <p>   
          {
            availableVoucher>0?
            (<p>Get one at <span className="discountStyle"> {mintPrice} MATIC</span> <del>{process.env.REACT_APP_MIN_PRICE?process.env.REACT_APP_MIN_PRICE as any:50 as any} MATIC</del> <br/>Discount Left {availableVoucher}/{voucherSupply}</p>  )
            :
            (<p>Get one at {mintPrice} MATIC </p>  )
          }
        
          <div className="mint-form">
           <Row justify="space-between" align="middle">
              <Col lg={12} md={11} sm={24} xs={24}>
                <Slide direction="left">
                <Input
                type="text"
                name="qty"
                placeholder="Enter quantity"
                value={values.qty}
                onChange={handleChange}
              ></Input>
             
                </Slide>
              </Col>
              <Col lg={12} md={12} sm={24} xs={24}>
                <Slide direction="right">
                  <Button >Start Minting</Button> 
                </Slide>
              </Col>
            </Row> 
            </div>
            {process.env.REACT_APP_PROMO && !process.env.REACT_APP_PROMO_CODE?( <div className="mint-form promo-container">
             <Slide direction="up">
            <Input
              type="text"
              name="promo"
              placeholder="Enter promo"
              value={values.promo}
              onChange={handleChange}
            ></Input>
            </Slide>
            </div>):(<div className="mint-form promo-container">
            </div>)}
            
              <ValidationType type="qty" />
          </p>
        : <Button>Sold Out</Button>}
        <Row justify="space-between" align="middle">
        </Row>
       </FormGroup>
       </div>
      )
    } else {
      mintComponent = ( <div>
        <Button name="submit" onClick={() => connectWallet()}>Connect Wallet
        </Button>
        <div> 
          <br/>
          Make sure to connect to Polygon Mainnet
          </div>
      </div>)
    }
    return mintComponent
  }

  
  const Progressbar = ({progress, max, height}: ProgressbarProps) => {
     
    const Parentdiv = {
        height: '10px',
        maxWidth: '100%',
        backgroundColor: '#ffffff66',
        borderRadius: 100
      }
      
      const Childdiv = {
        height: '100%',
        maxWidth: '100%',
        width: `${progress*100/max}%`,
        backgroundColor:'#ff000099',
        borderRadius:40,
        textAlign: "right" as const,
      }
      
      const progresstext = {
        padding: 10,
        color: 'white',
        fontWeight: 100
      }
      
   const text =  `${availableToken}`

    return (
      <div>
      <span style={progresstext}> {text} Available</span>
      <div style={Parentdiv}>
      <div style={Childdiv}>
      </div>
    </div>
    </div>
    )
}

const getTimer = () =>{
  const secondsLeft = (saleTime-currentTime)/1000;
  const seconds =(secondsLeft)%60;
  const mins = ((secondsLeft - seconds)/60)%60;
  const hours = ((secondsLeft - seconds -(mins*60))/(60*60))%24;
  const days = ((secondsLeft - seconds -(mins*60)- (hours*60*60))/(60*60*24));
  const saleCountdown = (
    <div className="timer">
      <Row justify="space-between" align="middle">
        <Col className="value-container">
          <p className="value">{days} </p><p className="label">Days</p>
         </Col>
        <Col className="value-container">
          <p className="value">{hours}</p><p className="label">Hours</p>
        </Col>
        <Col className="value-container">
          <p className="value">{mins}</p><p className="label">Minutes</p>
        </Col>
        <Col className="value-container">
          <p className="value">{Math.floor(seconds)}</p><p className="label">Seconds</p>
         </Col>
      </Row>
          <div className="sale-label">{(new Date(saleTime)).toUTCString()} </div>
    </div>
  )
  return saleCountdown;
}

const getMintNFTComponent= () => (
  <div className="mint-container">
         <p>
          {/* { <img src="img/stackpack.png" width="200px"/> } */}
          </p>
          
          {
          (saleTime>currentTime)? 
            ( enableCountdown?
              (<div className="sale-timer "> <span className="sale-label" >Presale starts in </span><br/>{getTimer()}</div>) 
              :
              (<div className="sale-label">
              <span className="attention">Coming Soon!</span>
              <p>Minting date to be announced</p>
              </div>
              )
            )
            : 
            (
            <div className="mint-section">
              <p>
              <Progressbar progress={maxToken-availableToken} max={maxToken} height={30} />
              </p>
              {mintComponent()}
              </div>
           )  
           }
          
  </div>
)


  return (
    <Container>
    <BlockUi tag="div" blocking={blocking}>
      <ScrollToTop />
      <ContentBlock
        type="right"
        title="Savage Werewolf"
        bold={true}
        content={getMintNFTComponent()}
        // button={[
        //   {
        //     "title": "Links",
        //     "scrollTo": "links"
        //   }
        //   ,
        //   {
        //     "title": "Mint",
        //     "scrollTo": "mint"
        //   }
        // ]}
        icon="logo.png"
        id="intro"
      />
      
      <MiddleBlock
        title="Featured Werewolves"
        content={featuredGallery}
        button=""
        scrollTo="mint"
        id = "featured"
      />
      

      <ContentBlock
        type="left"
        title= "What is Savage Werewolf?"
        content= "Savage Werewolf is a collection of 10,000 randomly generated, assembled from over hundreds of hand-drawn traits. All werewolves are unique and have their own characteristics and expressions."
        section={[]}
        icon="wolfpacks.png"
        id="about"
      />

      <ContentBlock
        type="right"
        title= "Drops Rarity"
        content= "The rarity of each werewolf can be identified by their skin color.The type of skin ranges from common plain colors to mix color or even epic premium skin such as gold and diamond 💎✨"
        section={[]}
        icon="rarity_1.png"
        id="rarity"
      />

      <ContentBlock
        type="left"
        title= "100 Unique Drawings"
        content= "We will be dropping unqiue drawings of werewolf through Instagram, Twitter or giveaways. So, follow us and keep a look out!"
        section={[]}
        icon="unique_drawings_1.png"
        id="unqiue"
      />
      
      {/* <MiddleBlock
        title="Be part of our Society"
        content={getMintNFTComponent()}
        button=""
        scrollTo=""
        id = "mint"
      /> */}
      
      
      <MiddleBlock
        title="Our Road Map"
        content={""}
        button=""
        scrollTo=""
        id = "roadmap"
      />

      {roadMap}

      <Links></Links>
     </BlockUi>
    </Container>
  );
};

export default Home;
