import React, { useState } from 'react';
import { ArrowDownCircle, Loader2, CheckCircle } from 'lucide-react';
import { validatePhone } from '../../utils/kycValidation';

interface CashInTabProps {
    onSubmit: (data: any) => void;
    isLoading: boolean;
}

export const CashInTab: React.FC<CashInTabProps> = ({ onSubmit, isLoading }) => {
    const [phone, setPhone] = useState('');
    const [amount, setAmount] = useState('');
    const [reference, setReference] = useState('');
    const [errors, setErrors] = useState<{ phone?: string; amount?: string }>({});

    const handlePhoneChange = (val: string) => {
        setPhone(val);
        const result = validatePhone(val);
        setErrors(prev => ({ ...prev, phone: result.isValid ? undefined : result.error }));
    };

    const handleAmountChange = (val: string) => {
        setAmount(val);
        const amt = parseFloat(val);
        setErrors(prev => ({ 
            ...prev, 
            amount: amt > 0 ? undefined : 'Amount must be greater than 0' 
        }));
    };

    const handleExecute = () => {
        const phoneResult = validatePhone(phone);
        const amountNum = parseFloat(amount);
        
        const newErrors = {
            phone: phoneResult.isValid ? undefined : phoneResult.error,
            amount: amountNum > 0 ? undefined : 'Amount is required and must be > 0'
        };

        if (newErrors.phone || newErrors.amount) {
            setErrors(newErrors);
            return;
        }

        onSubmit({ phone, amount: amountNum, reference, currency: 'MAD' });
    };

    return (
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="space-y-1">
                <div className="flex items-center gap-3">
                    <ArrowDownCircle className="w-6 h-6 text-chari-blue-600" />
                    <h2 className="text-xl font-black uppercase tracking-tight text-neutral-900 dark:text-neutral-100">
                        Cash In
                    </h2>
                </div>
                <p className="text-sm text-neutral-500 dark:text-neutral-400 font-medium">
                    Add funds to a customer's wallet instantly via sandbox API
                </p>
                <div className="pt-1">
                    <span className="text-[10px] font-mono font-bold text-neutral-400 uppercase bg-neutral-100 dark:bg-neutral-800 px-2 py-0.5 rounded">
                        POST /api/v1/payments/cash-in
                    </span>
                </div>
            </div>

            <div className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-1.5">
                        <label className={`block text-[10px] font-black uppercase tracking-widest ${errors.phone ? 'text-chari-red' : 'text-neutral-500'}`}>
                            Customer Phone *
                        </label>
                        <input
                            type="text"
                            value={phone}
                            onChange={(e) => handlePhoneChange(e.target.value)}
                            placeholder="+2126xxxxxxxx"
                            className={`input-base ${errors.phone ? 'border-chari-red focus:ring-chari-red/30' : ''}`}
                        />
                        {errors.phone && <p className="text-[10px] text-chari-red font-bold">{errors.phone}</p>}
                    </div>

                    <div className="space-y-1.5">
                        <label className={`block text-[10px] font-black uppercase tracking-widest ${errors.amount ? 'text-chari-red' : 'text-neutral-500'}`}>
                            Amount (MAD) *
                        </label>
                        <input
                            type="number"
                            min="1"
                            step="0.01"
                            value={amount}
                            onChange={(e) => handleAmountChange(e.target.value)}
                            placeholder="0.00"
                            className={`input-base ${errors.amount ? 'border-chari-red focus:ring-chari-red/30' : ''}`}
                        />
                        {errors.amount && <p className="text-[10px] text-chari-red font-bold">{errors.amount}</p>}
                    </div>
                </div>

                <div className="space-y-1.5">
                    <label className="block text-[10px] font-black uppercase tracking-widest text-neutral-500">
                        Reference / Note (Optional)
                    </label>
                    <input
                        type="text"
                        value={reference}
                        onChange={(e) => setReference(e.target.value)}
                        placeholder="Internal transaction ref..."
                        className="input-base"
                    />
                </div>

                <button
                    onClick={handleExecute}
                    disabled={isLoading || !!errors.phone || !!errors.amount || !phone || !amount}
                    className={`btn-primary w-full py-4 flex items-center justify-center gap-2 shadow-chari-blue-600/20 text-md uppercase font-black ${isLoading || !!errors.phone || !!errors.amount || !phone || !amount ? 'opacity-60 cursor-not-allowed grayscale' : ''}`}
                >
                    {isLoading ? (
                        <>
                            <Loader2 className="w-5 h-5 animate-spin" />
                            Executing Funds...
                        </>
                    ) : (
                        <>
                            <CheckCircle className="w-5 h-5" />
                            Execute Cash In
                        </>
                    )}
                </button>
            </div>
        </div>
    );
};
