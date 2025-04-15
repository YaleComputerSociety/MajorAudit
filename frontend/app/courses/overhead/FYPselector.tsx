
// components/fypSelector/FYPSelector.tsx
import React, { useState, useEffect, useRef } from 'react';
import Style from './FYPSelector.module.css';
import { useUser } from '@/context/UserProvider';

function FYPSelector() 
{
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
    
    // You might need to adjust this depending on how you want to display the FYP
    // For example, if you have a name property, you could use that instead
    return `FYP ${user.FYPindex + 1}`;
  };

  return (
    <div className={Style.fypSelectorContainer} ref={dropdownRef}>
      <div 
        className={Style.fypSelector} 
        onClick={toggleDropdown}
      >
        <span>{getCurrentFYPName()}</span>
        <span className={Style.arrow}>▼</span>
      </div>
      
      {isOpen && (
        <div className={Style.dropdown}>
          {!user.FYPs || user.FYPs.length === 0 ? (
            <div className={Style.dropdownItem}>
              <span className={Style.noFyp}>What??? No FYPs found</span>
            </div>
          ) : (
            user.FYPs.map((fyp, index) => (
              <div 
                key={fyp.id} 
                className={`${Style.dropdownItem} ${index === user.FYPindex ? Style.active : ''}`}
                onClick={() => handleFYPSelect(index)}
              >
                {/* Display FYP name or identifier */}
                <span>FYP {index + 1}</span>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
};

export default FYPSelector;
