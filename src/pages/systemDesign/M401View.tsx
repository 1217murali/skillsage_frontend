// src/pages/systemdesign/M401View.tsx
import React from 'react';
import { BaseCourseView } from './BaseCourseView';

export const M401View: React.FC<any> = ({ onBack, planTitle }) => {
    return <BaseCourseView initialModuleId="m-401" onBack={onBack} planTitle={planTitle} />;
};
export default M401View;