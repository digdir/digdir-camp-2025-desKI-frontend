import { useState } from 'react'
import './App.css'

import '@digdir/designsystemet-theme';
import '@digdir/designsystemet-css';

import { Textarea, Label, Divider, Paragraph, Button } from '@digdir/designsystemet-react';
import logo from './assets/logo.png';

function ChatUI() {
  const [value, setValue] = useState('');
  const [messages, setMessages] = useState<{ sender: 'user' | 'bot'; text: string }[]>([]);

  const handleSubmit = () => {
    if (!value.trim()) return;

    setMessages((prev) => [...prev, { sender: 'user', text: value }]);

    // Simulated bot response
    setTimeout(() => {
      setMessages((prev) => [...prev, { sender: 'bot', text: 'Dette er et automatisk svar fra desKI 🤖' }]);
    }, 500);

    // TODO: 
    // Erstatt dette med eit faktisk API-kall når du er klar
    // Under er eit eksempel på å sende ein POST-forespørsel i json-format med ein verdi: Message
    // Det må naturlegvis tilpassast til ditt API-endepunkt og datamodell.
    // Det er også laga enkel error-håndtering for å fange opp feil ved innsending.
    /*  
    try {
      const res = await fetch('https://ollama.sandkasse.ai', {  
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt: value }),
      });

      if (!res.ok) throw new Error('API error');  
      const data = await res.json();
      console.log('Success:', data);
    } catch (err) {
      console.error('Submission failed:', err);
    } 
    */

    setValue('');
  };
  return (
    <div className='chat-container'>
      <div className='chat-window'>
        {messages.map((msg, i) => (
          <div 
            className={msg.sender === 'user' ? 'message-user' : 'message-bot'}
            key={i}>
            {msg.text}
          </div>
        ))}
      </div>

      <Textarea value={value} onChange={(e) => setValue(e.target.value)} />
      <Button onClick={handleSubmit}>Send</Button>
    </div>
  );
}
function App() {

  return (
    <>
      <div>
        <img src={logo} className='logo' alt="desKI logo" style={{ width: '240px' }} />
      </div>
      <ChatUI />
    </>
  )
}

export default App
