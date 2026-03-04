// src/pages/dsa/modules/M701DSAView.tsx

import React from 'react';
import { DSABaseView } from './DSABaseView';

interface CourseViewProps { onBack: () => void; planTitle: string; }

export const M701DSAView: React.FC<CourseViewProps> = (props) => {
    return <DSABaseView initialModuleId="m-701" {...props} />;
};
export default M701DSAView;