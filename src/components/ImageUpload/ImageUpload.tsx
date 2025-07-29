import { XMarkIcon } from '@navikt/aksel-icons';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { KEY } from '~/i18n/constants';
import styles from './ImageUpload.module.css';

type Props = {
  uploadedImages: string[];
  onImagesChange: (images: string[]) => void;
  onRemoveImage: (index: number) => void;
  fileInputRef: React.RefObject<HTMLInputElement | null>;
  onImageClick?: (url: string) => void;
  maxImages?: number;
};

export function ImageUpload({
  uploadedImages,
  onImagesChange,
  onRemoveImage,
  fileInputRef,
  onImageClick,
  maxImages = 5,
}: Props) {
  const { t } = useTranslation();
  const [localError, setLocalError] = useState<string | null>(null);

  function handleImageUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const files = Array.from(e.target.files || []);
    if (files.length === 0) return;

    const totalImages = uploadedImages.length + files.length;
    if (totalImages > maxImages) {
      setLocalError(t(KEY.image_upload_error));
      return;
    }

    const urls = files.map((f) => URL.createObjectURL(f));
    setLocalError(null);
    onImagesChange([...uploadedImages, ...urls]);
  }

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

      {localError && <p className={styles.imageError}>{localError}</p>}

      <input
        type="file"
        accept="image/*"
        multiple
        onChange={handleImageUpload}
        ref={fileInputRef}
        style={{ display: 'none' }}
      />
    </>
  );
}
