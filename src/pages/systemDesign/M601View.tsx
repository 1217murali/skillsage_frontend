// src/pages/systemdesign/M601View.tsx
import React from 'react';
import { BaseCourseView } from './BaseCourseView';

export const M601View: React.FC<any> = ({ onBack, planTitle }) => {
    return <BaseCourseView initialModuleId="m-601" onBack={onBack} planTitle={planTitle} />;
};
export default M601View;