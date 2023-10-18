import styled from 'styled-components'

const StockStatusWrapper = styled.div`
    display: flex;
    align-items: center;
    & div {
        width: 0.5rem;
        height: 0.5rem;
        border-radius: 100px;
        background-color: #49cf3f;
        margin-right: 0.5rem;
    }
    color: gray;
`
function StockStatus() {
    return (
        <StockStatusWrapper>
                <div></div>
                <p>In stock</p>
        </StockStatusWrapper>
    );
}

export default StockStatus;