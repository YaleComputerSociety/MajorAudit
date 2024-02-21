import React from 'react';

import logo from '../images/brand/bluebook.svg';
import wordmarkOutlines from '../images/brand/wordmark_outlines.svg';
import styles from './Logo.module.css';

type Props = {
    /** Should we show the icon */
    readonly icon?: boolean;
    /** Should be show the wordmark */
    readonly wordmark?: boolean;
  };
  
  /**
   * MajorAudit Logo
   */
  function Logo({ icon = true, wordmark = true }: Props) {
    
    return (
      <span
        className={styles.majorauditLogo}
        style={{
          display: 'block',
        }}
      >
        {icon && <img src={logo} alt="" className={styles.majorauditLogoImg} />}{' '}
        {wordmark && (
          <img
            src={wordmarkOutlines}
            alt="MajorAudit"
            className={styles.majorauditLogoWordmark}
          />
        )}
      </span>
    );
  }
  
  export default Logo;