import styles from './FulscreenImage.module.css';

type Props = {
  imageUrl: string;
  onClose: () => void;
};

export function FullscreenImage({ imageUrl, onClose }: Props) {
  return (
    <div className={styles.fullscreenOverlay}>
      <button
        onClick={onClose}
        className={styles.closeButton}
        type="button"
        aria-label="Lukk bilde"
      >
        ✕
      </button>
      <img
        src={imageUrl}
        alt="Fullskjerm bilde"
        className={styles.fullscreenImage}
      />
    </div>
  );
}
