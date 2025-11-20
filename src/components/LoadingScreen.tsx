'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';

export default function LoadingScreen() {
  const [loading, setLoading] = useState(true);
  const [fadeOut, setFadeOut] = useState(false);
  const [progress, setProgress] = useState(0);

  // Run interval ONLY once
  useEffect(() => {
    let current = 0;

    const interval = setInterval(() => {
      current += 2;
      if (current > 100) current = 100;
      setProgress(current);

      if (current === 100) {
        clearInterval(interval);
        setFadeOut(true);

        setTimeout(() => {
          setLoading(false);
        }, 600);
      }
    }, 30);

    return () => clearInterval(interval);
  }, []); // <-- EMPTY ARRAY (important!)

  if (!loading) return null;

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        backgroundColor: '#e8f4ef',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
        zIndex: 9999,
        opacity: fadeOut ? 0 : 1,
        transition: 'opacity 0.6s ease',
      }}
    >
      <Image
        src="/uh-logo.png"
        alt="UH Manoa Logo"
        width={110}
        height={110}
        style={{ marginBottom: '20px' }}
        priority
      />

      <h2 style={{ fontWeight: 'bold', color: '#0b6623', marginBottom: '12px' }}>
        Welcome to Manoa Lost &amp; Found
      </h2>

      <div
        style={{
          width: '260px',
          height: '10px',
          backgroundColor: '#cfe6dc',
          borderRadius: '5px',
          overflow: 'hidden',
          marginTop: '10px',
        }}
      >
        <div
          style={{
            height: '100%',
            width: `${progress}%`,
            backgroundColor: '#0b6623',
            transition: 'width 0.15s linear',
          }}
        />
      </div>

      <p style={{ marginTop: '10px', color: '#1e3d32', fontSize: '14px' }}>
        Loading
        <br />
        {progress}
        %
      </p>
    </div>
  );
}
