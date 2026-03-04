// src/pages/learning/doc/modules/M501DockerView.tsx
import React from 'react';
// ASSUMPTION: DockerBaseView.tsx is one directory up, next to the 'modules' folder
import { DockerBaseView } from './DockerBaseView'; 

interface CourseViewProps { 
    onBack: () => void; 
    planTitle: string; 
}

/**
 * Entry point for the D-501: Container Security & Image Hardening module.
 * Targets users specifically interested in container image security and best practices.
 */
export const M501DockerView: React.FC<CourseViewProps> = (props) => {
    return (
        <DockerBaseView 
            initialModuleId="m-d501" // CRITICAL: Starts at Container Security
            {...props} 
        />
    );
};
export default M501DockerView;