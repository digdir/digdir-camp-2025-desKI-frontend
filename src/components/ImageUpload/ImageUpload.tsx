import { XMarkIcon } from '@navikt/aksel-icons';
import { useTranslation } from 'react-i18next';
import { KEY } from '~/i18n/constants';
import styles from './ImageUpload.module.css';

type Props = {
  uploadedImages: string[];
  imageError: string | null;
  onImageUpload: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onRemoveImage: (index: number) => void;
  fileInputRef: React.RefObject<HTMLInputElement | null>;
  onImageClick?: (url: string) => void;
};

export function ImageUpload({
  uploadedImages,
  imageError,
  onImageUpload,
  onRemoveImage,
  fileInputRef,
  onImageClick,
}: Props) {
  const { t } = useTranslation();

  return (
    <>
      {uploadedImages.length > 0 && (
        <div className={styles.previewContainer}>
          {uploadedImages.map((url, index) => (
            <div key={index} className={styles.imageWrapper}>
              <button
                className={styles.imageButton}
                type="button"
                onClick={() => onImageClick?.(url)}
              >
                <img
                  src={url}
                  alt={`Bilde ${index + 1}`}
                  className={styles.imagePreview}
                  onClick={() => onImageClick?.(url)}
                />
              </button>
              <button
                className={styles.removeImageButton}
                onClick={() => onRemoveImage(index)}
                aria-label={`${t(KEY.remove_image)} ${index + 1}`}
                type="button"
              >
                <XMarkIcon />
              </button>
            </div>
          ))}
        </div>
      )}
      {imageError && <p className={styles.imageError}>{imageError}</p>}
      <input
        type="file"
        accept="image/*"
        multiple
        onChange={onImageUpload}
        ref={fileInputRef}
        style={{ display: 'none' }}
      />
    </>
  );
}
