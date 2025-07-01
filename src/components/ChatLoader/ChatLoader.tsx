import { Skeleton } from '@digdir/designsystemet-react';
import styles from './ChatLoader.module.css';

export function ChatLoader() {
  return (
    <div className={styles.messageSkeletonContainer}>
      {[...Array(3)].map((_, index) => (
        <div key={index} className={styles.messageSkeleton}>
          <Skeleton
            variant="circle"
            data-color="info"
            className={styles.skeleton}
          />
        </div>
      ))}
    </div>
  );
}
