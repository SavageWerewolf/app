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
            <NavLink to="#">
            <Title>{t("Quick Links")}</Title>
              <Large to="#" left="true">
                <a onClick={()=>scrollToLocation("featured")}>
                  {t("Featured")}
                </a>
              </Large>
              <Large left="true" to="#">
                <a onClick={()=>scrollToLocation("about")}>
                  {t("About Savage Werewolf Society")}
                </a>
              </Large>
              <Large left="true" to="#">
                <a onClick={()=>scrollToLocation("mint")}>
                {t("Mint NFT")}
                </a>
              </Large>
              <Large left="true" to="#">
                <a onClick={()=>scrollToLocation("roadmap")}>
                {t("Road Map")}
                </a>
              </Large>
            </NavLink>
            <FooterContainer>
            </FooterContainer>
            <SocialLink
                href=""
                src="socialmedia/discord.png"
              />
              <SocialLink
                href="https://twitter.com/sws_werewolf"
                src="socialmedia/twitter.png"
              />
              <SocialLink
                href="https://www.instagram.com/savagewerewolfsociety"
                src="socialmedia/instagram.png"
              />
          </Row>
        </Container>
      </FooterSection>
    </>
  );
};

export default withTranslation()(Footer);
