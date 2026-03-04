// src/pages/dsa/modules/M301DSAView.tsx

import React from 'react';
import { DSABaseView } from './DSABaseView';

interface CourseViewProps { onBack: () => void; planTitle: string; }

export const M301DSAView: React.FC<CourseViewProps> = (props) => {
    return <DSABaseView initialModuleId="m-301" {...props} />;
};
export default M301DSAView;