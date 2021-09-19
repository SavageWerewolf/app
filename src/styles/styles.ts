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

    input,
    textarea {
        border-radius: 4px;
        background: #ffffff77;
        color: #ffffff;
        transition: all 0.3s ease-in-out;  
        outline: none;
        width: 190px;  
        padding: 0.53rem 0.5rem;
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
    h5,
    h6 {
        font-family: 'Howling Nightmare', serif;
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


      /* roadmap timeline style*/

      .timeline {
        position: relative;
        width: 100%;
        max-width: 1140px;
        margin: 0 auto;
        padding: 15px 0;
      }
      
      .timeline::after {
        content: '';
        position: absolute;
        width: 8px;
        background: #ffffff;
        border-radius: 40px;
        top: 0;
        bottom: 0;
        left: 50%;
        margin-left: -1px;
      }
      
      .timeline .container {
        padding: 15px 30px;
        position: relative;
        background: inherit;
        width: 50%;
      }
      
      .timeline .container.left {
        left: 0;
      }
      
      .timeline .container.right {
        left: 50%;
      }
      
      .timeline .container::after {
        content: '';
        position: absolute;
        width: 20px;
        height: 20px;
        top: calc(50% - 8px);
        right: -12px;
        background: #ffffff;
        border: 2px solid #ffffff;
        border-radius: 16px;
        z-index: 1;
      }
      
      .timeline .container.right::after {
        left: -7px;
      }
      
      .timeline .container::before {
        content: '';
        position: absolute;
        width: 23px;
        height: 2px;
        top: calc(50% - 1px);
        right: 8px;
        background: #ffffff;
        z-index: 1;
      }
      
      .timeline  .container.right::before {
        left: 8px;
      }
      
      .timeline .container .date {
        position: absolute;
        display: inline-block;
        top: calc(50% - 20px);
        text-align: center;
        font-size: 24px;
        font-weight: bold;
        color: #ffffff;
        text-transform: uppercase;
        letter-spacing: 1px;
        z-index: 1;
      }
      
      .timeline .container.left .date {
        right: -75px;
      }
      
      .timeline .container.right .date {
        left: -75px;
      }
      
      .timeline .container .icon {
        position: absolute;
        display: inline-block;
        width: 10px;
        height: 10px;
        padding: 9px 0;
        top: calc(50% - 20px);
        background: #00000000;
        border: 2px solid #ffffff;
        border-radius: 10px;
        text-align: center;
        font-size: 18px;
        color: #ffffff;
        z-index: 1;
      }
      
      .timeline .container.left .icon {
        right: 56px;
      }
      
      .timeline .container.right .icon {
        left: 56px;
      }
      
      .timeline .container .content {
        padding: 20px 20px 20px 20px;
        background: #00000000;
        position: relative;
        border-radius: 500px;
        border: 3px solid #ffffff;
      }
      
      .timeline .container.right .content {
        padding: 20px 20px 20px 20px;
        border-radius: 500px;
      }
      
      .timeline .container .content h2 {
        margin: 0 0 0 0;
        font-size: 20px;
        font-weight: normal;
        color: #ffffff;
        text-align: center;
      }
      
      .timeline .container .content p {
        margin: 0;
        font-size: 16px;
        line-height: 22px;
        color: #ffffff;
        text-align: center;
      }
      
      @media (max-width: 767.98px) {
        .timeline::after {
          left: 90px;
        }
      
        .timeline   .container {
          width: 100%;
          padding-left: 120px;
          padding-right: 30px;
        }
      
        .timeline  .container.right {
          left: 0%;
        }
      
        .timeline .container.left::after, 
        .timeline .container.right::after {
          left: 82px;
        }
      
        .timeline  .container.left::before,
        .timeline .container.right::before {
          left: 100px;
          border-color: transparent #ffffff transparent transparent;
        }
      
        .timeline .container.left .date,
        .timeline  .container.right .date {
          right: auto;
          left: 15px;
        }
      
        .timeline .container.left .icon,
        .timeline .container.right .icon {
          right: auto;
          left: 146px;
        }
      
        .timeline  .container.left .content,
        .timeline  .container.right .content {
          padding: 30px 30px 30px 90px;
          border-radius: 500px 0 0 500px;
        }
      }

      
      /* end of roadmap timeline style*/
`;
