// src/pages/fullstack/modules/M102FSView.tsx

import React from 'react';
import { FullStackBaseView } from './FullStackBaseView';

interface CourseViewProps { onBack: () => void; planTitle: string; }

/**
 * Renders the view for Full Stack Module M-102: Modern CSS (Layout, Specificity, & Pre-processors).
 */
export const M102FSView: React.FC<CourseViewProps> = (props) => {
    // Starts the course at the M-102 module (Modern CSS)
    return <FullStackBaseView initialModuleId="m-102" {...props} />;
};
export default M102FSView;