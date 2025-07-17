import { Button, Tooltip } from '@digdir/designsystemet-react';
import { CameraIcon } from '@navikt/aksel-icons';
import { useTranslation } from 'react-i18next';
import { KEY } from '~/i18n/constants';
import styles from './CameraButton.module.css';

interface Props {
  onClick: () => void;
}

export function CameraUploadButton({ onClick }: Props) {
  const { t } = useTranslation();
  return (
    <Tooltip content={t(KEY.upload_image)} placement="bottom">
      <Button
        className={styles.cameraButton}
        variant="secondary"
        onClick={onClick}
      >
        <CameraIcon aria-label={t(KEY.upload_image)} />
      </Button>
    </Tooltip>
  );
}
