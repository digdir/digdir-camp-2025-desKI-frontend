import { ChatBubble } from '../ChatBubble/ChatBubble';

type Message = {
  sender: 'user' | 'bot';
  text: string;
};

type ChatsProps = {
  messages: Message[];
};

export function Chats({ messages }: ChatsProps) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
      {messages.map((msg, i) => (
        <ChatBubble key={i} sender={msg.sender} message={msg.text} />
      ))}
    </div>
  );
}
