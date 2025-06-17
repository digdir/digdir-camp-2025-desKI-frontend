import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

import '@digdir/designsystemet-theme';
import '@digdir/designsystemet-css';

import { Textarea, Label, Divider, Paragraph, Button } from '@digdir/designsystemet-react';
import logo from './assets/logo.png';


function App() {

  return (
    <>
      <div>
        <img src={logo} alt="desKI logo" style={{ width: '240px' }} />
      </div>
      
      <div style={{ padding: '2rem', maxWidth: '600px', margin: '0 auto' }}>
        <ControlledTextarea id="controlled-textarea" value="Skriv spørsmålet ditt her" />
      </div>
    </>
  )
}

function ControlledTextarea({ id, value: initialValue = '' }: { id: string; value?: string }) {
  const [value, setValue] = useState(initialValue);

  const handleSubmit = async () => {
    console.log('User input:', value);
    setValue('');
    // TODO: 
    // Erstatt dette med eit faktisk API-kall når du er klar
    // Under er eit eksempel på å sende ein POST-forespørsel i json-format med ein verdi: Message
    // Det må naturlegvis tilpassast til ditt API-endepunkt og datamodell.
    // Det er også laga enkel error-håndtering for å fange opp feil ved innsending.
    /* 
    try {
      const res = await fetch('/api/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: value }),
      });

      if (!res.ok) throw new Error('API error');
      const data = await res.json();
      console.log('Success:', data);
    } catch (err) {
      console.error('Submission failed:', err);
    }
      */
  };

  return (
    <>
      <div style={{ marginTop: '2rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        <Label htmlFor={id}>Hei! Hva lurer du på?</Label>
        <Textarea
          id={id}
          onChange={(e) => setValue(e.target.value)}
          value={value}
        />
    

        <Button onClick={handleSubmit}>Still spørsmål</Button>
      </div>
    </>
  );
}


export default App
