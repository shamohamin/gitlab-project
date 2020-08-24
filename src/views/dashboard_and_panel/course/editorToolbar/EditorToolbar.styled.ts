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
  position: relative;

  input {
    z-index: 1000;
    padding: 6px;
    outline: none;
    width: 100%;
    display: block;
    border: none;
    background-color: #e6e6e6;
  }

  .link-wrapper button {
    outline: none;
    padding: 4px;
    margin-top: 6px;
    border: none;
    cursor: pointer;
    background-color: #d33f8d;
    box-shadow: rgba(0, 0, 0, 0.24) 0px 2px 10px -3px,
      rgba(0, 0, 0, 0.24) 0px 2px 10px -3px;
    color: #fff;
    min-width: 100px;
    font-weight: bold;
  }

  .link-wrapper {
    height: fit-content;
    background-color: #fff;
    position: absolute;
    left: 130px;
    top: 55px;
    display: flex;
    justify-content: center;
    flex-direction: column;
    align-items: center;
    padding: 5px;
    min-width: 300px;
    box-shadow: rgba(0, 0, 0, 0.24) 0px 2px 2px 0px,
      rgba(0, 0, 0, 0.24) 0px 0px 1px 0px;
    z-index: 1000;
  }

  div:not(.link-wrapper) {
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
    position: relative;

    span {
      color: white;
      transition: all 250ms ease-in;
    }
    ::before,
    ::after {
      transition: all 250ms ease-in;
      position: 0px;
      top: 0px;
    }

    :hover {
      background-color: #ffffff;
      span {
        color: black;
      }
      ::after {
        content: attr(data-hidden);
        position: absolute;
        background-color: black;
        top: -51px;
        min-width: 100px;
        min-height: 40px;
        display: flex;
        justify-content: center;
        align-items: center;
        color: white;
        border-radius: 5px;
        z-index: 1000;
        font-weight: 600;
        padding: 2px;
      }
      ::before {
        content: "";
        position: absolute;
        top: -12px;
        width: 10px;
        height: 10px;
        background-color: black;
        transform: rotate(45deg);
      }
    }
  }
`;
