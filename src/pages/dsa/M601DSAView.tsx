// src/pages/dsa/modules/M601DSAView.tsx

import React from 'react';
import { DSABaseView } from './DSABaseView';

interface CourseViewProps { onBack: () => void; planTitle: string; }

export const M601DSAView: React.FC<CourseViewProps> = (props) => {
    return <DSABaseView initialModuleId="m-601" {...props} />;
};
export default M601DSAView;