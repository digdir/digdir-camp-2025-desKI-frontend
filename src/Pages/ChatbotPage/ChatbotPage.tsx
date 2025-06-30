import { Button, Dropdown, Input } from '@digdir/designsystemet-react';
import {
  ChevronDownIcon,
  ChevronUpIcon,
  PaperplaneIcon,
} from '@navikt/aksel-icons';
import { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { logoLight } from '~/assets';
import { Chats } from '~/components/Chats/Chats';
import { solutions } from '~/data/solutions';
import styles from './ChatbotPage.module.css';

type Message = {
  sender: 'user' | 'bot';
  text: string;
};

export function ChatbotPage() {
  const [open, setOpen] = useState(false);
  const [searchParams] = useSearchParams();

  const messages: Message[] = [
    { sender: 'user', text: 'I cannot log in to Ansattporten, I have tried a hundred times and it is not working. Please help me very soon.' },
    { sender: 'bot', text: 'Your supervisor needs to give you access' },
    { sender: 'user', text: 'How do I do that?' },
    { sender: 'bot', text: 'You have to ask your supervisor' },
    { sender: 'user', text: 'How do I do that?' },
    { sender: 'bot', text: "I'm sorry, but I cannot help you with that." },
  ];
  return (
    <div className={styles.mainContainer}>
      <div className={styles.headerContainer}>
        <img src={logoLight} className={styles.logo} alt="desKI logo" />
        <Dropdown.TriggerContext>
          <Dropdown.Trigger
            className={styles.dropdownTrigger}
            onClick={() => setOpen(!open)}
          >
            {/* TODO: Add context */}
            {searchParams.get('solution') || 'Select a solution'}
            {open ? (
              <ChevronDownIcon aria-hidden />
            ) : (
              <ChevronUpIcon aria-hidden />
            )}
          </Dropdown.Trigger>
          <Dropdown open={open} onClose={() => setOpen(false)}>
            <Dropdown.List>
              {solutions.map((solution) => (
                <Dropdown.Button
                  key={solution}
                  className={styles.dropdownButton}
                >
                  {solution}
                </Dropdown.Button>
              ))}
            </Dropdown.List>
          </Dropdown>
        </Dropdown.TriggerContext>
      </div>
      <div className={styles.chatContainer}>
        <div className={styles.messagesContainer}>
          <Chats messages={messages} />
        </div>
        <div className={styles.sendContainer}>
          <Input placeholder="Spør et spørsmål" className={styles.input} />
          <Button className={styles.sendButton} variant="primary">
            <PaperplaneIcon />
          </Button>
        </div>
      </div>
    </div>
  );
}
