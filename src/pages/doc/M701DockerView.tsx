// src/pages/learning/doc/modules/M701DockerView.tsx
import React from 'react';
// ASSUMPTION: DockerBaseView.tsx is one directory up, next to the 'modules' folder
import { DockerBaseView } from './DockerBaseView'; 

interface CourseViewProps { 
    onBack: () => void; 
    planTitle: string; 
}

/**
 * Entry point for the D-701: Observability, Metrics, & Logging module.
 * Targets users focused on monitoring, debugging, and maintaining running systems.
 */
export const M701DockerView: React.FC<CourseViewProps> = (props) => {
    return (
        <DockerBaseView 
            initialModuleId="m-d701" // CRITICAL: Starts at Observability & Monitoring
            {...props} 
        />
    );
};
export default M701DockerView;