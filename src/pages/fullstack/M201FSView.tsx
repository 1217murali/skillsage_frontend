// src/pages/fullstack/modules/M201FSView.tsx

import React from 'react';
import { FullStackBaseView } from './FullStackBaseView';

interface CourseViewProps { onBack: () => void; planTitle: string; }

/**
 * Renders the view for Full Stack Module M-201: React Fundamentals (State, Props, Effects, JSX).
 */
export const M201FSView: React.FC<CourseViewProps> = (props) => {
    // Starts the course at the M-201 module (React Fundamentals)
    return <FullStackBaseView initialModuleId="m-201" {...props} />;
};
export default M201FSView;