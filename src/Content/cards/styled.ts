import styled from "styled-components";

export const Card = styled.div`
    width: 95%;
    max-width: 400px;
    padding: 0px 20px;
    text-align: center;
    margin: 0 auto;
`;

export const Divider = styled.hr`
    border: none;
`;

export const Title = styled.h2`
    font-size: 30px;
    color: #f0eae3; /* marfil */
    font-weight: 600;
    letter-spacing: 1px;
    margin: 0;
`;

export const Ribbon = styled.div`
    display: inline-block;
    position: relative;
    background-color: #7a8b7f;
    color: white;
    font-size: 28px;
    font-family: "Satisfy";
    padding: 12px 40px;
    text-align: center;
    clip-path: polygon(
        15px 0%, 
        calc(100% - 15px) 0%, 
        100% 50%, 
        calc(100% - 15px) 100%, 
        15px 100%, 
        0% 50%
    );
`;

export const SubTitle = styled.h2`
    font-size: 25px;
    font-weight: 600;
    letter-spacing: 1px;
    margin: 0;
`;

export const Info = styled.div`
    margin: 12px 0;
`;

export const Label = styled.span`
    display: block;
    font-weight: bold;
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
    font-size: 20px !important;
    font-family: 'Lora', serif;

    &:hover {
        background-color: #a78564;
    }
`;
