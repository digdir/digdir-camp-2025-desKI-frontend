import { useTranslation } from 'react-i18next';
import { KEY } from '~/i18n/constants';
import styles from './ChatBubble.module.css';

type Props = {
  message: string;
  sender: 'user' | 'bot';
  imageUrls?: string[];
  onImageClick?: (url: string) => void;
};

/**
 * Renders a single chat bubble styled according to the sender (user or bot),
 * including optional images. Images are displayed first and can be opened in full screen.
 *
 * @param message - The text content of the message.
 * @param sender - Who sent the message ('user' or 'bot').
 * @param imageUrls - Optional list of image URLs to show in the bubble.
 * @param onImageClick - Optional Callback to handle image click events, allowing images to be displayed in full screen.
 */
export function ChatBubble({
  message,
  sender,
  imageUrls,
  onImageClick,
}: Props) {
  const { t } = useTranslation();

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
              <button
                key={index}
                type="button"
                onClick={(e) => {
                  e.preventDefault();
                  onImageClick?.(url);
                }}
                className={styles.unstyledButton}
                aria-label={t(KEY.display_image_fullscreen)}
              >
                <img
                  src={url}
                  alt={`Bilde ${index + 1}`}
                  className={styles.chatImage}
                />
              </button>
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
    </>
  );
}
