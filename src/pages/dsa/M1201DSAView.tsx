// src/pages/dsa/modules/M1201DSAView.tsx

import React from 'react';
import { DSABaseView } from './DSABaseView';

interface CourseViewProps { onBack: () => void; planTitle: string; }

export const M1201DSAView: React.FC<CourseViewProps> = (props) => {
    return <DSABaseView initialModuleId="m-1201" {...props} />;
};
export default M1201DSAView;