// src/pages/systemdesign/M1101View.tsx
import React from 'react';
import { BaseCourseView } from './BaseCourseView';

export const M1101View: React.FC<any> = ({ onBack, planTitle }) => {
    return <BaseCourseView initialModuleId="m-1101" onBack={onBack} planTitle={planTitle} />;
};
export default M1101View;