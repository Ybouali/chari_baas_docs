import React, { useState } from 'react';
import { UserPlus, Loader2 } from 'lucide-react';
import { TabContentWrapper } from '../TabContentWrapper';
import { ApiResultDisplay } from '../ApiResultDisplay';

const BASE_URL = 'https://api-sandbox.charimoney.com';

export const RegisterTab: React.FC = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [phone, setPhone] = useState('');
    const [name, setName] = useState('');
    const [error, setError] = useState('');
    const [result, setResult] = useState<any>(null);

    const handleRegister = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        
        if (!phone.trim()) {
            setError('Phone number is required');
            return;
        }

        setIsLoading(true);
        setResult(null);
        
        const apiKey = localStorage.getItem('chari_api_key') || 'sk_test_dummy';
        const url = `${BASE_URL}/api/v1/customer/register`;
        const body = { 
            phoneNumber: phone,
            firstName: name.split(' ')[0] || 'User',
            lastName: name.split(' ').slice(1).join(' ') || 'Test'
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
                title="Register Customer" 
                description="Create a new customer account in the system"
                icon={UserPlus}
            >
                <form onSubmit={handleRegister} className="space-y-6">
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

                    <div className="space-y-2">
                        <label className="block text-sm font-semibold text-neutral-700 dark:text-neutral-300">
                            Full Name
                        </label>
                        <input
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            placeholder="John Doe"
                            className="input-base"
                        />
                    </div>
                    
                    <button
                        type="submit"
                        disabled={isLoading}
                        className="btn-primary w-full py-3.5 flex items-center justify-center gap-2 shadow-chari-blue-600/20 mt-4"
                    >
                        {isLoading ? (
                            <>
                                <Loader2 className="w-5 h-5 animate-spin" />
                                Processing...
                            </>
                        ) : (
                            <>
                                <UserPlus className="w-5 h-5" />
                                Register Customer
                            </>
                        )}
                    </button>
                </form>
            </TabContentWrapper>

            {result && <ApiResultDisplay {...result} />}
        </div>
    );
};
