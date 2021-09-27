import { createGlobalStyle } from "styled-components";

export const Styles = createGlobalStyle`

    @import "react-alice-carousel/lib/alice-carousel.css";

    @font-face {
      font-family: "Motiva Sans Light";
      src: url("fonts/Motiva-Sans-Light.ttf") format("truetype");
      font-style: normal;
  }

    @font-face {
        font-family: "Motiva Sans Bold";
        src: url("fonts/Motiva-Sans-Bold.ttf") format("truetype");
        font-style: normal;
    }

    @font-face {
        font-family: "why so serious";
        src: url("fonts/whysoserious.ttf") format("truetype");
        font-style: normal;
    }

    @font-face {
        font-family: "Howling Nightmare";
        src: url("fonts/Howling Nightmare.ttf") format("truetype");
        font-style: normal;
    }

    @font-face {
        font-family: "Feast of Flesh BB";
        src: url("fonts/feast-of-flesh-bb.regular.ttf") format("truetype");
        font-style: normal;
    }

    body,
    html,
    a
    {
        font-family: 'Motiva Sans Light', sans-serif;
    }


    body {
        background-image: url("img/bg.png");
        background-repeat: no-repeat;
        background-attachment: fixed;
        background-size: cover;
        margin:0;
        padding:0;
        border: 0;
        outline: 0;
        background-color: #000000;
        overflow-x: hidden;
    }

    a:hover {
        color: #18216d;
    }

    section  {
      margin: -5% 0px -10% 0px;
    }

    input,
    textarea {
        border-radius: 3px;
        background: #ffffff77;
        color: #ffffff;
        transition: all 0.3s ease-in-out;  
        outline: none;
        width: 185px;  
        padding: 0.48rem 0.44rem;
        border: 2px solid #edf3f5;
        border-radius: 100px;
        text-align: center;
        text-weight: 500;
        :focus-within {
            background: #ffffff;
            color: #000000;
            text-weight: 500;
            border: 2px solid #000000;
        }
        :hover {
            background: #ffffffff;
            color: #000000;
            text-weight: 500;
            border: 2px solid #000000;
        }
        margin-top: 10px
    }
    ::placeholder { /* Chrome, Firefox, Opera, Safari 10.1+ */
      color: #ffffff88;
      opacity: 1; /* Firefox */
    }
    
    :-ms-input-placeholder { /* Internet Explorer 10-11 */
      color: #ffffff88;
    }
    
    ::-ms-input-placeholder { /* Microsoft Edge */
      color: #ffffff88;
    }

    h1 {
        font-family: 'Feast of Flesh BB', serif;
        color: #dddddd;
        font-size: 80px;
        line-height: 1.1;

        
        text-shadow:
        5px -5px 1px #4026A8,
        5px -5px 1px #4026A8,
       -5px  5px 1px #4026A8,
       -5px -5px 1px #4026A8;
    }
    
    h2,
    h3,
    h4,
    h5, h6 {
        font-family: 'Feast of Flesh BB', serif;
        color: #dddddd;
        font-size: 50px;
        line-height: 1.18;

        @media only screen and (max-width: 890px) {
          font-size: 47px;
        }
      
        @media only screen and (max-width: 414px) {
          font-size: 32px;
        }
        text-shadow:
        2px -2px 1px #4026A8,
        2px -2px 1px #4026A8,
       -2px  2px 1px #4026A8,
       -2px -2px 1px #4026A8;
        
    }

    h3 {
        font-family: 'Howling Nightmare', serif;
        color: #dddddd;
        font-size: 25px;
        line-height: 1.18;

        @media only screen and (max-width: 890px) {
          font-size: 25px;
        }
      
        @media only screen and (max-width: 414px) {
          font-size: 25px;
        }
    }
    p,
    label {
        color: #ffffff;
        font-size: 21px;        
        line-height: 1.41;
    }


    a {
        text-decoration: none;
        outline: none;
        color: #2E186A;

        :hover {
            color: #2e186a;
        }
    }
    
    *:focus {
        outline: none;
    }

    .about-block-image svg {
        text-align: center;
    }

    .ant-drawer-body {
        display: flex;
        flex-direction: column;
        text-align: left;
        padding-top: 1.5rem;
    }

    .ant-drawer-content-wrapper {
        width: 300px !important;
    }

    .slideshow .images img{
       height:100%;
       width:200px;
       margin: 0 11px;
       border-radius: 10px;
    }

    #featured, #featured>div, #featured>div>div, #featured>div>div>div {
      width: 100%
    }

    .slideshow {
        height: 200px;
        position: relative;
        overflow: hidden;
      }

    .slideshow .images {
        position: absolute;
        left: -3328px;
        top: 0;
        height: 100%;
        width: 1000%;
        text-align: left;
        animation: slideshow 30s linear infinite;
      }
      
       @keyframes slideshow {
          0%    { left: 0px; }
         100%  { left: -3328px; }
       }
  
      /* loading style*/
      .block-ui-overlay {
          width: 100%;
          height: 100%;
          opacity: 0.5;
          filter: alpha(opacity=50);
          background-color: black;
      }
    
    *, *::before, *::after {
        box-sizing: border-box;
    }
        user agent stylesheet
        div {
            display: block;
        }
        .block-ui-container {
            position: absolute;
            z-index: 1010;
            top: 0;
            right: 0;
            bottom: 0;
            left: -50%;
            height: 100%;
            width: 200%;
            min-height: 2em;
            cursor: wait;
            overflow: hidden;
        }
      /* end loading style*/

      /********* mint form and promo code *********/

      .mint-form{
        width:100%;
      }
      .promo-container input {
        width:445px;
        min-width: 185px;
        
        @media only screen and (max-width: 750px) {
          width: 185px;
        }
      
      }
       /********* promo code *********/

      /********* Timer style********/
      .timer {
        width: 80%;
        margin: 20px auto 0px auto;
      }
      .timer .value-container{
        padding: 20px 0px 8px 0px;
        border: 2px solid #ffffffcc;
        border-radius: 10px;
        width: 23%;
      }
      .timer .value{
        font-size: 2rem;
        height: 20px;
      }
      .timer .label{
        font-size: 0.9rem
      }


      .mint-container .sale-label{
        padding: 20px 0px 8px 0px;
        font-size: 1.4em;
      }

      .attention{
        color: red;
        font-size: 1.4em;
      }
     /********* Timer End of style********/

     /********* roadmap timeline style********/

     /* The actual content */
     .roadmap{
       padding-bottom: 10px;
     }

     .roadmap .content {
       padding: 20px;
       margin: 20px 0px 50px 0px;
       background-color: #ffffff55;
       border-width: 2px;
       box-shadow: 10px 10px #ffffff33;
     }
     .roadmap .content p, {
       font-size: 1.3rem;
     }
     .roadmap .content h5{
       font-size: 1.7rem;
       
       text-shadow:
       2px -2px 1px #00000000,
       2px -2px 1px #00000000,
      -2px  2px 1px #00000000,
      -2px -2px 1px #00000000;
     }
      /* end of roadmap timeline style*/

      /* start of quicklink*/

      #links button{
        margin:10px;
      }

      /* end of quicklink*/
`;
