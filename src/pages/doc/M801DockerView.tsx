// src/pages/learning/doc/modules/M801DockerView.tsx
import React from 'react';
// ASSUMPTION: DockerBaseView.tsx is one directory up, next to the 'modules' folder
import { DockerBaseView } from './DockerBaseView'; 

interface CourseViewProps { 
    onBack: () => void; 
    planTitle: string; 
}

/**
 * Final entry point for the D-801: Serverless Containers & Cloud Platforms module.
 * Targets users focused on cloud-native strategies and serverless deployment models (e.g., Fargate, Cloud Run).
 */
export const M801DockerView: React.FC<CourseViewProps> = (props) => {
    return (
        <DockerBaseView 
            initialModuleId="m-d801" // CRITICAL: Starts at Serverless & Cloud Containers (Final Module)
            {...props} 
        />
    );
};
export default M801DockerView;