// src/pages/learning/doc/modules/M401DockerView.tsx
import React from 'react';
// ASSUMPTION: DockerBaseView.tsx is one directory up, next to the 'modules' folder
import { DockerBaseView } from './DockerBaseView'; 

interface CourseViewProps { 
    onBack: () => void; 
    planTitle: string; 
}

/**
 * Entry point for the D-401: Persistent Storage & StatefulSets module.
 * Targets users focused on deploying databases and stateful applications in K8s.
 */
export const M401DockerView: React.FC<CourseViewProps> = (props) => {
    return (
        <DockerBaseView 
            initialModuleId="m-d401" // CRITICAL: Starts at Persistent Storage
            {...props} 
        />
    );
};
export default M401DockerView;