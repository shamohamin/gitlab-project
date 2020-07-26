import style from "styled-components";

type NavProps = {
  open: boolean;
};
export const StyledMenu = style.nav<NavProps>`
    dispaly: flex;
    width: 100%;
    flex-direction: column;
    flex-wrap: wrap;
    background: #FEFEFE;
    border: 1px solid #DDD;
    height: 100%;
    text-align: left;
    transition: transform 0.3s ease-in-out;

    @media (max-width: 1000px) {
        width: 35%;
        position: absolute;
        top: 0px;
        left: 0px;
        transform: ${({ open }) =>
          open ? "translateX(0)" : "translateX(-100%)"};    
    }

    @media (max-width: 500px){
        width: 65%;
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
