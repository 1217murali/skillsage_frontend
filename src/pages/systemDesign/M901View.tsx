// src/pages/systemdesign/M901View.tsx
import React from 'react';
import { BaseCourseView } from './BaseCourseView';

export const M901View: React.FC<any> = ({ onBack, planTitle }) => {
    return <BaseCourseView initialModuleId="m-901" onBack={onBack} planTitle={planTitle} />;
};
export default M901View;