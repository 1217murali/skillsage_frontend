// src/pages/dsa/modules/M401DSAView.tsx

import React from 'react';
import { DSABaseView } from './DSABaseView';

interface CourseViewProps { onBack: () => void; planTitle: string; }

export const M401DSAView: React.FC<CourseViewProps> = (props) => {
    return <DSABaseView initialModuleId="m-401" {...props} />;
};
export default M401DSAView;