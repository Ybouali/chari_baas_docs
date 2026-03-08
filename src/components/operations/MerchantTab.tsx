import React, { useState } from 'react';
import { CreditCard, Loader2 } from 'lucide-react';
import { validatePhone } from '../../utils/kycValidation';

interface MerchantTabProps {
    onSubmit: (data: any) => void;
    isLoading: boolean;
}

export const MerchantTab: React.FC<MerchantTabProps> = ({ onSubmit, isLoading }) => {
    const [merchantId, setMerchantId] = useState('');
    const [phone, setPhone] = useState('');
    const [amount, setAmount] = useState('');
    const [invoiceRef, setInvoiceRef] = useState('');
    const [errors, setErrors] = useState<{ merchantId?: string; phone?: string; amount?: string }>({});

    const handleExecute = () => {
        const phoneResult = validatePhone(phone);
        const amountNum = parseFloat(amount);
        
        const newErrors = {
            merchantId: merchantId.length >= 4 ? undefined : 'Valid Merchant ID is required',
            phone: phoneResult.isValid ? undefined : phoneResult.error,
            amount: (amountNum > 0) ? undefined : 'Amount must be > 0'
        };

        if (newErrors.merchantId || newErrors.phone || newErrors.amount) {
            setErrors(newErrors);
            return;
        }

        onSubmit({ merchantId, phone, amount: amountNum, invoiceRef, currency: 'MAD' });
    };

    return (
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="space-y-1">
                <div className="flex items-center gap-3">
                    <CreditCard className="w-6 h-6 text-chari-blue-600" />
                    <h2 className="text-xl font-black uppercase tracking-tight text-neutral-900 dark:text-neutral-100">
                        Merchant Payment
                    </h2>
                </div>
                <p className="text-sm text-neutral-500 dark:text-neutral-400 font-medium">
                    Execute a payment from customer wallet to a merchant ID
                </p>
                <div className="pt-1">
                    <span className="text-[10px] font-mono font-bold text-neutral-400 uppercase bg-neutral-100 dark:bg-neutral-800 px-2 py-0.5 rounded">
                        POST /api/v1/payments/merchant
                    </span>
                </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-1.5">
                    <label className={`block text-[10px] font-black uppercase tracking-widest ${errors.merchantId ? 'text-chari-red' : 'text-neutral-500'}`}>
                        Merchant ID / Code *
                    </label>
                    <input
                        type="text"
                        value={merchantId}
                        onChange={(e) => setMerchantId(e.target.value)}
                        placeholder="M-123456"
                        className={`input-base ${errors.merchantId ? 'border-chari-red' : ''}`}
                    />
                    {errors.merchantId && <p className="text-[10px] text-chari-red font-bold">{errors.merchantId}</p>}
                </div>

                <div className="space-y-1.5">
                    <label className={`block text-[10px] font-black uppercase tracking-widest ${errors.phone ? 'text-chari-red' : 'text-neutral-500'}`}>
                        Customer Phone *
                    </label>
                    <input
                        type="text"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
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
                        value={amount}
                        onChange={(e) => setAmount(e.target.value)}
                        placeholder="0.00"
                        className={`input-base ${errors.amount ? 'border-chari-red' : ''}`}
                    />
                    {errors.amount && <p className="text-[10px] text-chari-red font-bold">{errors.amount}</p>}
                </div>

                <div className="space-y-1.5">
                    <label className="block text-[10px] font-black uppercase tracking-widest text-neutral-500">
                        Invoice Ref (Optional)
                    </label>
                    <input
                        type="text"
                        value={invoiceRef}
                        onChange={(e) => setInvoiceRef(e.target.value)}
                        placeholder="INV-2024-001"
                        className="input-base"
                    />
                </div>
            </div>

            <button
                onClick={handleExecute}
                disabled={isLoading}
                className="btn-primary w-full py-4 flex items-center justify-center gap-2 shadow-chari-blue-600/20 text-md uppercase font-black"
            >
                {isLoading ? (
                    <>
                        <Loader2 className="w-5 h-5 animate-spin" />
                        Processing Payment...
                    </>
                ) : (
                    <>
                        <CreditCard className="w-5 h-5" />
                        Execute Payment
                    </>
                )}
            </button>
        </div>
    );
};
