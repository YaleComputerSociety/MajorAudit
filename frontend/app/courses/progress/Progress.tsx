
'use client';
import { useEffect, useState } from "react";
import styles from "./Progress.module.css";

function TopProgressBar({ loading }: { loading: boolean }) {
  const [progress, setProgress] = useState(0);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (loading) {
      setVisible(true);
      setProgress(0);

      const interval = setInterval(() => {
        setProgress(prev => {
          if (prev >= 90) {
            clearInterval(interval);
            return prev;
          }
          return prev + 5;
        });
      }, 100); // increment every 100ms

    } else {
      setProgress(100);
      setTimeout(() => {
        setVisible(false);
        setProgress(0);
      }, 400); // after reaching 100%, fade out
    }
  }, [loading]);

  if (!visible) return null;

  return (
    <div className={styles.progressContainer}>
      <div
        className={styles.progressBar}
        style={{ width: `${progress}%` }}
      />
    </div>
  );
}

export default TopProgressBar;

