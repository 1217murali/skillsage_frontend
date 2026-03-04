// src/pages/systemdesign/M101View.tsx
import React from 'react';
import { BaseCourseView } from './BaseCourseView';

export const M101View: React.FC<any> = ({ onBack, planTitle }) => {
    // This component only defines the initial starting module ID
    return <BaseCourseView initialModuleId="m-101" onBack={onBack} planTitle={planTitle} />;
};
export default M101View;