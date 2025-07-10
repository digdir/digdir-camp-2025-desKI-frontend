import { ChatBubble } from '../ChatBubble/ChatBubble';
import { ChatLoader } from '../ChatLoader/ChatLoader';

type Message = {
  sender: 'user' | 'bot';
  text: string;
  imageUrls?: string[];
};

type ChatsProps = {
  messages: Message[];
  loading?: boolean;
};

/**
 * Displays a list of chat messages along with a loading indicator.
 *
 * @param messages - Array of chat messages to display.
 * @param loading - Whether the chatbot is currently loading a response.
 */
export function Chats({ messages, loading }: ChatsProps) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
      {messages.map((msg, index) => (
        <ChatBubble
          key={index}
          sender={msg.sender}
          message={msg.text}
          imageUrls={msg.imageUrls}
        />
      ))}

      {loading && <ChatLoader />}
    </div>
  );
}
