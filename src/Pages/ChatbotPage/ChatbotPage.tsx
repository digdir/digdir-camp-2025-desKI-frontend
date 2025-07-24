import { Dropdown } from '@digdir/designsystemet-react';
import { ChevronDownIcon } from '@navikt/aksel-icons';
import { useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link, useSearchParams } from 'react-router-dom';
import { sendChatMessage } from '~/api/chatApi';
import { ChatInput } from '~/components/ChatInput/ChatInput';
import { Chats } from '~/components/Chats/Chats';
import { ImageUpload } from '~/components/ImageUpload/ImageUpload';
import { Logo } from '~/components/Logo/Logo';
import { KEY } from '~/i18n/constants';
import { sanitizeText } from '~/utils/sanitizeText';
import styles from './ChatbotPage.module.css';

type Message = {
  sender: 'user' | 'bot';
  text: string;
  imageUrls?: string[];
};

type ChatbotPageProps = {
  source: 'brukerstotte' | 'servicedesk';
};
/**
 * The main chatbot interface component.
 * Handles input, dropdown solution selection, chat message rendering, and auto-scrolling.
 * allows image uploads, and handles sending messages with or without images.
 */

export function ChatbotPage({ source }: ChatbotPageProps) {
  const { t } = useTranslation();
  const solutions = t(KEY.solutions_list, { returnObjects: true }) as string[];
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [searchParams] = useSearchParams();
  const [inputValue, setInputValue] = useState('');
  const [messages, setMessages] = useState<Message[]>([]);
  const [uploadedImages, setUploadedImages] = useState<string[]>([]);
  const [imageError, setImageError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const bottomRef = useRef<HTMLDivElement | null>(null);

  const isFirstMessage = messages.length === 0;

  async function handleSend() {
    if (!inputValue.trim() && uploadedImages.length === 0) return;

    const userMessage: Message = {
      sender: 'user',
      text: inputValue,
      imageUrls: uploadedImages.length > 0 ? uploadedImages : undefined,
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputValue('');
    setUploadedImages([]);
    setImageError(null);
    setLoading(true);

    // Sanitize message before sending to backend
    const sanitizedMessage = sanitizeText(inputValue);

    try {
      const response = await sendChatMessage({
        question: sanitizedMessage,
      });

      const botReply: Message = {
        sender: 'bot',
        text: response.answer,
      };

      setMessages((prev) => [...prev, botReply]);
    } catch (err) {
      console.error('Chatbot error:', err);
      setMessages((prev) => [
        ...prev,
        {
          sender: 'bot',
          text: t(KEY.api_connection_error),
        },
      ]);
    } finally {
      setLoading(false);
    }
  }

  function handleImageUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const files = Array.from(e.target.files || []);
    if (files.length === 0) return;

    const totalImages = uploadedImages.length + files.length;
    if (totalImages > 5) {
      setImageError('Du kan kun laste opp maks 5 bilder.');
      return;
    }

    const imageUrls = files.map((file) => URL.createObjectURL(file));
    setUploadedImages((prev) => [...prev, ...imageUrls]);
    setImageError(null);
  }

  function handleRemoveImage(index: number) {
    setUploadedImages((prev) => prev.filter((_, i) => i !== index));
  }

  // Scrolls to the latest message when the message list updates.
  // biome-ignore lint/correctness/useExhaustiveDependencies: Needed to scroll on message update
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  return (
    <div className={styles.mainContainer}>
      <div className={styles.headerContainer}>
        <Link
          to="/"
          className={styles.logoLink}
          aria-label={t(KEY.go_to_homepage)}
        >
          <Logo className={styles.logo} />
        </Link>
        {/* Stops dropdown menu from rendering if source is brukerstotte */}
        {source !== 'brukerstotte' && (
          <Dropdown.TriggerContext>
            <Dropdown.Trigger
              className={styles.dropdownTrigger}
              onClick={() => setOpen(!open)}
              aria-label={t(KEY.select_solution)}
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
        )}
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
          <h2 className={styles.introText}>{t(KEY.chatbot_welcome)}</h2>
        )}

        <div
          className={`${styles.sendContainer} ${
            !isFirstMessage ? styles.atBottom : ''
          }`}
        >
          <div className={styles.sendAreaWrapper}>
            <ImageUpload
              uploadedImages={uploadedImages}
              imageError={imageError}
              onImageUpload={handleImageUpload}
              onRemoveImage={handleRemoveImage}
              fileInputRef={fileInputRef}
            />

            <ChatInput
              inputValue={inputValue}
              onInputChange={setInputValue}
              onSend={handleSend}
              fileInputRef={fileInputRef}
            />
            <div className={styles.helperText}>
              Chatboten kan gjøre feil. Kontakt Service Desk på &nbsp;
              <a href="mailto:servicedesk@digdir.no">servicedesk@digdir.no</a>{' '}
              &nbsp; hvis du trenger mer hjelp.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
