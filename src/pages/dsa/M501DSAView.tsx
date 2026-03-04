// src/pages/dsa/modules/M501DSAView.tsx

import React from 'react';
import { DSABaseView } from './DSABaseView';

interface CourseViewProps { onBack: () => void; planTitle: string; }

export const M501DSAView: React.FC<CourseViewProps> = (props) => {
    return <DSABaseView initialModuleId="m-501" {...props} />;
};
export default M501DSAView;