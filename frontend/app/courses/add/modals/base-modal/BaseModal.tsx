
// add/modals/base-modal/BaseModal.tsx

import React, { useRef, useEffect, ReactNode } from 'react';
import { useModal } from '../../context/ModalContext';
import styles from './BaseModal.module.css';

interface BaseModalProps {
  children: ReactNode;
  title: string;
  position?: {
    top: number;
    left: number;
  };
}

const BaseModal: React.FC<BaseModalProps> = ({ 
  children, 
  title,
  position = { top: 95, left: 20 }  // Default position matching the AddButton
}) => {
  const { closeModal } = useModal();
  const modalRef = useRef<HTMLDivElement>(null);

  // Close on click outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
        closeModal();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [closeModal]);

  // Set dynamic position
  const modalStyle = {
    top: `${position.top + 38}px`,  // 38px accounts for the button height + some spacing
    left: `${position.left}px`,
  };

  return (
    <div className={styles.modalContainer} style={modalStyle} ref={modalRef}>
      <div className={styles.modalHeader}>
        <h3>{title}</h3>
        <button 
          className={styles.closeButton}
          onClick={closeModal}
          aria-label="Close modal"
        >
          ×
        </button>
      </div>
      <div className={styles.modalContent}>
        {children}
      </div>
    </div>
  );
};

export default BaseModal;
