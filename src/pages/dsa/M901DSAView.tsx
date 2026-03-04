// src/pages/dsa/modules/M901DSAView.tsx

import React from 'react';
import { DSABaseView } from './DSABaseView';

interface CourseViewProps { onBack: () => void; planTitle: string; }

export const M901DSAView: React.FC<CourseViewProps> = (props) => {
    return <DSABaseView initialModuleId="m-901" {...props} />;
};
export default M901DSAView;