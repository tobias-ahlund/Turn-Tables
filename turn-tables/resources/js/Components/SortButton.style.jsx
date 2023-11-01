import styled from "styled-components"; 
import { useState } from "react";
import ArrowDown from '@/public/images/ArrowDown.svg';

const SortButtonWrapper = styled.div`
    background-color: #EEE;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 50px;
    cursor: pointer;
    width: 5rem;
    margin-bottom: 1rem;
    position: relative;
    padding: 0.5rem 1rem;
    max-height: 32px;
    gap: .2rem;

    img {
        width: 1rem;
        height: 1rem;
        transform: rotate(${props => props.open ? "180deg" : "0"});
    }
`;

const SortButtonButton = styled.button`
    font-size: 0.75rem;
    font-weight: bold;
    line-height: 100%;
`;

const SortButtonDropdown = styled.div`
    position: absolute;
    background-color: white;
    border: 1px solid lightgray;
    padding: 1.5rem;
    bottom: -.2rem;
    left: 0;
    transform: translate(0, 100%);
    z-index: 10;
    border-radius: .75rem;
    cursor: default;
`;

const SortButtonDropdownUl = styled.ul`
    white-space: nowrap;
`;

const SortButtonDropdownLi = styled.li`
    margin-bottom: 1rem;
    font-size: 1rem;
    font-weight: bold;
    cursor: pointer;

    &:last-of-type {
        margin: 0;
    }
`;

export default function SortButton({ handleSortPriceAsc, handleSortAlphabetical }) {
    const [open, setOpen] = useState(false);

    function handleClick() {
        setOpen(!open);
    }

    return (
        <SortButtonWrapper open={open} onClick={handleClick}>
            <SortButtonButton>
                Sort
            </SortButtonButton>
            <img src={ArrowDown} alt="arrow down" />
            {open && <SortButtonDropdown>
                <SortButtonDropdownUl>
                    <SortButtonDropdownLi>
                        <button onClick={() => {
                            handleSortPriceAsc();
                            setOpen(false)
                        }}>Price: low to high</button>
                    </SortButtonDropdownLi>
                    <SortButtonDropdownLi>
                        <button onClick={() => {
                            handleSortAlphabetical(); 
                            setOpen(false)
                        }}>Name</button>
                    </SortButtonDropdownLi>
                </SortButtonDropdownUl>
            </SortButtonDropdown>}
        </SortButtonWrapper>
    );
}