// src/pages/systemdesign/M201View.tsx
import React from 'react';
import { BaseCourseView } from './BaseCourseView';

export const M201View: React.FC<any> = ({ onBack, planTitle }) => {
    return <BaseCourseView initialModuleId="m-201" onBack={onBack} planTitle={planTitle} />;
};
export default M201View;