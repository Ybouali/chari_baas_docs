type OnBoardingAuthBody = {
    completedSteps: number;
};

function OnBoardingAuthBody({ completedSteps }: OnBoardingAuthBody) {
    return (
        <div>
            <h1 className="text-white">{completedSteps}</h1>
        </div>
    );
}

export default OnBoardingAuthBody;
