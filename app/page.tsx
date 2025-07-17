'use client';

import React, { useState, useEffect } from 'react';

const Page = () => {
  const [maskPos, setMaskPos] = useState({ x: 0, y: 0 });
  const [radius, setRadius] = useState(140);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // Function to check if the screen is mobile size
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    if (isMobile) return;
    const rect = e.currentTarget.getBoundingClientRect();
    setMaskPos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top
    });
  };

  const handleWheel = (e: React.WheelEvent<HTMLDivElement>) => {
    if (isMobile) return;
    setRadius((prev) => {
      let next = prev - e.deltaY * 0.2;
      if (next < 40) next = 40;
      if (next > 400) next = 400;
      return next;
    });
  };

  return (
    <div
      style={{
        position: 'relative',
        minHeight: '100vh',
        overflow: 'hidden',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        cursor: isMobile ? 'auto' : 'none',
        padding: isMobile ? '24px' : '0',
      }}
      onMouseMove={handleMouseMove}
      onWheel={handleWheel}
    >
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          backgroundImage: "url('https://www.pixelstalk.net/wp-content/uploads/2016/06/Black-and-Blue-Background-HD.jpg')",
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          opacity: 0.4,
          zIndex: 0,
        }}
      />
      {/* Black overlay with flashlight effect (desktop only) */}
      {!isMobile && (
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            pointerEvents: 'none',
            zIndex: 2,
            WebkitMaskImage: `radial-gradient(circle ${radius}px at ${maskPos.x}px ${maskPos.y}px, transparent 0 ${(radius-60)}px, rgba(0,0,0,0.5) ${(radius-20)}px, rgb(0,0,0) ${radius}px)`,
            maskImage: `radial-gradient(circle ${radius}px at ${maskPos.x}px ${maskPos.y}px, transparent 0 ${(radius-60)}px, rgba(0,0,0,0.5) ${(radius-20)}px, rgb(0,0,0) ${radius}px)`,
            background: 'rgb(0, 0, 0)'
          }}
        />
      )}
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          position: 'relative',
          zIndex: 1,
          width: '100%',
        }}
      >
        <span
          style={{
            fontFamily: 'var(--font-orbitron)',
            fontWeight: 400,
            fontSize: isMobile ? '1.1rem' : '1.5rem',
            color: '#fff',
            letterSpacing: '0.1em',
            marginBottom: isMobile ? '0.5rem' : '1rem',
            opacity: 0.85,
            textAlign: 'center',
            width: '100%',
            display: 'block',
            wordBreak: 'break-word',
          }}
        >
          SerandiByte
        </span>
        <h1
          style={{
            fontFamily: 'var(--font-orbitron)',
            fontWeight: 'bold',
            fontSize: isMobile ? '2.5rem' : '7rem',
            color: '#fff',
            letterSpacing: '0.1em',
            textAlign: 'center',
            margin: 0,
            width: '100%',
            wordBreak: 'break-word',
            lineHeight: isMobile ? 1.1 : 1.05,
          }}
        >
          COMING SOON
        </h1>
      </div>
      {/* Center bottom navigation image (desktop only) */}
      {!isMobile && (
        <img
          src="/navigate.png"
          alt="Navigate"
          style={{
            position: 'fixed',
            left: '50%',
            bottom: '32px',
            transform: 'translateX(-50%)',
            width: '64px',
            height: '64px',
            zIndex: 10,
            pointerEvents: 'none',
            userSelect: 'none',
            opacity: 0.85
          }}
        />
      )}
    </div>
  );
};

export default Page;