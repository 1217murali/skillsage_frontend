// src/pages/dsa/modules/M201DSAView.tsx

import React from 'react';
import { DSABaseView } from './DSABaseView';

interface CourseViewProps { onBack: () => void; planTitle: string; }

export const M201DSAView: React.FC<CourseViewProps> = (props) => {
    return <DSABaseView initialModuleId="m-201" {...props} />;
};
export default M201DSAView;