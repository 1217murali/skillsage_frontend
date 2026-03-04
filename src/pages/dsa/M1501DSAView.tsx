// src/pages/dsa/modules/M1501DSAView.tsx

import React from 'react';
import { DSABaseView } from './DSABaseView';

interface CourseViewProps { onBack: () => void; planTitle: string; }

export const M1501DSAView: React.FC<CourseViewProps> = (props) => {
    return <DSABaseView initialModuleId="m-1501" {...props} />;
};
export default M1501DSAView;