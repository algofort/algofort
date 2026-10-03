'use client';

import React, { useEffect } from 'react';

export const Cursor = () => {
  useEffect(() => {
    const cursor = document.querySelector('.cb-cursor');
    if (!cursor) return;

    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;
    let currentX = mouseX;
    let currentY = mouseY;
    let isMoving = false;
    let animationFrameId;

    cursor.classList.add('-hidden');

    const handleMouseMove = (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      if (!isMoving) {
        isMoving = true;
        currentX = mouseX;
        currentY = mouseY;
        cursor.classList.remove('-hidden');
      }
    };

    const handleMouseLeave = () => cursor.classList.add('-hidden');
    const handleMouseEnter = () => { if (isMoving) cursor.classList.remove('-hidden'); };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseleave', handleMouseLeave);
    window.addEventListener('mouseenter', handleMouseEnter);

    const renderCursor = () => {
      if (isMoving) {
        currentX += (mouseX - currentX) * 0.18;
        currentY += (mouseY - currentY) * 0.18;
        cursor.style.transform = `translate3d(${currentX}px, ${currentY}px, 0) translate(-50%, -50%)`;
      }
      animationFrameId = requestAnimationFrame(renderCursor);
    };
    renderCursor();

    const handleMouseOver = (e) => {
      if (e.target.closest('a, button, .cb-btn_more, .about-card, .why-us-card, .alg-about-card, .cb-feature-item, .social-link, .alg-hero-social-link, .nav-link, .alg-footer-nav-link, .menu-button, .alg-header-menu-btn, [role="button"]')) {
        cursor.classList.add('-pointer');
      } else {
        cursor.classList.remove('-pointer');
      }
    };

    document.addEventListener('mouseover', handleMouseOver);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseleave', handleMouseLeave);
      window.removeEventListener('mouseenter', handleMouseEnter);
      document.removeEventListener('mouseover', handleMouseOver);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return null;
};
