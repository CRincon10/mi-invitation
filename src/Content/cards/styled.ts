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
    display: block;
    position: relative;
    background-color: #7a8b7f;
    color: white;
    font-size: 28px;
    font-family: "Satisfy";
    padding: 12px 40px;
    text-align: center;
    width: 100%;
    margin: 0 auto;
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

interface ButtonProps {
    w100?: boolean;
}

export const Button = styled.button<ButtonProps>`
    margin-top: 24px;
    background-color: #b99d79;
    color: white;
    border: 2px solid rgba(255, 255, 255, 0.2);
    padding: 12px 24px;
    border-radius: 8px;
    width: ${(props) => (props.w100 ? "100%" : "auto")};
    cursor: pointer;
    transition: all 0.3s ease;
    box-shadow: 
        0 4px 12px rgba(0, 0, 0, 0.2),
        0 2px 6px rgba(0, 0, 0, 0.1),
        inset 0 1px 0 rgba(255, 255, 255, 0.2);
    font-size: 20px !important;
    font-family: 'Lora', serif;
    font-weight: 600;

    &:hover {
        background-color: #a78564;
        transform: translateY(-2px);
        box-shadow: 
            0 6px 16px rgba(0, 0, 0, 0.25),
            0 3px 8px rgba(0, 0, 0, 0.15),
            inset 0 1px 0 rgba(255, 255, 255, 0.3);
        border-color: rgba(255, 255, 255, 0.3);
    }

    &:active {
        transform: translateY(0);
        box-shadow: 
            0 2px 8px rgba(0, 0, 0, 0.2),
            inset 0 1px 0 rgba(255, 255, 255, 0.1);
    }

    &:disabled {
        background-color: #ccc;
        cursor: not-allowed;
        transform: none;
        box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
        border-color: rgba(255, 255, 255, 0.1);
    }
`;

export const ChecklistContainer = styled.div`
    text-align: left;
`;

export const ChecklistItem = styled.div`
    display: flex;
    align-items: flex-start;
    margin-bottom: 15px;
    padding: 12px;
    background-color: rgba(255, 255, 255, 0.1);
    border-radius: 8px;
    transition: all 0.3s ease;

    &:hover {
        background-color: rgba(255, 255, 255, 0.15);
    }
`;

export const HeartIcon = styled.span`
    font-size: 18px;
    margin-right: 12px;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #b99d79;
    margin-top: 8px;
`;

export const ChecklistText = styled.span`
    line-height: 1.5;
    font-weight: 400;
`;
