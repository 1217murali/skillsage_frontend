// src/pages/learning/doc/modules/M601DockerView.tsx
import React from 'react';
// ASSUMPTION: DockerBaseView.tsx is one directory up, next to the 'modules' folder
import { DockerBaseView } from './DockerBaseView'; 

interface CourseViewProps { 
    onBack: () => void; 
    planTitle: string; 
}

/**
 * Entry point for the D-601: Helm & Kubernetes Package Management module.
 * Targets users focusing on reproducible application deployments and packaging standards.
 */
export const M601DockerView: React.FC<CourseViewProps> = (props) => {
    return (
        <DockerBaseView 
            initialModuleId="m-d601" // CRITICAL: Starts at Helm & Package Management
            {...props} 
        />
    );
};
export default M601DockerView;