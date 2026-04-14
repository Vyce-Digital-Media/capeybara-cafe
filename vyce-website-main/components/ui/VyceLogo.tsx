import React from "react";

export function VyceLogo({ className }: { className?: string }) {
  return (
    <svg 
      viewBox="0 0 500 500" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg" 
      className={className}
    >
      {/* Central stylus/rocket element */}
      <path 
        d="M250 115C250 115 262.5 115 262.5 130V370L250 410L237.5 370V130C237.5 115 250 115 250 115Z" 
        stroke="currentColor" 
        strokeWidth="3"
      />
      {/* Small detail squares */}
      <rect x="246" y="320" width="8" height="8" fill="currentColor" />
      <rect x="246" y="335" width="8" height="8" fill="currentColor" />
      <rect x="246" y="350" width="8" height="8" fill="currentColor" />
      
      {/* Horizontal base line */}
      <path d="M185 410H315" stroke="currentColor" strokeWidth="2" />

      {/* Radiating wing lines - Right side */}
      <path d="M305 270L325 365L350 410" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <path d="M285 270L300 330L320 370" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <path d="M345 145L345 340L328 360" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <path d="M272 310L285 340" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />

      {/* Radiating wing lines - Left side */}
      <path d="M195 270L175 365L150 410" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <path d="M215 270L200 330L180 370" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <path d="M155 145L155 340L172 360" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <path d="M228 310L215 340" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />

      {/* VYCE Text - Recreating the font style roughly */}
      <text 
        x="250" 
        y="480" 
        textAnchor="middle" 
        fontFamily="sans-serif" 
        fontWeight="bold" 
        fontSize="65" 
        letterSpacing="15" 
        fill="currentColor"
        style={{ textTransform: 'uppercase' }}
      >
        VYCE
      </text>
    </svg>
  );
}
