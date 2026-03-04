import React from 'react';
// useTheme is no longer directly needed here if not switching Spline URLs
// import { useTheme } from 'next-themes'; 
import Spline from '@splinetool/react-spline'; // Import Spline component

export const SkillSageGlobe = () => {
  // Your single Spline URL (using .splinecode)
  const splineUrl = "https://prod.spline.design/z454zb599MppBk-W/scene.splinecode"; 

  return (
    <div style={{ width: '100%', height: '100%', position: 'relative' }}> {/* Added position: 'relative' for good measure */}
      {/* Use the Spline React component */}
      <Spline 
        scene={splineUrl} 
        style={{ 
          position: 'absolute', // Ensure it's absolutely positioned within its 100% parent
          top: 0, 
          left: 0, 
          width: '100%', 
          height: '100%', 
          border: 'none' 
        }} 
      />  
    </div>
  );
};
