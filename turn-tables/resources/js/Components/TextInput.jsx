import styled from 'styled-components';
import { forwardRef, useEffect, useRef } from 'react';

const Input = styled.input`
    border: none;
    border-bottom: 1px solid black;
    width: 100%;
    &:focus{
        box-shadow: none;
        border-bottom: 1px solid blue;
    }
`;

export default forwardRef(function TextInput({ type = 'text', isFocused = false, ...props }, ref) {
    const input = ref ? ref  : useRef();

    useEffect(() => {
        if (isFocused) {
            input.current.focus();
        }
    }, []);

    return (
        <Input
            {...props}
            type={type}
            ref={input}
        />
    );
});
