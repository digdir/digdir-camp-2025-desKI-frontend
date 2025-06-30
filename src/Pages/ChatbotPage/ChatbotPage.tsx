import { Button, Dropdown, Input } from "@digdir/designsystemet-react";
import { ChevronDownIcon, PaperplaneIcon } from "@navikt/aksel-icons";
import { useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { logoLight } from "~/assets";
import { Chats } from "~/components/Chats/Chats";
import { solutions } from "~/data/solutions";
import styles from "./ChatbotPage.module.css";

type Message = {
  sender: "user" | "bot";
  text: string;
};

export function ChatbotPage() {
  const [open, setOpen] = useState(false);
  const [searchParams] = useSearchParams();
  const [inputValue, setInputValue] = useState("");
  const [messages, setMessages] = useState<Message[]>([]);

  function handleSend() {
    if (!inputValue.trim()) return;

    const userMessage: Message = { sender: "user", text: inputValue };
    setMessages((prev) => [...prev, userMessage]);
    setInputValue("");

    // TODO: Replace with actual API call to desKI
    setTimeout(() => {
      const botReply: Message = {
        sender: "bot",
        text: "Dette er et eksempel på et svar fra desKI 🤖",
      };
      setMessages((prev) => [...prev, botReply]);
    }, 1000);
  }

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
            {/* TODO: Add context */}
            {searchParams.get("solution")}
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
      <div className={styles.chatContainer}>
        <div className={styles.messagesContainer}>
          <Chats messages={messages} />
        </div>
        {messages.length === 0 && (
          <h2 className={styles.introText}>
            Hva lurer du på?
          </h2>
        )}
        <div className={styles.sendContainer}>
          <Input
            placeholder="Spør et spørsmål"
            className={styles.input}
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSend()}
          />
          <Button
            className={styles.sendButton}
            variant="primary"
            onClick={handleSend}
          >
            <PaperplaneIcon />
          </Button>
        </div>
      </div>
    </div>
  );
}
