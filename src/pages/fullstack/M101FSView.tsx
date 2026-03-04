// src/pages/fullstack/modules/M101FSView.tsx

import React from 'react';
import { FullStackBaseView } from './FullStackBaseView'; // Assuming the path to your base view

interface CourseViewProps { onBack: () => void; planTitle: string; }

/**
 * Renders the view for Full Stack Module M-101: Core HTML5 & Semantics.
 */
export const M101FSView: React.FC<CourseViewProps> = (props) => {
    // Starts the course at the M-101 module (Core HTML5)
    return <FullStackBaseView initialModuleId="m-101" {...props} />;
};
export default M101FSView;