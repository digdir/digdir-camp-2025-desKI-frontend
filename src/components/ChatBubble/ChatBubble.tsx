import { useState } from 'react';
import styles from './ChatBubble.module.css';

type Props = {
  message: string;
  sender: 'user' | 'bot';
  imageUrls?: string[];
};

/**
 * Renders a single chat bubble styled according to the sender (user or bot),
 * including optional images. Images are displayed first and can be opened in full screen.
 *
 * @param message - The text content of the message.
 * @param sender - Who sent the message ('user' or 'bot').
 * @param imageUrls - Optional list of image URLs to show in the bubble.
 */
export function ChatBubble({ message, sender, imageUrls }: Props) {
  const [fullscreenImage, setFullscreenImage] = useState<string | null>(null);

  function openImageFullscreen(url: string) {
    setFullscreenImage(url);
  }

  function closeFullscreen() {
    setFullscreenImage(null);
  }

  return (
    <>
      <div
        className={`${styles.bubbleWrapper} ${
          sender === 'user' ? styles.alignRight : styles.alignLeft
        }`}
      >
        {Array.isArray(imageUrls) && imageUrls.length > 0 && (
          <div className={styles.imageGrid}>
            {imageUrls.map((url, index) => (
              <a
                key={index}
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  openImageFullscreen(url);
                }}
                rel="noopener noreferrer"
              >
                <img
                  src={url}
                  alt={`Bilde ${index + 1}`}
                  className={styles.chatImage}
                />
              </a>
            ))}
          </div>
        )}

        {message.trim() !== '' && (
          <div
            className={sender === 'user' ? styles.userBubble : styles.botBubble}
            data-color="support"
          >
            <p>{message}</p>
          </div>
        )}
      </div>

      {fullscreenImage && (
        <div className={styles.fullscreenOverlay}>
          <button
            className={styles.closeButton}
            onClick={closeFullscreen}
            aria-label="Lukk bilde"
          >
            ✕
          </button>
          <img
            src={fullscreenImage}
            className={styles.fullscreenImage}
            alt="Fullskjerm bilde"
          />
        </div>
      )}
    </>
  );
}
