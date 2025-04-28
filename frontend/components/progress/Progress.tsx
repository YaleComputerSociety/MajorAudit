
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
			}, 100);
	
			return () => clearInterval(interval); // ✅ cleanup
		} else {
			// Instead of immediately 100, delay a tiny bit
			setTimeout(() => {
				setProgress(100);
			}, 100); // allow 100ms delay for realism
	
			setTimeout(() => {
				setVisible(false);
				setProgress(0);
			}, 700); // 🔥 slightly longer fade out
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

