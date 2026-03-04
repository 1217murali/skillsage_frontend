// src/pages/fullstack/modules/M103FSView.tsx

import React from 'react';
import { FullStackBaseView } from './FullStackBaseView';

interface CourseViewProps { onBack: () => void; planTitle: string; }

/**
 * Renders the view for Full Stack Module M-103: Core JavaScript (Scope, Async, & Functional Methods).
 */
export const M103FSView: React.FC<CourseViewProps> = (props) => {
    // Starts the course at the M-103 module (Core JavaScript)
    return <FullStackBaseView initialModuleId="m-103" {...props} />;
};
export default M103FSView;