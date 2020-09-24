import React, { useState, useEffect } from 'react';
import styles from './Logo.module.css';

const Logo = () => (
  <img
    className={styles['logo-image']}
    src={require('../../assets/elogroup_logo.png')}
    alt="Logo"
  />
);

export default Logo;
