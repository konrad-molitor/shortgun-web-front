import React, { useState, FormEvent } from 'react';
import styled from 'styled-components';

const StyledContactsWrapper = styled.div`
  background: ${props => props.theme.colors.light};
  border-radius: 5px;
  padding: 50px;
  display: flex;
  flex-direction: column;
  font-size: ${props => props.theme.defaults.fontSize};
  color: ${props => props.theme.colors.dark};
  width: 80%;

  > h1 {
    text-align: center;
  }

  > ul {
    display: flex;
    flex-direction: row;
    justify-content: space-evenly;
    align-items: stretch;
    list-style: none;

    > li > a {
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      margin-left: 5px;
      text-decoration: none;
      color: ${props => props.theme.colors.dark};
      font-weight: bold;
      > img {
        margin-right: 5px;
        height: 1.6rem;
      }
    }
  }

  > form {
    display: flex;
    flex-direction: column;

    > * {
      margin-top: 5px;
      margin-bottom: 5px;
    }

    > button {
      font-size: ${props => props.theme.defaults.fontSize};
      padding: 5px;
      background: ${props => props.theme.semantics.success};
      border: 1px solid ${props => props.theme.colors.dark};
      border-radius: 5px;
    }
  }
`;

const Contacts = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const sendMessage = async (e: FormEvent) => {
    e.preventDefault();
    setEmail('');
    setMessage('');
    let data = {
      email,
      message
    };
    await fetch(`/a/message/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
  }

  return (
    <StyledContactsWrapper>
      <h1>Feel free to contact me about Short.Gun!</h1>
      <p>I appreciate any feedback about this project. You can provide it using any of services provided below or using provided contact form.</p>
      <ul>
        <li><a href="https://t.me/kmolitor"><img src="telegram.svg" alt="Telegram Logo"/>Telegram</a></li>
        <li><a href="https://www.linkedin.com/in/%D0%B8%D1%81%D0%BC%D0%B0%D0%B8%D0%BB-%D0%B2%D0%B0%D0%BB%D0%B8%D0%B5%D0%B2-6ab150186/"><img src="linkedin.svg" alt="LinkedIn Logo"/>LinkedIn</a></li>
        <li><a href="https://github.com/konrad-molitor"><img src="github.svg" alt="GitHub Logo"/>GitHub</a></li>
      </ul>
      <form onSubmit={sendMessage}>
        <label>Email:</label>
        <input 
          value={email}
          type="email" 
          placeholder="Enter your email here" 
          onChange={(e) => setEmail(e.target.value)}/>
        <label>Your message:</label>
        <textarea 
        value={message}
        rows={10} 
        placeholder="What's your thoughts?.." 
        onChange={(e)=> setMessage(e.target.value)}/>
        <button type="submit">Send message</button>
      </form>
      
    </StyledContactsWrapper>
  )
}

export default Contacts;