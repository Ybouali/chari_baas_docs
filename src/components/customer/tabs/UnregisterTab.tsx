import React, { useState } from 'react';
import { UserX, Loader2, AlertTriangle } from 'lucide-react';
import { TabContentWrapper } from '../TabContentWrapper';
import { ApiResultDisplay } from '../../common/ApiResultDisplay';

const BASE_URL = 'https://api-sandbox.charimoney.com';

export const UnregisterTab: React.FC = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [phone, setPhone] = useState('');
    const [error, setError] = useState('');
    const [result, setResult] = useState<any>(null);
    const [isConfirmed, setIsConfirmed] = useState(false);

    const handleUnregister = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!phone.trim()) {
            setError('Phone number is required');
            return;
        }
        if (!isConfirmed) {
            setError('Please confirm that you want to delete this account');
            return;
        }
        setError('');
        setIsLoading(true);
        setResult(null);
        
        const apiKey = localStorage.getItem('chari_api_key') || 'sk_test_dummy';
        const url = `${BASE_URL}/api/v1/customer/unregister`;
        const body = { phoneNumber: phone };
        
        try {
            const response = await fetch(url, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${apiKey}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(body)
            });
            
            const data = await response.json();
            setResult({
                method: 'DELETE',
                url,
                status: response.status,
                response: data
            });
        } catch (err: any) {
            setResult({
                method: 'DELETE',
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
                title="Unregister Customer" 
                description="Permanently delete a customer account and all associated data"
                icon={UserX}
            >
                <form onSubmit={handleUnregister} className="space-y-6">
                    <div className="p-4 bg-chari-red/5 border border-chari-red/20 rounded-xl flex items-start gap-3 mb-2">
                        <AlertTriangle className="w-5 h-5 text-chari-red shrink-0 mt-0.5" />
                        <div className="space-y-1">
                            <p className="text-sm font-bold text-chari-red">Danger Zone</p>
                            <p className="text-xs text-neutral-500 dark:text-neutral-400 font-medium leading-relaxed">
                                This action is irreversible. The customer's balance and transaction history will be permanently deleted.
                            </p>
                        </div>
                    </div>

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

                    <div className="flex items-center gap-3 p-3 bg-neutral-100 dark:bg-neutral-800/50 rounded-xl cursor-pointer hover:bg-neutral-200 dark:hover:bg-neutral-800 transition-colors"
                         onClick={() => setIsConfirmed(!isConfirmed)}>
                        <div className={`w-5 h-5 rounded border-2 flex items-center justify-center transition-colors ${isConfirmed ? 'bg-chari-red border-chari-red' : 'border-neutral-300'}`}>
                            {isConfirmed && <div className="w-2 h-2 bg-white rounded-full" />}
                        </div>
                        <span className="text-xs font-semibold text-neutral-600 dark:text-neutral-400">
                            I understand that this action will delete the customer account
                        </span>
                    </div>
                    {error && !phone && <p className="text-xs text-chari-red font-medium">{error}</p>}
                    {error && phone && !isConfirmed && <p className="text-xs text-chari-red font-medium">{error}</p>}
                    
                    <button
                        type="submit"
                        disabled={isLoading || !isConfirmed}
                        className={`btn-primary bg-chari-red hover:bg-chari-red/90 border-chari-red w-full py-3.5 flex items-center justify-center gap-2 shadow-chari-red/20 mt-4 ${!isConfirmed ? 'opacity-50 grayscale' : ''}`}
                    >
                        {isLoading ? (
                            <>
                                <Loader2 className="w-5 h-5 animate-spin" />
                                Deleting...
                            </>
                        ) : (
                            <>
                                <UserX className="w-5 h-5" />
                                Permanently Unregister
                            </>
                        )}
                    </button>
                </form>
            </TabContentWrapper>

            {result && <ApiResultDisplay {...result} />}
        </div>
    );
};
