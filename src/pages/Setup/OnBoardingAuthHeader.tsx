import { KeyRound, ShieldCheck, Globe, Zap, Check } from 'lucide-react';

type OnBoardingAuthType = {
    completedSteps: number;
    setCompletedSteps: React.Dispatch<React.SetStateAction<number>>;
};

function OnBoardingAuth({
    completedSteps,
    setCompletedSteps,
}: OnBoardingAuthType) {
    const handleStepClick = (step: number) => {
        if (step > completedSteps) {
            setCompletedSteps(step);
        }
    };

    const steps = [
        {
            icon: KeyRound,
            title: 'Enter API Key',
            description: 'Paste your secret key',
            color: 'blue',
        },
        {
            icon: ShieldCheck,
            title: 'Whitelist IP',
            description: 'Add your server / client IP',
            color: 'blue',
        },
        {
            icon: Globe,
            title: 'Pick Environment',
            description: 'Choose test or production',
            color: 'blue',
        },
        {
            icon: Zap,
            title: 'Test Connection',
            description: 'Verify everything works',
            color: 'blue',
        },
    ];

    const isStepCompleted = (stepIndex: number) => {
        return stepIndex < completedSteps;
    };

    return (
        <div className="flex items-center justify-center">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 max-w-5xl w-full px-4">
                {steps.map((step, index) => {
                    const stepNumber = index + 1;
                    const isCompleted = isStepCompleted(stepNumber);
                    const isCurrentStep = stepNumber === completedSteps + 1;
                    const color = step.color;

                    return (
                        <button
                            key={index}
                            onClick={() => handleStepClick(stepNumber)}
                            className={`
                                group relative flex flex-col items-center justify-center 
                                bg-slate-900/50 border rounded-lg 
                                transition-all duration-200 shadow-sm hover:shadow
                                ${
                                    isCompleted
                                        ? `border-chari-${color}-600/60 bg-slate-800/60`
                                        : `border-chari-${color}-900/40`
                                }
                                hover:border-chari-${color}-600/60 hover:bg-slate-800/60
                            `}
                        >
                            {/* Step Number Badge */}
                            <div className="absolute top-2 left-2">
                                <div
                                    className={`
                                    w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold
                                    ${
                                        isCompleted
                                            ? 'bg-chari-green-500 text-white'
                                            : isCurrentStep
                                            ? 'bg-chari-blue-500 text-white'
                                            : 'bg-slate-700 text-slate-400'
                                    }
                                `}
                                >
                                    {stepNumber}
                                </div>
                            </div>

                            {/* Checkmark for completed steps */}
                            {isCompleted && (
                                <div className="absolute top-2 right-2">
                                    <div className="w-6 h-6 rounded-full bg-chari-green-500/20 flex items-center justify-center">
                                        <Check className="h-4 w-4 text-chari-green-500" />
                                    </div>
                                </div>
                            )}

                            {/* Icon */}
                            <div
                                className={`
                                p-3.5 rounded-full transition-colors
                                ${
                                    isCompleted
                                        ? `bg-chari-${color}-900/40`
                                        : `bg-chari-${color}-950/50 group-hover:bg-chari-${color}-900/40`
                                }
                            `}
                            >
                                <step.icon
                                    className={`h-6 w-6 text-chari-${color}-400`}
                                />
                            </div>

                            {/* Content */}
                            <div className="mt-2.5 mb-2 px-3 text-center">
                                <h3 className="text-sm font-semibold text-white">
                                    {step.title}
                                </h3>
                                <p className="text-xs text-chari-blue-300/70 mt-0.5 leading-tight">
                                    {step.description}
                                </p>
                            </div>
                        </button>
                    );
                })}
            </div>
        </div>
    );
}

export default OnBoardingAuth;
