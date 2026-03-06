import { useState } from 'react';
import CurlExample from './CurlExample';
import Header from './Header';
import OnBoardingAuthBody from './OnBoardingAuthBody';
import OnBoardingAuth from './OnBoardingAuthHeader';

export default function Setup() {
    const [completedSteps, setCompletedSteps] = useState(0);
    return (
        <div className="flex flex-col items-center justify-center">
            <Header />
            <OnBoardingAuth
                completedSteps={completedSteps}
                setCompletedSteps={setCompletedSteps}
            />
            <OnBoardingAuthBody completedSteps={completedSteps} />
            <CurlExample />
        </div>
    );
}
