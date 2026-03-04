// src/pages/systemdesign/M1201View.tsx
import React from 'react';
import { BaseCourseView } from './BaseCourseView';

export const M1201View: React.FC<any> = ({ onBack, planTitle }) => {
    return <BaseCourseView initialModuleId="m-1201" onBack={onBack} planTitle={planTitle} />;
};
export default M1201View;