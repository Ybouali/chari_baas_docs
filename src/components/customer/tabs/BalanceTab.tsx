import React, { useState } from 'react';
import { Wallet, Loader2 } from 'lucide-react';
import { TabContentWrapper } from '../TabContentWrapper';
import { ApiResultDisplay } from '../../common/ApiResultDisplay';

const BASE_URL = 'https://api-sandbox.charimoney.com';

export const BalanceTab: React.FC = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [phone, setPhone] = useState('');
    const [error, setError] = useState('');
    const [result, setResult] = useState<any>(null);

    const handleGetBalance = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!phone.trim()) {
            setError('Phone number is required');
            return;
        }
        setError('');
        setIsLoading(true);
        setResult(null);
        
        const apiKey = localStorage.getItem('chari_api_key') || 'sk_test_dummy';
        const url = `${BASE_URL}/api/v1/customer/balance?phoneNumber=${encodeURIComponent(phone)}`;
        
        try {
            const response = await fetch(url, {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${apiKey}`,
                    'Content-Type': 'application/json'
                }
            });
            
            const data = await response.json();
            setResult({
                method: 'GET',
                url,
                status: response.status,
                response: data
            });
        } catch (err: any) {
            setResult({
                method: 'GET',
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
                title="Customer Balance" 
                description="Check the current real-time balance for a customer"
                icon={Wallet}
            >
                <form onSubmit={handleGetBalance} className="space-y-6">
                    <div className="space-y-2">
                        <label className="block text-sm font-semibold text-neutral-700 dark:text-neutral-300">
                            Phone Number
                        </label>
                        <input
                            type="text"
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                            placeholder="+2126xxxxxxx"
                            className={`input-base ${error ? 'border-chari-red focus:ring-chari-red/30' : ''}`}
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
                                Retrieving...
                            </>
                        ) : (
                            <>
                                <Wallet className="w-5 h-5" />
                                Get Current Balance
                            </>
                        )}
                    </button>
                </form>
            </TabContentWrapper>

            {result && <ApiResultDisplay {...result} />}
        </div>
    );
};
