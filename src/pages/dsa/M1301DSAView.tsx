// src/pages/dsa/modules/M1301DSAView.tsx

import React from 'react';
import { DSABaseView } from './DSABaseView';

interface CourseViewProps { onBack: () => void; planTitle: string; }

export const M1301DSAView: React.FC<CourseViewProps> = (props) => {
    return <DSABaseView initialModuleId="m-1301" {...props} />;
};
export default M1301DSAView;