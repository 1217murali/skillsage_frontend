// src/pages/learning/doc/modules/M201DockerView.tsx

import React from 'react';
// ASSUMPTION: DockerBaseView.tsx is one directory up, next to the 'modules' folder
import { DockerBaseView } from './DockerBaseView'; 

interface CourseViewProps { 
    onBack: () => void; 
    planTitle: string; 
}

/**
 * Alternative entry point for the Docker course, starting directly at module D-201.
 * (Note: This is usually only used for direct linking or testing purposes in a linear course).
 */
export const M201DockerView: React.FC<CourseViewProps> = (props) => {
    return (
        <DockerBaseView 
            initialModuleId="m-d201" // CRITICAL: Specifies the starting module ID
            {...props} 
        />
    );
};
export default M201DockerView;