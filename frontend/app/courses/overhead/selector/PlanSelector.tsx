"use client";
import React, { useState, useEffect, useRef } from 'react';
import { useUser } from '@/context/UserProvider';
import styles from './PlanSelector.module.css';

function PlanSelector() {
  const { currentFYP, availableFYPs, setCurrentFYPIndex } = useUser();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleFYPSelect = (index: number) => {
    setCurrentFYPIndex(index);
    setIsOpen(false);
  };

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

  const selectedIndex = availableFYPs.findIndex(fyp => fyp.id === currentFYP?.id);

  const getCurrentFYPName = () => {
    if (availableFYPs.length === 0) return "No FYPs Available";
    if (selectedIndex === -1) return "Select an FYP";
    return `FYP ${selectedIndex + 1}`;
  };

  return (
    <div className={styles.container} ref={dropdownRef}>
      <button className={styles.box} onClick={toggleDropdown}>
        {getCurrentFYPName()} ▼
      </button>

      {isOpen && (
        <div className={styles.dropdown}>
          {availableFYPs.length === 0 ? (
            <div className={styles.option}>No FYPs available</div>
          ) : (
            availableFYPs.map((fyp, index) => (
              <div
                key={fyp.id}
                className={`${styles.option} ${selectedIndex === index ? styles.selected : ""}`}
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

export default PlanSelector;
