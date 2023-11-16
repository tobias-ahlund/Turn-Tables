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

const ClickConfirmed = styled.div`
    width: 1rem;
    height: 1rem;
    border-color: black;
    border-radius: 100px;
    border: ${props =>
    props.$confirmSort ? "6px solid black" : "1px solid black"};
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
    box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
`;

const SortButtonDropdownUl = styled.ul`
    white-space: nowrap;
`;

const SortButtonDropdownLi = styled.li`
    margin-bottom: 1rem;
    font-size: 1rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
    cursor: pointer;
    gap: 1rem;

    &:last-of-type {
        margin: 0;
    }
`;

export default function SortButton({ handleSort }) {
    const [open, setOpen] = useState(false);
    const [confirmSort, setConfirmSort] = useState("");

    function handleClick() {
        setOpen(!open);
    }

    function handleDropdownClick(e) {
        e.stopPropagation();
    }

    function handleConfirmSort(sortType) {
        setConfirmSort(sortType);
    }


    return (
        <SortButtonWrapper open={open} onClick={handleClick}>
            <SortButtonButton>
                Sort
            </SortButtonButton>
            <img src={ArrowDown} alt="arrow down" />
            {open && <SortButtonDropdown onClick={handleDropdownClick}>
                <SortButtonDropdownUl>
                    <SortButtonDropdownLi onClick={() => {
                            handleSort("priceAsc");
                            handleConfirmSort("priceAsc");
                        }}
                    >
                        <button>Price: Low to High</button>
                        <ClickConfirmed $confirmSort={confirmSort === "priceAsc"} />
                    </SortButtonDropdownLi>
                    <SortButtonDropdownLi onClick={() => {
                            handleSort("priceDesc");
                            handleConfirmSort("priceDesc");
                        }}
                    >
                        <button>Price: High to Low</button>
                        <ClickConfirmed $confirmSort={confirmSort === "priceDesc"} />
                    </SortButtonDropdownLi>
                    <SortButtonDropdownLi onClick={() => {
                            handleSort("alphabetical"); 
                            handleConfirmSort("alphabetical");
                        }}
                    >
                        <button>Name</button>
                        <ClickConfirmed $confirmSort={confirmSort === "alphabetical"} />
                    </SortButtonDropdownLi>
                </SortButtonDropdownUl>
            </SortButtonDropdown>}
        </SortButtonWrapper>
    );
}