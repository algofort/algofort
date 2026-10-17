'use client';

import React from 'react';

export const SubtitleMarquee = ({
  text = 'Our Services — ',
  variant = 'dark', // 'dark' for light backgrounds, 'light' for dark backgrounds
  className = '',
  icon = 'https://res.cloudinary.com/vfsp1egd/image/upload/v1792145875/algofort/assets/68f7cadfd454c94c5b5251cb_grey-asterisk-icon.svg',
}) => {
  const items = [text, text, text];
  const subtitleClass = variant === 'light' ? 'subtitle subtitle-light' : 'subtitle subtitle-dark';

  return (
    <div className={`subtitle-component ${className}`}>
      <img
        loading="lazy"
        src={icon}
        alt="Asterisk Icon"
        className="asterisk"
      />
      <div className="subtitle-block">
        <div className="subtitle-marquee-track">
          <div className="subtitle-row">
            {items.map((item, idx) => (
              <div key={`r1-${idx}`} className={subtitleClass}>
                {item}
              </div>
            ))}
          </div>
          <div className="subtitle-row">
            {items.map((item, idx) => (
              <div key={`r2-${idx}`} className={subtitleClass}>
                {item}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
