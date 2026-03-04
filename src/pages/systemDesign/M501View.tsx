// src/pages/systemdesign/M501View.tsx
import React from 'react';
import { BaseCourseView } from './BaseCourseView';

export const M501View: React.FC<any> = ({ onBack, planTitle }) => {
    return <BaseCourseView initialModuleId="m-501" onBack={onBack} planTitle={planTitle} />;
};
export default M501View;