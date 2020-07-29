import styled from "styled-components";

export const ToolbarContainer = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  flex-direction: row;
  flex-wrap: wrap;
  margin-bottom: 1px;
  padding: 5px;
  box-shadow: 0px 0px 10px -6px black;
  background: #ffffff;
  border-top-left-radius: 7px;
  border-top-right-radius: 7px;

  div {
    border-radius: 3px;
    background-color: #000000;
    color: white;
    transition: all 250ms ease-in;
    color: black;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-wrap: wrap;
    width: 40px;
    height: 40px;
    margin: 5px;
    cursor: pointer;
    box-shadow: 1px 0px 5px -1px black;

    span {
      color: white;
      transition: all 250ms ease-in;
    }

    :hover {
      background-color: #ffffff;
      span {
        color: black;
      }
    }
  }
`;
