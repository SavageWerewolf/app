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
      margin: -5% 0px -5% 0px;
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
        font-size: 90px;
        line-height: 1.1;

        background: -webkit-linear-gradient(#ffffffaa, #ffffff, #aaaaaa55);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;

        @media only screen and (max-width: 890px) {
          font-size: 59px;
        }
      
        @media only screen and (max-width: 414px) {
          font-size: 35px;
        }
    }
    
    h2,
    h3,
    h4,
    h5, h6 {
        font-family: 'Motiva Sans Bold', serif;
        color: #dddddd;
        font-size: 50px;
        line-height: 1.18;

        @media only screen and (max-width: 890px) {
          font-size: 47px;
        }
      
        @media only screen and (max-width: 414px) {
          font-size: 32px;
        }
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

      * {
      box-sizing: border-box;
    }
    
    
    /* The actual timeline (the vertical ruler) */
    .timeline {
      position: relative;
      max-width: 1200px;
      margin: 0 auto;
    }
    
    /* The actual timeline (the vertical ruler) */
    .timeline::after {
      content: '';
      position: absolute;
      width: 6px;
      background-color: #ffffffcc;
      top: 0;
      bottom: 0;
      left: 50%;
      margin-left: -3px;
    }
    
    /* Container around content */
    .container {
      padding: 6px 40px;
      position: relative;
      background-color: inherit;
      width: 50%;
    }
    
    /* The circles on the timeline */
    .container::after {
      content: '';
      position: absolute;
      width: 25px;
      height: 25px;
      right: -12px;
      background-color: #ffffff;
      border: 2px solid #ffffff;
      top: 15px;
      border-radius: 50%;
      z-index: 1;
    }
    
    /* Place the container to the left */
    .left {
      left: 0;
    }
    
    /* Place the container to the right */
    .right {
      left: 50%;
    }
    
    /* Add arrows to the left container (pointing right) */
    .left::before {
      content: " ";
      height: 0;
      position: absolute;
      top: 22px;
      width: 0;
      z-index: 1;
      right: 30px;
      border: medium solid #ffffffcc;
      border-width: 10px 0 10px 10px;
      border-color: transparent transparent transparent #ffffffcc;
    }
    
    /* Add arrows to the right container (pointing left) */
    .right::before {
      content: " ";
      height: 0;
      position: absolute;
      top: 22px;
      width: 0;
      z-index: 1;
      left: 30px;
      border: medium solid white;
      border-width: 10px 10px 10px 0;
      border-color: transparent white transparent transparent;
    }
    
    /* Fix the circle for containers on the right side */
    .right::after {
      left: -13px;
    }
    
    /* The actual content */
    .content {
      padding: 20px 30px;
      background-color: #00000000;
      border: 2px solid #ffffffcc;
      border-width: 2px;
      position: relative;
      border-radius: 15px;
    }
    .content p, {
      font-size: 1.3rem;
    }
    .content h5{
      font-size: 2rem;
    }

    /* Media queries - Responsive timeline on screens less than 600px wide */
    @media screen and (max-width: 600px) {
    /* Place the timelime to the left */
      .timeline::after {
        left: 31px;
      }
    
    /* Full-width containers */
      .container {
        width: 100%;
        padding-left: 70px;
        padding-right: 25px;
      }
    
    /* Make sure that all arrows are pointing leftwards */
      .container::before {
        left: 60px;
        border: medium solid white;
        border-width: 10px 10px 10px 0;
        border-color: transparent white transparent transparent;
      }
    
    /* Make sure all circles are at the same spot */
      .left::after, .right::after {
        left: 15px;
      }
    
    /* Make all right containers behave like the left ones */
      .right {
        left: 0%;
      }
    }
      /* end of roadmap timeline style*/
`;
