// src/pages/systemdesign/M701View.tsx
import React from 'react';
import { BaseCourseView } from './BaseCourseView';

export const M701View: React.FC<any> = ({ onBack, planTitle }) => {
    return <BaseCourseView initialModuleId="m-701" onBack={onBack} planTitle={planTitle} />;
};
export default M701View;