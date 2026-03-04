// src/pages/learning/doc/modules/M101DockerView.tsx

import React from 'react';
// ASSUMPTION: DockerBaseView.tsx is one directory up, next to the 'modules' folder
import { DockerBaseView } from './DockerBaseView'; 

interface CourseViewProps { 
    onBack: () => void; 
    planTitle: string; 
}

/**
 * Entry point for the Docker course, starting at the first module (D-101).
 * It acts as a wrapper to initialize the generic DockerBaseView.
 */
export const M101DockerView: React.FC<CourseViewProps> = (props) => {
    return (
        <DockerBaseView 
            initialModuleId="m-d101" // CRITICAL: Specifies the starting module ID
            {...props} 
        />
    );
};
export default M101DockerView;