import React from 'react';

const ERROR_CODES = [
    { code: 'KYC_001', message: 'Invalid CIN format. Must follow Moroccan standard (e.g. AB123456).' },
    { code: 'KYC_002', message: 'Document image quality too low. Please ensure good lighting and no glare.' },
    { code: 'KYC_003', message: 'CIN already registered. This ID is already associated with another account.' },
    { code: 'KYC_004', message: 'Face verification failed. Selfie does not match CIN photo.' },
    { code: 'KYC_005', message: 'OTP expired. Please request a new verification code.' },
];

export const ErrorCodes: React.FC = () => {
    return (
        <div className="card p-6 md:p-8 space-y-6">
            <h3 className="text-lg font-black tracking-tight text-neutral-900 dark:text-neutral-100 uppercase">
                Common Reference Codes
            </h3>
            
            <div className="space-y-4">
                {ERROR_CODES.map((error) => (
                    <div key={error.code} className="flex flex-col md:flex-row md:items-start gap-2 md:gap-4 pb-4 border-b border-neutral-100 dark:border-neutral-800 last:border-0 last:pb-0">
                        <span className="text-sm font-black text-chari-red uppercase tracking-wider shrink-0 w-24">
                            {error.code}
                        </span>
                        <p className="text-sm text-neutral-600 dark:text-neutral-400 font-medium leading-relaxed">
                            {error.message}
                        </p>
                    </div>
                ))}
            </div>
        </div>
    );
};
