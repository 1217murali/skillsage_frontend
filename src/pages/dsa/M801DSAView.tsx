// src/pages/dsa/modules/M801DSAView.tsx

import React from 'react';
import { DSABaseView } from './DSABaseView';

interface CourseViewProps { onBack: () => void; planTitle: string; }

export const M801DSAView: React.FC<CourseViewProps> = (props) => {
    return <DSABaseView initialModuleId="m-801" {...props} />;
};
export default M801DSAView;