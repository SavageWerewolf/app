import { Button } from "../../common/Button";
import { lazy } from "react";
import { Row, Col } from "antd";

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
        title="Get In Touch"
        content={
          (
          <div>
            
            <img className="profilePic" src="img/stackpack.jpg"/><br/>
          <Button name="instagram-btn"  onClick={() =>  openNewWindow("https://www.instagram.com/Stackpack/")}>Stack Pack
          </Button>
          <Row align="middle">
            <div>
                <Button name="discord-btn" onClick={() =>  openNewWindow("https://discord.gg/vFrTPBBr88")}>Discord
                </Button>
                <Button name="twitter-btn" onClick={() =>  openNewWindow("https://twitter.com/sws_werewolf")}>Twitter
                </Button>
                <Button name="instagram-btn"  onClick={() =>  openNewWindow("https://www.instagram.com/savagewerewolf_nft")}>Instagram
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
