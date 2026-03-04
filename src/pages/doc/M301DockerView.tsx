// src/pages/learning/doc/modules/M301DockerView.tsx
import React from 'react';
// ASSUMPTION: DockerBaseView.tsx is one directory up, next to the 'modules' folder
import { DockerBaseView } from './DockerBaseView'; 

interface CourseViewProps { 
    onBack: () => void; 
    planTitle: string; 
}

/**
 * Entry point for the D-301: Networking, Ingress, & Service Mesh module.
 * Targets users interested in advanced networking and service communication patterns.
 */
export const M301DockerView: React.FC<CourseViewProps> = (props) => {
    return (
        <DockerBaseView 
            initialModuleId="m-d301" // CRITICAL: Starts at Networking & Service Mesh
            {...props} 
        />
    );
};
export default M301DockerView;