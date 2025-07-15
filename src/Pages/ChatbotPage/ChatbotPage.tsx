import { Button, Dropdown, Input } from '@digdir/designsystemet-react';
import { ChevronDownIcon, PaperplaneIcon } from '@navikt/aksel-icons';
import { useEffect, useRef, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { logoLight } from '~/assets';
import { Chats } from '~/components/Chats/Chats';
import { solutions } from '~/data/solutions';
import styles from './ChatbotPage.module.css';

type Message = {
  sender: 'user' | 'bot';
  text: string;
};

/**
 * The main chatbot interface component.
 * Handles input, dropdown solution selection, chat message rendering, and auto-scrolling.
 */
export function ChatbotPage() {
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [searchParams] = useSearchParams();
  const [inputValue, setInputValue] = useState('');
  const [messages, setMessages] = useState<Message[]>([]);
  const bottomRef = useRef<HTMLDivElement | null>(null);

  const isFirstMessage = messages.length === 0;

  function handleSend() {
    if (!inputValue.trim()) return;

    const userMessage: Message = { sender: 'user', text: inputValue };
    setMessages((prev) => [...prev, userMessage]);
    setInputValue('');

    setLoading(true);

    // TODO: Replace with actual API call to desKI
    setTimeout(() => {
      const botReply: Message = {
        sender: 'bot',
        text: 'Dette er et eksempel på et svar fra desKI 🤖',
      };
      setMessages((prev) => [...prev, botReply]);
      setLoading(false);
    }, 1000);
  }

  // Scrolls to the latest message when the message list updates.
  // biome-ignore lint/correctness/useExhaustiveDependencies: Needed to scroll on message update
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  return (
    <div className={styles.mainContainer}>
      <div className={styles.headerContainer}>
        <Link to="/" className={styles.logoLink}>
          <img src={logoLight} className={styles.logo} alt="desKI logo" />
        </Link>
        <Dropdown.TriggerContext>
          <Dropdown.Trigger
            className={styles.dropdownTrigger}
            onClick={() => setOpen(!open)}
          >
            {searchParams.get('solution')}
            <ChevronDownIcon aria-hidden />
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
      <div
        className={`${styles.chatContainer} ${
          isFirstMessage ? styles.chatContainerCentered : ''
        }`}
      >
        <div className={styles.messagesContainer}>
          <Chats messages={messages} loading={loading} />
          <div ref={bottomRef} />
        </div>
        {isFirstMessage && (
          <h2 className={styles.introText}>Hva lurer du på?</h2>
        )}
        <div
          className={`${styles.sendContainer} ${
            !isFirstMessage ? styles.atBottom : ''
          }`}
        >
          <div className={styles.inputWrapper}>
            <Input
              placeholder="Spør et spørsmål"
              className={styles.input}
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            />
            <Button
              className={styles.sendButton}
              variant="primary"
              onClick={handleSend}
            >
              <PaperplaneIcon className={styles.paper} />
            </Button>
            <div className={styles.helperText}>
              Chatboten kan gjøre feil. Kontakt Dekkservice på{' '}
              <a href="mailto:kontakt@dekkservice.no">kontakt@dekkservice.no</a>{' '}
              hvis du trenger mer hjelp.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
