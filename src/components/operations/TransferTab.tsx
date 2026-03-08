import React, { useState } from 'react';
import { Send, Loader2, CheckCircle } from 'lucide-react';
import { validatePhone } from '../../utils/kycValidation';

interface TransferTabProps {
    onSubmit: (data: any) => void;
    isLoading: boolean;
}

export const TransferTab: React.FC<TransferTabProps> = ({ onSubmit, isLoading }) => {
    const [fromPhone, setFromPhone] = useState('');
    const [toPhone, setToPhone] = useState('');
    const [amount, setAmount] = useState('');
    const [reason, setReason] = useState('');
    const [errors, setErrors] = useState<{ fromPhone?: string; toPhone?: string; amount?: string }>({});

    const handleExecute = () => {
        const fromResult = validatePhone(fromPhone);
        const toResult = validatePhone(toPhone);
        const amountNum = parseFloat(amount);
        
        const newErrors = {
            fromPhone: fromResult.isValid ? undefined : fromResult.error,
            toPhone: toResult.isValid ? undefined : toResult.error,
            amount: (amountNum > 0) ? undefined : 'Amount must be > 0'
        };

        if (newErrors.fromPhone || newErrors.toPhone || newErrors.amount) {
            setErrors(newErrors);
            return;
        }

        onSubmit({ fromPhone, toPhone, amount: amountNum, reason, currency: 'MAD' });
    };

    return (
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="space-y-1">
                <div className="flex items-center gap-3">
                    <Send className="w-6 h-6 text-chari-blue-600" />
                    <h2 className="text-xl font-black uppercase tracking-tight text-neutral-900 dark:text-neutral-100">
                        Transfer (P2P)
                    </h2>
                </div>
                <p className="text-sm text-neutral-500 dark:text-neutral-400 font-medium">
                    Move funds instantly between two customer wallets
                </p>
                <div className="pt-1">
                    <span className="text-[10px] font-mono font-bold text-neutral-400 uppercase bg-neutral-100 dark:bg-neutral-800 px-2 py-0.5 rounded">
                        POST /api/v1/payments/transfer
                    </span>
                </div>
            </div>

            <div className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-1.5">
                        <label className={`block text-[10px] font-black uppercase tracking-widest ${errors.fromPhone ? 'text-chari-red' : 'text-neutral-500'}`}>
                            Sender Phone *
                        </label>
                        <input
                            type="text"
                            value={fromPhone}
                            onChange={(e) => setFromPhone(e.target.value)}
                            placeholder="+2126xxxxxxxx"
                            className={`input-base ${errors.fromPhone ? 'border-chari-red focus:ring-chari-red/30' : ''}`}
                        />
                        {errors.fromPhone && <p className="text-[10px] text-chari-red font-bold">{errors.fromPhone}</p>}
                    </div>

                    <div className="space-y-1.5">
                        <label className={`block text-[10px] font-black uppercase tracking-widest ${errors.toPhone ? 'text-chari-red' : 'text-neutral-500'}`}>
                            Receiver Phone *
                        </label>
                        <input
                            type="text"
                            value={toPhone}
                            onChange={(e) => setToPhone(e.target.value)}
                            placeholder="+2126xxxxxxxx"
                            className={`input-base ${errors.toPhone ? 'border-chari-red focus:ring-chari-red/30' : ''}`}
                        />
                        {errors.toPhone && <p className="text-[10px] text-chari-red font-bold">{errors.toPhone}</p>}
                    </div>

                    <div className="md:col-span-2 space-y-1.5">
                        <label className={`block text-[10px] font-black uppercase tracking-widest ${errors.amount ? 'text-chari-red' : 'text-neutral-500'}`}>
                            Amount (MAD) *
                        </label>
                        <input
                            type="number"
                            min="1"
                            step="0.01"
                            value={amount}
                            onChange={(e) => setAmount(e.target.value)}
                            placeholder="0.00"
                            className={`input-base ${errors.amount ? 'border-chari-red focus:ring-chari-red/30' : ''}`}
                        />
                        {errors.amount && <p className="text-[10px] text-chari-red font-bold">{errors.amount}</p>}
                    </div>
                </div>

                <div className="space-y-1.5">
                    <label className="block text-[10px] font-black uppercase tracking-widest text-neutral-500">
                        Reason / Description (Optional)
                    </label>
                    <input
                        type="text"
                        value={reason}
                        onChange={(e) => setReason(e.target.value)}
                        placeholder="Gift, Payment for service, etc."
                        className="input-base"
                    />
                </div>

                <button
                    onClick={handleExecute}
                    disabled={isLoading}
                    className="btn-primary w-full py-4 flex items-center justify-center gap-2 shadow-chari-blue-600/20 text-md uppercase font-black"
                >
                    {isLoading ? (
                        <>
                            <Loader2 className="w-5 h-5 animate-spin" />
                            Transferring...
                        </>
                    ) : (
                        <>
                            <Send className="w-5 h-5" />
                            Send Transfer
                        </>
                    )}
                </button>
            </div>
        </div>
    );
};
