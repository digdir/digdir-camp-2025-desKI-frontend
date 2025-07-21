import { Button, Dropdown, Input, Tooltip } from '@digdir/designsystemet-react';
import { ChevronDownIcon, PaperplaneIcon } from '@navikt/aksel-icons';
import { useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link, useSearchParams } from 'react-router-dom';
import { CameraUploadButton } from '~/components/CameraButton/CameraButton';
import { Chats } from '~/components/Chats/Chats';
import { Logo } from '~/components/Logo/Logo';
import { KEY } from '~/i18n/constants';
import { sanitizeText } from '~/utils/sanitizeText';
import styles from './ChatbotPage.module.css';

type Message = {
  sender: 'user' | 'bot';
  text: string;
  imageUrls?: string[];
};
/**
 * The main chatbot interface component.
 * Handles input, dropdown solution selection, chat message rendering, and auto-scrolling.
 * allows image uploads, and handles sending messages with or without images.
 */

export function ChatbotPage() {
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
    if (!inputValue.trim()) return;

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

    // Send sanitized message to backend. TODO: Replace with actual API call to desKI

    try {
      await fetch('/api/save-message', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: sanitizedMessage,
          timestamp: new Date().toISOString(),
        }),
      });
    } catch (error) {
      console.error('Failed to save message:', error);
    }

    setTimeout(() => {
      const botReply: Message = {
        sender: 'bot',
        text: 'Dette er et eksempel på et svar fra desKI 🤖',
      };
      setMessages((prev) => [...prev, botReply]);
      setLoading(false);
    }, 1000);
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
        <Link to="/" className={styles.logoLink}>
          <Logo />
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
          <h2 className={styles.introText}>{t(KEY.chatbot_welcome)}</h2>
        )}

        <div
          className={`${styles.sendContainer} ${
            !isFirstMessage ? styles.atBottom : ''
          }`}
        >
          <div className={styles.sendAreaWrapper}>
            {uploadedImages.length > 0 && (
              <div className={styles.previewContainer}>
                {uploadedImages.map((url, index) => (
                  <div key={index} className={styles.imageWrapper}>
                    <img
                      src={url}
                      alt={`Bilde ${index + 1}`}
                      className={styles.imagePreview}
                    />
                    <button
                      className={styles.removeImageButton}
                      onClick={() => handleRemoveImage(index)}
                      aria-label={`Fjern bilde ${index + 1}`}
                      type="button"
                    >
                      ✖
                    </button>
                  </div>
                ))}
              </div>
            )}

            {imageError && <p className={styles.imageError}>{imageError}</p>}

            <div className={styles.inputWrapper}>
              <Input
                placeholder={t(KEY.chat_placeholder)}
                className={styles.input}
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSend()}
              />
              <input
                type="file"
                accept="image/*"
                multiple
                onChange={handleImageUpload}
                ref={fileInputRef}
                style={{ display: 'none' }}
              />
              <CameraUploadButton
                onClick={() => fileInputRef.current?.click()}
              />
              <Tooltip content={t(KEY.send_button)} placement="bottom">
                <Button
                  className={styles.sendButton}
                  variant="primary"
                  onClick={handleSend}
                >
                  <PaperplaneIcon className={styles.paper} />
                </Button>
              </Tooltip>
            </div>
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
