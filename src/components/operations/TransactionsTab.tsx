import React from 'react';
import { List, Search, Clock, CheckCircle2, XCircle } from 'lucide-react';

export const TransactionsTab: React.FC = () => {
    const transactions = [
        { id: 'TX-8821', type: 'Cash In', amount: '250.00', status: 'Success', date: '2024-03-08 10:15', phone: '+212612345678' },
        { id: 'TX-8820', type: 'Transfer', amount: '1,200.00', status: 'Success', date: '2024-03-08 09:42', phone: '+212687654321' },
        { id: 'TX-8819', type: 'Merchant', amount: '45.00', status: 'Failed', date: '2024-03-07 18:30', phone: '+212612345678' },
        { id: 'TX-8818', type: 'Virement', amount: '3,500.00', status: 'Pending', date: '2024-03-07 14:20', phone: '+212699887766' },
    ];

    return (
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="space-y-1">
                    <div className="flex items-center gap-3">
                        <List className="w-6 h-6 text-chari-blue-600" />
                        <h2 className="text-xl font-black uppercase tracking-tight text-neutral-900 dark:text-neutral-100">
                            Operations History
                        </h2>
                    </div>
                    <p className="text-sm text-neutral-500 dark:text-neutral-400 font-medium">
                        Recent activity across all payment channels
                    </p>
                </div>
                
                <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400" />
                    <input 
                        type="text" 
                        placeholder="Search ID, phone..." 
                        className="input-base py-2 pl-10 text-xs w-full md:w-64"
                    />
                </div>
            </div>

            <div className="bg-neutral-50 dark:bg-neutral-900/50 rounded-2xl border border-neutral-100 dark:border-neutral-800 overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead>
                            <tr className="border-b border-neutral-100 dark:border-neutral-800 bg-neutral-100/50 dark:bg-neutral-800/50">
                                <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-neutral-500">Reference</th>
                                <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-neutral-500">Type</th>
                                <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-neutral-500">Phone</th>
                                <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-neutral-500">Amount</th>
                                <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-neutral-500">Status</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-neutral-100 dark:divide-neutral-800">
                            {transactions.map((tx) => (
                                <tr key={tx.id} className="hover:bg-neutral-100/30 dark:hover:bg-neutral-800/30 transition-colors">
                                    <td className="px-6 py-4">
                                        <span className="text-sm font-bold font-mono text-neutral-900 dark:text-neutral-100">{tx.id}</span>
                                        <p className="text-[10px] text-neutral-500 font-medium">{tx.date}</p>
                                    </td>
                                    <td className="px-6 py-4">
                                        <span className="text-xs font-black uppercase tracking-wider text-chari-blue-600">{tx.type}</span>
                                    </td>
                                    <td className="px-6 py-4 text-sm font-medium text-neutral-600 dark:text-neutral-400">
                                        {tx.phone}
                                    </td>
                                    <td className="px-6 py-4 text-sm font-black text-neutral-900 dark:text-neutral-100">
                                        {tx.amount} <span className="text-[10px] font-bold text-neutral-400">MAD</span>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-2">
                                            {tx.status === 'Success' && <CheckCircle2 className="w-4 h-4 text-chari-green" />}
                                            {tx.status === 'Failed' && <XCircle className="w-4 h-4 text-chari-red" />}
                                            {tx.status === 'Pending' && <Clock className="w-4 h-4 text-chari-orange-500" />}
                                            <span className={`text-[10px] font-black uppercase tracking-widest
                                                ${tx.status === 'Success' ? 'text-chari-green' : ''}
                                                ${tx.status === 'Failed' ? 'text-chari-red' : ''}
                                                ${tx.status === 'Pending' ? 'text-chari-orange-500' : ''}
                                            `}>
                                                {tx.status}
                                            </span>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
            
            <p className="text-center text-[10px] text-neutral-500 font-medium italic">
                Showing 4 most recent operations. Upgrade to merchant portal for full ledger.
            </p>
        </div>
    );
};
