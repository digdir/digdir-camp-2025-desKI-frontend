import { ChatBubble } from '../ChatBubble/ChatBubble';
import { ChatLoader } from '../ChatLoader/ChatLoader';

type Message = {
  sender: 'user' | 'bot';
  text: string;
};

type ChatsProps = {
  messages: Message[];
  loading?: boolean;
};

export function Chats({ messages, loading }: ChatsProps) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
      {messages.map((msg, index) => (
        <ChatBubble key={index} sender={msg.sender} message={msg.text} />
      ))}

      {loading && <ChatLoader />}
    </div>
  );
}
