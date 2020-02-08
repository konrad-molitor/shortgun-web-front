import React, {FunctionComponent, useState} from 'react';
import styled from 'styled-components';

type CreateShortcutProps = {
    token: string;
};

const StyledWrapper = styled.div`
    display: flex;
    flex-direction: column;
    max-width: 50%;
    background: ${props => props.theme.semantics.success};
    font-size: ${props => props.theme.defaults.fontSize};
    padding: ${props => props.theme.defaults.fontSize};
    border-radius: 5px;

    > h1 {
        text-align: center;
        color: ${props => props.theme.colors.dark};
    }

    @media only screen and (max-width: 768px){
        max-width: 100%;
        border-radius: 5px;
        margin: 1rem;
    }
`;

const StyledError = styled.div`
    font-size: ${props => props.theme.defaults.fontSize};
    background: ${props => props.theme.semantics.danger};
    color: ${props => props.theme.colors.light};
    border-radius: 5px;
    text-align: center;
    padding: 1rem;
`;


const StyledInput = styled.input`
    font-size: ${props => props.theme.defaults.fontSize};
    background-color: ${props => props.theme.colors.light};
    color: ${props => props.theme.colors.dark};
    border: 1px solid ${props => props.theme.colors.main};
    padding: 1rem;
    border-radius: 5px;
    margin-top: 1rem;

    &:focus {
        outline: none;
    }
`;

const StyledButton = styled.button`
    background: ${props => props.theme.colors.dark};
    color: ${props => props.theme.colors.main};
    font-weight: bold;
    font-size: ${props => props.theme.defaults.fontSize};
    padding: 1rem;
    border: 1px solid ${props => props.theme.colors.dark};
    border-radius: 5px;
    margin-top: 1rem;
    text-transform: uppercase;
`;

const LinkItem = styled(StyledInput)`
    background-color: ${props => props.theme.semantics.success};
`;

const CreateShortcut:FunctionComponent<CreateShortcutProps> = (props: CreateShortcutProps) => {
    const [longUrl, setLongUrl] = useState('');
    const [error, setError] = useState('');
    const [returned, setReturned] = useState('');

    const handleShortcut = async () => {
        try {
            const result = await fetch('/a/add', {
                method: 'POST',
                headers: {
                    'X-Auth': `Bearer: ${props.token}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    longUrl: longUrl
                })
            });
            if (!result.ok) {
                throw new Error(result.status.toString());
            } else {
                setLongUrl('');
                const saved = await result.json();
                setReturned(`${window.location.origin}/s/${saved.shortUrl}`);
            }
        } catch (e) {
            if (e.message === '401') setError('Authorization problem occured. Please, try to logout and login again.');
            else if (e.message === '500') setError('Server error occured. Please try again later.');
            else setError('Unknown error occured. Please check your connection.');
        }
    };

    return (
        <StyledWrapper>
            <h1>Add new shortcut</h1>
            {error ? <StyledError>{error}</StyledError> : ''}
            <StyledInput type="text" value={longUrl} onChange={(e:any) => setLongUrl(e.target.value)}/>
            <StyledButton onClick={() => handleShortcut()}>Create</StyledButton>
            {returned ? <LinkItem value={returned} disabled/> : ''}
            {returned ? <StyledButton onClick={() => navigator.clipboard.writeText(returned)}>Copy</StyledButton> : ''}
        </StyledWrapper>
    )
}

export default CreateShortcut;