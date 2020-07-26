import style from "styled-components";

type SpanProps = {
  current: boolean;
  is_first_anchor: boolean;
};

export const CustomSpanLink = style.span<SpanProps>`
    font-size: 13px;
    text-decoration: none;
    line-height: 1;
    position: relative;

    a {
        text-transform: capitalize;
        cursor: pointer;
        text-decoration: none;
        color: ${({ current }) => (current ? "#2e2e2e" : "#707070")} ; 
        font-weight: ${({ current }) => (current ? "900" : "400")};
        margin-left: ${({ is_first_anchor }) =>
          is_first_anchor ? "0px" : "4px"};
        
        :hover {
            border-bottom: 1px solid black;
        }
    }

    span {
        margin-left: 7px;
        margin-top: 0px;
        color: #707070; 
    }
`;
