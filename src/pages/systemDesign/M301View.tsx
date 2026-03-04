// src/pages/systemdesign/M301View.tsx
import React from 'react';
import { BaseCourseView } from './BaseCourseView';

export const M301View: React.FC<any> = ({ onBack, planTitle }) => {
    return <BaseCourseView initialModuleId="m-301" onBack={onBack} planTitle={planTitle} />;
};
export default M301View;