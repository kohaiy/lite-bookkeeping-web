import styled from 'styled-components';

export const Wrapper = styled.div`
    position: fixed;
    z-index: 9999;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: rgba(0, 0, 0, 0.2);
    transition: all 0.1s;
    &.hidden {
        opacity: 0;
        pointer-events: none;
    }
`;

export const Loading = styled.div`
    padding: 4px;
    font-size: 16px;
    border-radius: 50%;
    color: #fff;
    background-color: rgba(0, 0, 0, 0.4);
    animation: loading 1s linear infinite;

    @keyframes loading {
        0% {
            transform: rotate(0deg);
        }
        100% {
            transform: rotate(360deg);
        }
    }
`;
