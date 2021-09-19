import { Row, Col } from "antd";
import { withTranslation } from "react-i18next";
import { Slide } from "react-awesome-reveal";
import { Button } from "../../common/Button";
import { MiddleBlockSection, Content, ContentWrapper } from "./styles";

interface MiddleBlockProps {
  title: string;
  content: any;
  button: string;
  scrollTo: string;
  id: string;
  t: any;
}

const MiddleBlock = ({ title, content, button, scrollTo, id, t }: MiddleBlockProps) => {
  const scrollToLocation = (id: string) => {
    const element = document.getElementById(id) as HTMLDivElement;
    if(element){
      element.scrollIntoView({
        behavior: "smooth",
      });
    }
  };
  return (
    <MiddleBlockSection id={id}>
      <Slide direction="up">
        <Row justify="center" align="middle">
          <ContentWrapper>
            <Col lg={24} md={24} sm={24} xs={24}>
              <h6>{title}</h6>
              <Content>{content}</Content>
              {button && (
                <Button name="submit" onClick={() => scrollToLocation(scrollTo)}>
                  {button}
                </Button>
              )}
            </Col>
          </ContentWrapper>
        </Row>
      </Slide>
    </MiddleBlockSection>
  );
};

export default withTranslation()(MiddleBlock);
