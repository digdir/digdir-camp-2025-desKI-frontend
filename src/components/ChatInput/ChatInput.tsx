import { Button, Textarea, Tooltip } from '@digdir/designsystemet-react';
import { CameraIcon, PaperplaneIcon } from '@navikt/aksel-icons';
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

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const el = e.target;
    el.style.height = 'auto'; // reset height
    el.style.height = `${el.scrollHeight}px`; // grow to fit content
    onInputChange(el.value); // update parent state
  };

  return (
    <div className={styles.textareaWrapper}>
      <Textarea
        rows={1}
        placeholder={`${t(KEY.chat_placeholder)}...`}
        className={styles.chatTextarea}
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
    </div>
  );
}
