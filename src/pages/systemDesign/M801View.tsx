// src/pages/systemdesign/M801View.tsx
import React from 'react';
import { BaseCourseView } from './BaseCourseView';

export const M801View: React.FC<any> = ({ onBack, planTitle }) => {
    return <BaseCourseView initialModuleId="m-801" onBack={onBack} planTitle={planTitle} />;
};
export default M801View;