// src/pages/dsa/modules/M1001DSAView.tsx

import React from 'react';
import { DSABaseView } from './DSABaseView';

interface CourseViewProps { onBack: () => void; planTitle: string; }

export const M1001DSAView: React.FC<CourseViewProps> = (props) => {
    return <DSABaseView initialModuleId="m-1001" {...props} />;
};
export default M1001DSAView;