import React from 'react';

export const RangoliPattern = ({ className = "", color = "#ff9930" }) => (
  <svg 
    className={className}
    viewBox="0 0 100 100" 
    fill="none" 
    xmlns="http://www.w3.org/2000/svg"
  >
    <circle cx="50" cy="50" r="3" fill={color} opacity="0.6"/>
    <circle cx="50" cy="50" r="8" stroke={color} strokeWidth="1" opacity="0.5"/>
    <circle cx="50" cy="50" r="15" stroke={color} strokeWidth="1" opacity="0.4"/>
    <circle cx="50" cy="50" r="22" stroke={color} strokeWidth="1" opacity="0.3"/>
    
    {[0, 45, 90, 135, 180, 225, 270, 315].map((angle, i) => {
      const rad = (angle * Math.PI) / 180;
      const x1 = 50 + 12 * Math.cos(rad);
      const y1 = 50 + 12 * Math.sin(rad);
      const x2 = 50 + 25 * Math.cos(rad);
      const y2 = 50 + 25 * Math.sin(rad);
      
      return (
        <g key={i}>
          <line x1={x1} y1={y1} x2={x2} y2={y2} stroke={color} strokeWidth="1.5" opacity="0.5"/>
          <circle cx={x2} cy={y2} r="2" fill={color} opacity="0.6"/>
        </g>
      );
    })}
    
    {[22.5, 67.5, 112.5, 157.5, 202.5, 247.5, 292.5, 337.5].map((angle, i) => {
      const rad = (angle * Math.PI) / 180;
      const x = 50 + 18 * Math.cos(rad);
      const y = 50 + 18 * Math.sin(rad);
      
      return (
        <circle key={`petal-${i}`} cx={x} cy={y} r="3" fill={color} opacity="0.4"/>
      );
    })}
  </svg>
);

export const MandalaPattern = ({ className = "", color = "#ff9930" }) => (
  <svg 
    className={className}
    viewBox="0 0 100 100" 
    fill="none" 
    xmlns="http://www.w3.org/2000/svg"
  >
    <circle cx="50" cy="50" r="2" fill={color} opacity="0.7"/>
    
    {[0, 60, 120, 180, 240, 300].map((angle, i) => {
      const rad = (angle * Math.PI) / 180;
      const x = 50 + 20 * Math.cos(rad);
      const y = 50 + 20 * Math.sin(rad);
      
      return (
        <g key={i}>
          <circle cx={x} cy={y} r="8" stroke={color} strokeWidth="1" opacity="0.4" fill="none"/>
          <circle cx={x} cy={y} r="3" fill={color} opacity="0.5"/>
          <line x1="50" y1="50" x2={x} y2={y} stroke={color} strokeWidth="0.5" opacity="0.3"/>
        </g>
      );
    })}
    
    <circle cx="50" cy="50" r="30" stroke={color} strokeWidth="0.5" opacity="0.3" fill="none"/>
  </svg>
);
