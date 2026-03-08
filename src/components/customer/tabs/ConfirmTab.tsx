import React, { useState } from 'react';
import { CheckCircle, Loader2 } from 'lucide-react';
import { TabContentWrapper } from '../TabContentWrapper';
import { ApiResultDisplay } from '../../common/ApiResultDisplay';

const BASE_URL = 'https://api-sandbox.charimoney.com';

export const ConfirmTab: React.FC = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [phone, setPhone] = useState('');
    const [otp, setOtp] = useState('');
    const [error, setError] = useState('');
    const [result, setResult] = useState<any>(null);

    const handleConfirm = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        
        if (!phone.trim()) {
            setError('Phone number is required');
            return;
        }

        if (otp.length !== 6) {
            setError('OTP must be 6 digits');
            return;
        }

        setIsLoading(true);
        setResult(null);
        
        const apiKey = localStorage.getItem('chari_api_key') || 'sk_test_dummy';
        const url = `${BASE_URL}/api/v1/customer/confirm`;
        const body = { 
            phoneNumber: phone,
            otp: otp
        };
        
        try {
            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${apiKey}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(body)
            });
            
            const data = await response.json();
            setResult({
                method: 'POST',
                url,
                status: response.status,
                response: data
            });
        } catch (err: any) {
            setResult({
                method: 'POST',
                url,
                status: 500,
                error: err.message || 'Failed to connect to API'
            });
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="space-y-6">
            <TabContentWrapper 
                title="Confirm Customer" 
                description="Verify customer registration with OTP code"
                icon={CheckCircle}
            >
                <form onSubmit={handleConfirm} className="space-y-6">
                    <div className="space-y-2">
                        <label className="block text-sm font-semibold text-neutral-700 dark:text-neutral-300">
                            Phone Number
                        </label>
                        <input
                            type="text"
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                            placeholder="+2126xxxxxxx"
                            className={`input-base ${error && !phone ? 'border-chari-red focus:ring-chari-red/30' : ''}`}
                        />
                    </div>

                    <div className="space-y-2">
                        <label className="block text-sm font-semibold text-neutral-700 dark:text-neutral-300">
                            OTP Code
                        </label>
                        <input
                            type="text"
                            maxLength={6}
                            value={otp}
                            onChange={(e) => setOtp(e.target.value)}
                            placeholder="123456"
                            className={`input-base tracking-[0.5em] text-center font-mono ${error && otp.length !== 6 ? 'border-chari-red focus:ring-chari-red/30' : ''}`}
                        />
                        {error && <p className="text-xs text-chari-red font-medium">{error}</p>}
                    </div>
                    
                    <button
                        type="submit"
                        disabled={isLoading}
                        className="btn-primary w-full py-3.5 flex items-center justify-center gap-2 shadow-chari-blue-600/20 mt-4"
                    >
                        {isLoading ? (
                            <>
                                <Loader2 className="w-5 h-5 animate-spin" />
                                Validating...
                            </>
                        ) : (
                            <>
                                <CheckCircle className="w-5 h-5" />
                                Confirm Registration
                            </>
                        )}
                    </button>
                </form>
            </TabContentWrapper>

            {result && <ApiResultDisplay {...result} />}
        </div>
    );
};
