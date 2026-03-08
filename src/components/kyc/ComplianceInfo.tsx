import React from 'react';
import { ShieldCheck } from 'lucide-react';

export const ComplianceInfo: React.FC = () => {
    return (
        <div className="card p-6 md:p-8 bg-white dark:bg-neutral-800">
            <div className="flex items-start gap-4">
                <div className="p-3 bg-chari-blue-50 dark:bg-chari-blue-900/20 rounded-2xl">
                    <ShieldCheck className="w-6 h-6 text-chari-blue-600" />
                </div>
                <div className="space-y-3">
                    <h2 className="text-xl font-bold text-neutral-900 dark:text-neutral-100 tracking-tight">
                        Moroccan Regulatory Compliance
                    </h2>
                    <p className="text-neutral-600 dark:text-neutral-400 font-medium leading-relaxed">
                        All customers must complete KYC verification as per Bank Al-Maghrib regulations. 
                        The <span className="text-chari-blue-600 font-bold">CNI (Carte d'Identité Nationale)</span> is 
                        the primary document required for all Moroccan residents to access digital financial services.
                    </p>
                    <div className="flex flex-wrap gap-2 pt-2">
                        <span className="px-3 py-1 bg-neutral-100 dark:bg-neutral-900 rounded-full text-[10px] font-black uppercase text-neutral-500 tracking-widest border border-neutral-200 dark:border-neutral-800">
                            Bank Al-Maghrib
                        </span>
                        <span className="px-3 py-1 bg-neutral-100 dark:bg-neutral-900 rounded-full text-[10px] font-black uppercase text-neutral-500 tracking-widest border border-neutral-200 dark:border-neutral-800">
                            Security First
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
};
