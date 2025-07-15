import { Button } from '@digdir/designsystemet-react';
import { CameraIcon } from '@navikt/aksel-icons';
import styles from './CameraButton.module.css';

interface Props {
  onClick: () => void;
}

export function CameraUploadButton({ onClick }: Props) {
  return (
    <Button
      className={styles.cameraButton}
      variant="secondary"
      onClick={onClick}
    >
      <CameraIcon aria-label="Last opp bilde" />
    </Button>
  );
}
