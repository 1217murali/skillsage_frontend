// src/pages/dsa/modules/M1601DSAView.tsx

import React from 'react';
import { DSABaseView } from './DSABaseView';

interface CourseViewProps { onBack: () => void; planTitle: string; }

export const M1601DSAView: React.FC<CourseViewProps> = (props) => {
    return <DSABaseView initialModuleId="m-1601" {...props} />;
};
export default M1601DSAView;