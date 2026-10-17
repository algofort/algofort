import { useEffect } from 'react';
import { initBackToTop } from './backToTop.js';
import './backToTop.css';

export default function BackToTop() {
  useEffect(initBackToTop, []);
  return null;
}
