import { Row, Col } from "antd";
import { withTranslation } from "react-i18next";
import { SvgIcon } from "../../common/SvgIcon";
import Container from "../../common/Container";

import i18n from "i18next";
import {
  FooterSection,
  Title,
  NavLink,
  Extra,
  LogoContainer,
  Para,
  Large,
  Chat,
  Empty,
  FooterContainer,
  Language,
  Label,
  LanguageSwitch,
  LanguageSwitchContainer,
} from "./styles";

interface SocialLinkProps {
  href: string;
  src: string;
}


const Footer = ({ t }: any) => {
  const handleChange = (language: string) => {
    i18n.changeLanguage(language);
  };

  const scrollToLocation = (id: string) => {
    const element = document.getElementById(id) as HTMLDivElement;
    if(element){
      element.scrollIntoView({
        behavior: "smooth",
      });
    }
  };
  const SocialLink = ({ href, src }: SocialLinkProps) => {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        key={src}
        aria-label={src}
      >
        <SvgIcon src={src} width="25px" height="25px" />
      </a>
    );
  };

  return (
    <>
      <FooterSection>
        <Container>
        <Row
            justify="space-between"
          >
            <NavLink to="">
            <Title>{t("Links")}</Title>
              <Large to="#" left="true">
                <a onClick={()=>scrollToLocation("featured")}>
                  {t("Featured")}
                </a>
              </Large>
              <Large left="true" to="/">
                <a onClick={()=>scrollToLocation("featured")}>
                  {t("About Savage Werewolf Society")}
                </a>
              </Large>
              <Large left="true" to="/">
                <a onClick={()=>scrollToLocation("mint")}>
                {t("Mint NFT")}
                </a>
              </Large>
              <Large left="true" to="">
                <a onClick={()=>scrollToLocation("roadmap")}>
                {t("Road Map")}
                </a>
              </Large>
            </NavLink>
            <FooterContainer>
            </FooterContainer>
            <SocialLink
                href="https://github.com/Adrinlol/create-react-app-adrinlol"
                src="svg/github.svg"
              />
              <SocialLink
                href="https://twitter.com/Adrinlolx"
                src="svg/twitter.svg"
              />
              <SocialLink
                href="https://www.linkedin.com/in/lasha-kakabadze/"
                src="svg/linkedin.svg"
              />
              {/* <a href="https://www.buymeacoffee.com/adrinlol">
                <img
                  src="https://img.buymeacoffee.com/button-api/?text=Buy me a pizza&emoji=🍕&slug=adrinlol&button_colour=FF5F5F&font_colour=ffffff&font_family=Lato&outline_colour=000000&coffee_colour=FFDD00"
                  alt="Buy me a pizza"
                />
              </a> */}
          </Row>
        </Container>
      </FooterSection>
    </>
  );
};

export default withTranslation()(Footer);
