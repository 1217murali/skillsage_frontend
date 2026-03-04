// src/pages/dsa/modules/M1101DSAView.tsx

import React from 'react';
import { DSABaseView } from './DSABaseView';

interface CourseViewProps { onBack: () => void; planTitle: string; }

export const M1101DSAView: React.FC<CourseViewProps> = (props) => {
    return <DSABaseView initialModuleId="m-1101" {...props} />;
};
export default M1101DSAView;