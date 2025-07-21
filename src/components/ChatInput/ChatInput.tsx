import { Button, Input, Tooltip } from '@digdir/designsystemet-react';
import { PaperplaneIcon } from '@navikt/aksel-icons';
import { useTranslation } from 'react-i18next';
import { CameraUploadButton } from '~/components/CameraButton/CameraButton';
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

  return (
    <div className={styles.inputWrapper}>
      <Input
        placeholder={`${t(KEY.chat_placeholder)}...`}
        className={styles.input}
        value={inputValue}
        onChange={(e) => onInputChange(e.target.value)}
        onKeyDown={(e) => e.key === 'Enter' && onSend()}
        aria-label={t(KEY.chat_placeholder)}
      />
      <CameraUploadButton onClick={() => fileInputRef.current?.click()} />
      <Tooltip content={t(KEY.send)} placement="bottom">
        <Button
          className={styles.sendButton}
          variant="primary"
          onClick={onSend}
          aria-label={t(KEY.send)}
        >
          <PaperplaneIcon className={styles.paper} />
        </Button>
      </Tooltip>
    </div>
  );
}
