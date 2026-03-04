// src/pages/systemdesign/M1001View.tsx
import React from 'react';
import { BaseCourseView } from './BaseCourseView';

export const M1001View: React.FC<any> = ({ onBack, planTitle }) => {
    return <BaseCourseView initialModuleId="m-1001" onBack={onBack} planTitle={planTitle} />;
};
export default M1001View;