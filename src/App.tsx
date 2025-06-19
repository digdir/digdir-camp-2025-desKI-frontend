import { useState } from 'react';
import './App.css';

import { Textarea, Label, Divider, Button } from '@digdir/designsystemet-react';
import logo from './assets/logo.png';

function ChatUI() {
  const [value, setValue] = useState('');
  const [messages, setMessages] = useState<
    { sender: 'user' | 'bot'; text: string }[]
  >([]);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    if (!value.trim()) return;

    setMessages((prev) => [...prev, { sender: 'user', text: value }]);
    setLoading(true);
    // Simulate bot response after delay
    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        { sender: 'bot', text: 'Dette er et simulert svar fra desKI 🤖' },
      ]);
      setLoading(false);
    }, 700);
    // TODO:
    // Erstatt dette med eit faktisk API-kall når du er klar
    // Det må naturlegvis tilpassast til ditt API-endepunkt og datamodell.
    // Det er også laga enkel error-håndtering for å fange opp feil ved innsending.
    /* 
    try {
      const res = await fetch('https://ollama.sandkasse.ai/api/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          model: "llama3.3",
          prompt: value
        }),
      });

      setValue('');
      const data = await res.json();
      setMessages(m => [...m, { sender: 'bot', text: data.response || JSON.stringify(data) }]);
    } catch (err) {
      setMessages(m => [...m, { sender: 'bot', text: 'Feil: klarte ikke kontakte API.' }]);
      console.log('Error:', err);
    } finally {
      setLoading(false);
    } */
  };

  return (
    <div className="chat-container">
      <div className="chat-window">
        <Label>Samtalevindu</Label>
        {messages.map((msg, i) => (
          <div
            key={i}
            className={msg.sender === 'user' ? 'message-user' : 'message-bot'}
          >
            {msg.text}
          </div>
        ))}
      </div>
      <Divider />
      <Label>Send melding</Label>
      {loading && <div>Venter på svar...</div>}
      <Textarea value={value} onChange={(e) => setValue(e.target.value)} />
      <Button onClick={handleSubmit}>Send</Button>
    </div>
  );
}
function App() {
  return (
    <>
      <div>
        <img
          src={logo}
          className="logo"
          alt="desKI logo"
          style={{ width: '240px' }}
        />
      </div>
      <ChatUI />
    </>
  );
}

export default App;
