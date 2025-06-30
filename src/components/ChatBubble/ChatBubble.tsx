import styles from './ChatBubble.module.css';

type Props = {
  message: string;
  sender: 'user' | 'bot';
};

export function ChatBubble({ message, sender }: Props) {
  return (
    <div className={sender === 'user' ? styles.userBubble : styles.botBubble} data-color="support">
      {message}
    </div>
  );
}
