import styled from "styled-components";

export const StyledButton = styled("button")<any>`

  background: ${(p) => p.color || "#00000000"};
  color: ${(p) => (p.color ? "#ffffff" : "#ffffff")};
  font-size: 1.3rem;
  font-weight: 300;
  width: 200px;
  border: 2px solid #ffffffaa;
  border-radius: 100px;
  padding: 5px 0;
  cursor: pointer;
  margin-top: 0.625rem;
  max-width: 180px;
  transition: all 0.4s ease-in-out;
  box-shadow: 0 16px 30px rgb(23 31 114 / 20%);

  &:hover,
  &:active,
  &:focus {
    color: #fff;
    border: 2px solid #000000;
    background-image: linear-gradient(260deg,  #751FC1 20%, #0D51BF  80%)
  }
`;
