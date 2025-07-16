import { Button } from '@digdir/designsystemet-react';
import { CameraIcon } from '@navikt/aksel-icons';
import styles from './CameraButton.module.css';
import { useTranslation } from 'react-i18next';
import { KEY } from '~/i18n/constants';

interface Props {
  onClick: () => void;
}

export function CameraUploadButton({ onClick }: Props) {
  const { t } = useTranslation();
  return (
    <Button
      className={styles.cameraButton}
      variant="secondary"
      onClick={onClick}
      aria-label={t(KEY.upload_image)}
    >
      <CameraIcon />
    </Button>
  );
}
