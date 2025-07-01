import styled from "styled-components";

export const Card = styled.div`
    width: 90%;
    max-width: 400px;
    background-color: #1f2c4d; /* azul metalizado oscuro */
    border-radius: 20px;
    padding: 24px 20px;
    text-align: center;
    box-shadow: 0 8px 18px rgba(0, 0, 0, 0.1);
    margin: 0 auto;
`;

export const IconWrapper = styled.div`
    margin-bottom: 20px;
`;

export const Divider = styled.hr`
    border: none;
    border-top: 1px solid #b99d79;
    margin: 20px 0;
`;

export const Title = styled.h2`
    font-size: 30px;
    color: #f0eae3; /* marfil */
    font-weight: 600;
    letter-spacing: 1px;
    margin: 0;
`;

export const SubTitle = styled.h2`
    font-size: 25px;
    color: #f0eae3; /* marfil */
    font-weight: 600;
    letter-spacing: 1px;
    margin: 0;
`;

export const Info = styled.div`
    font-size: 18px;
    margin: 12px 0;
    color: #f0eae3;
`;

export const Label = styled.span`
    display: block;
    font-weight: bold;
    color: #d6c6b8; /* perlado claro */
`;

export const Button = styled.button`
    margin-top: 24px;
    background-color: #b99d79;
    color: white;
    border: none;
    padding: 12px 24px;
    border-radius: 8px;
    cursor: pointer;
    transition: background-color 0.3s;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);

    &:hover {
        background-color: #a78564;
    }
`;
