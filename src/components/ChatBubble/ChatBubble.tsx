import styles from './ChatBubble.module.css';

type Props = {
  message: string;
  sender: 'user' | 'bot';
};

/**
 * Renders a single chat bubble styled according to the sender (user or bot).
 *
 * @param message - The text content of the message.
 * @param sender - Who sent the message ('user' or 'bot').
 */
export function ChatBubble({ message, sender }: Props) {
  return (
    <div
      className={sender === 'user' ? styles.userBubble : styles.botBubble}
      data-color="support"
    >
      {message}
    </div>
  );
}
