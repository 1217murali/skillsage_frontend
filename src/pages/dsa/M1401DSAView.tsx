// src/pages/dsa/modules/M1401DSAView.tsx

import React from 'react';
import { DSABaseView } from './DSABaseView';

interface CourseViewProps { onBack: () => void; planTitle: string; }

export const M1401DSAView: React.FC<CourseViewProps> = (props) => {
    return <DSABaseView initialModuleId="m-1401" {...props} />;
};
export default M1401DSAView;