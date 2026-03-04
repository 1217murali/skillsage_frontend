// src/pages/dsa/modules/M101DSAView.tsx

import React from 'react';
import { DSABaseView } from './DSABaseView'; // Adjust path based on your folder structure

interface CourseViewProps { onBack: () => void; planTitle: string; }

export const M101DSAView: React.FC<CourseViewProps> = (props) => {
    // Starts the course at the M-101 module
    return <DSABaseView initialModuleId="m-101" {...props} />;
};
export default M101DSAView;