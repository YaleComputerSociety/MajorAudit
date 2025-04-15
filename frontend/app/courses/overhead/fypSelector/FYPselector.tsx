// overhead/fypSelector/FYPSelector.tsx
import React, { useState, useEffect, useRef } from 'react';
import { useUser } from '@/context/UserProvider';
import styles from './FYPSelector.module.css';

function FYPSelector() {
  const { user, selectFYP } = useUser();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleFYPSelect = (index: number) => {
    selectFYP(index);
    setIsOpen(false);
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Get current FYP name or placeholder
  const getCurrentFYPName = () => {
    if (!user.FYPs || user.FYPs.length === 0) {
      return "No FYPs Available";
    }
    
    if (user.FYPindex < 0 || user.FYPindex >= user.FYPs.length) {
      return "Select an FYP";
    }
    
    return `FYP ${user.FYPindex + 1}`;
  };

  return (
    <div className={styles.container} ref={dropdownRef}>
      <button 
        className={styles.box}
        onClick={toggleDropdown}
      >
        {getCurrentFYPName()} ▼
      </button>

      {isOpen && (
        <div className={styles.dropdown}>
          {!user.FYPs || user.FYPs.length === 0 ? (
            <div className={styles.option}>No FYPs available</div>
          ) : (
            user.FYPs.map((fyp, index) => (
              <div
                key={fyp.id}
                className={`${styles.option} ${user.FYPindex === index ? styles.selected : ""}`}
                onClick={() => handleFYPSelect(index)}
              >
                FYP {index + 1}
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
}

export default FYPSelector;