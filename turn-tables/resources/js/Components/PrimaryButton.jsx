import styled from 'styled-components';

const Button = styled.button`
    background-color: #2d6fa5;
	border-radius: 50px;
	padding: 1rem 1rem;
	line-height: 100%;
	color: white;
    font-weight: bold;
`

export default function PrimaryButton({ disabled, children, ...props }) {
    return (
        <Button
            {...props}
            disabled={disabled}
        >
            {children}
        </Button>
    );
}
