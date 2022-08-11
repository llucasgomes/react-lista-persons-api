import styled from "styled-components";

export const Container = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;


`;

export const ImageUser = styled.div`
    width: 5.9rem;
    height: 5.9rem;
    border-radius: 50%;
    background: #27272a;
    display: flex;
    align-items: center;
    justify-content: center;

    img{
        width: 95%;
        height: 95%;
        border-radius: 50%;
        object-fit: cover;
    }

`;

export const InfoUserContainer = styled.div`
    p{
        margin: 1rem 0;
        font-size: 1rem;
        line-height: 1.6rem;
        color: var(--dark-600);
    }

`;