import styled from 'styled-components';

const Button = styled.button`
    background-color: #e53e3e; /* Red-600 */
	border-radius: 50px;
	padding: 1rem 1rem;
	line-height: 100%;
	color: white;
    font-weight: bold;
`

export default function DangerButton({ disabled, children, ...props }) {
    return (
        <Button
            {...props}
            disabled={disabled}
        >
            {children}
        </Button>
    );
}
