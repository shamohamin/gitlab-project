import style from "styled-components";

type NavProps = {
  open: boolean;
};
export const StyledMenu = style.nav<NavProps>`
    display: flex;
    flex-direction: column;
    background: #FEFEFE;
    border: 1px solid #DDD;
    height: 100%;
    text-align: left;
    box-shadow: 1px 1px 5px 0px rgba(34, 36, 38, 0.15);
    transition: transform 0.3s ease-in-out;
    overflow-y: scroll;
    overflow-x: hidden;
    
    &:after {
      opacity: 0;
    }

    @media (max-width: 1000px) {
        width: 40%;
        position: fixed;
        top: 0px;
        left: 0px;
        transform: ${({ open }) =>
          open ? "translateX(0)" : "translateX(-100%)"};    
        box-shadow: ${({ open }) =>
          !open
            ? "1px 1px 5px 0px rgba(34, 36, 38, 0.15)"
            : "1px 0 99999px 0px black"} ;
        z-index: 1000;
        &:after {
          width: 100% !important;
          height: 100% !important;
          opacity: 1;
          position: fixed;
          left: 0px;
          top: 0px;
          background-color: rgba(0,0,0,.4);
        }
    }

    @media (max-width: 600px){
        width: 70%;
        position: absolute;
        top: 0px;
        left: 0px;
        transform: ${({ open }) =>
          open ? "translateX(0)" : "translateX(-100%)"};   
    }

    div {
        position: relative;
        width: 100%;
        display: block;
        border-bottom: 1px solid rgba(34,36,38,.1);
        :hover {
            background: rgba(0,0,0,.05);
        }

        :last-child {
            border: none;
        }

        span[class *= "fa"] {
            position: absolute;
            top: 22px;
            left: 14px;
        }
    }

    a {
        display: block;
        cursor: pointer;
        padding-top: 20px;
        padding-bottom: 20px;
        font-size: 16px;
        text-transform: uppercase;
        padding-left: 50px;
        font-weight: bold;
        padding-right: 15px;
        text-decoration: none;
        outline: none ;
        text-align: left;
        transition: color 0.3s linear;
        color: rgb(50, 50, 50);
        
        @media (max-width: 500px) {
          font-size: 14px;
        }

        &:hover {
          color: #343078;
        }
      }
`;
