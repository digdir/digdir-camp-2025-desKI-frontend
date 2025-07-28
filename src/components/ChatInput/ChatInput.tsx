import { Button, Textarea, Tooltip } from '@digdir/designsystemet-react';
import { CameraIcon, PaperplaneIcon } from '@navikt/aksel-icons';
import { useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { KEY } from '~/i18n/constants';
import styles from './ChatInput.module.css';

type Props = {
  inputValue: string;
  onInputChange: (value: string) => void;
  onSend: () => void;
  fileInputRef: React.RefObject<HTMLInputElement | null>;
};

export function ChatInput({
  inputValue,
  onInputChange,
  onSend,
  fileInputRef,
}: Props) {
  const { t } = useTranslation();
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    onInputChange(e.target.value);
  };

  // biome-ignore lint/correctness/useExhaustiveDependencies: inputValue is intentionally used for height adjustment
  useEffect(() => {
    const el = textareaRef.current;
    if (!el) return;

    el.style.height = 'auto'; // reset height
    el.style.height = `${el.scrollHeight}px`; // grow to fit content
  }, [inputValue]);

  return (
    <div className={styles.textareaWrapper}>
      <Textarea
        className={styles.chatTextarea}
        rows={1}
        ref={textareaRef}
        placeholder={`${t(KEY.chat_placeholder)}...`}
        value={inputValue}
        onChange={handleInputChange}
        onKeyDown={(e) => {
          if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            onSend();
          }
        }}
        aria-label={t(KEY.chat_placeholder)}
      />
      <div className={styles.buttons}>
        <Tooltip content={t(KEY.upload_image)} placement="bottom">
          <Button
            className={styles.inputButton}
            variant="primary"
            onClick={() => fileInputRef.current?.click()}
            aria-label={t(KEY.upload_image)}
          >
            <CameraIcon />
          </Button>
        </Tooltip>
        <Tooltip content={t(KEY.send)} placement="bottom">
          <Button
            className={styles.inputButton}
            variant="primary"
            onClick={onSend}
            aria-label={t(KEY.send)}
          >
            <PaperplaneIcon className={styles.paper} />
          </Button>
        </Tooltip>
      </div>
      <div className={styles.helperText}>
        Chatboten kan gjøre feil. Kontakt Service Desk på&nbsp;
        <a href="mailto:servicedesk@digdir.no">servicedesk@digdir.no</a>&nbsp;
        hvis du trenger mer hjelp.
      </div>
    </div>
  );
}
