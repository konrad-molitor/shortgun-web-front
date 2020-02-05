import React from 'react';
import styled from 'styled-components';

type combinedInputProps = {
    textInput: {
        hint?: string;
        onChange?(e: any): void;
        disable?: boolean;
        backgroundColor?: string;
        textColor?: string;
        value?: string;
    },
    button: {
        label: string;
        onClick(e: any): void;
        backgroundColor?: string;
        textColor?: string;
    }
}

const StyledWrapper = styled.div`
    display: flex;
    flex-direction: row;
    margin: 0;
    padding: 0;
`;

const StyledTextInput = styled.input<{backgroundColor?: string, textColor?: string}>`
    flex-grow: 1;
    background: ${props => props.backgroundColor || props.theme.colors.light};
    border: 1px solid ${props => props.theme.colors.dark};
    border-top-left-radius: 5px;
    border-bottom-left-radius: 5px;
    margin-right: 0;
    font-size: ${props => props.theme.defaults.fontSize};
    padding: 5px;
    color: ${props => props.textColor || props.theme.colors.dark};

    &:focus {
        outline: none;
    }

    @media only screen and (max-width: 768px)
    {   
        font-size: ${props => props.theme.defaults.fontSize};
        padding: 2.5px;
        
        > * {
          margin: 2.5px;
        }
    }
`;

const StyledButton = styled.button<{backgroundColor?: string, textColor?: string}>`
    background: ${props => props.backgroundColor || "none"};
    border: 1px solid ${props => props.theme.colors.dark};
    border-top-right-radius: 5px;
    border-bottom-right-radius: 5px;
    margin-left: -1px;
    font-size: ${props => props.theme.defaults.fontSize};
    color: ${props => props.textColor || props.theme.colors.dark};

    @media only screen and (max-width: 768px)
    {   
        font-size: ${props => props.theme.defaults.fontSize};        
        
    }
`;

const combinedInput = (props: combinedInputProps) => {
    return(
        <StyledWrapper>
            <StyledTextInput 
                backgroundColor={props.textInput.backgroundColor} 
                textColor={props.textInput.textColor} 
                type="text" 
                placeholder={props.textInput.hint} 
                onInput={props.textInput.onChange} 
                disabled={props.textInput.disable}
                value={props.textInput.value}
            />
            <StyledButton 
                onClick={props.button.onClick}
                textColor={props.button.textColor}
                backgroundColor={props.button.backgroundColor}>
                {props.button.label}
            </StyledButton>
        </StyledWrapper>
    )
}

export default combinedInput;