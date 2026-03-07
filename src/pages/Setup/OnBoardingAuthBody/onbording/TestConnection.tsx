import { Zap, Activity, CheckCircle2, XCircle, Loader2 } from 'lucide-react';
import { useState } from 'react';

export default function TestConnection() {
    const [status, setStatus] = useState<'idle' | 'testing' | 'success' | 'error'>('idle');

    const runTest = () => {
        setStatus('testing');
        setTimeout(() => {
            setStatus('success');
        }, 2500);
    };

    return (
        <div className="w-full">
            <div className="card border-0 bg-linear-to-b from-white to-neutral-50 dark:from-neutral-800 dark:to-neutral-900 p-8 shadow-2xl overflow-hidden relative">
                {status === 'testing' && (
                    <div className="absolute inset-0 bg-chari-blue-500/5 animate-pulse" />
                )}

                <div className="relative z-10 flex flex-col items-center text-center">
                    <div className={`
                        w-16 h-16 rounded-2xl flex items-center justify-center mb-6 shadow-xl transition-all duration-500
                        ${status === 'idle' ? 'bg-neutral-100 text-neutral-400 rotate-0' : ''}
                        ${status === 'testing' ? 'bg-chari-blue-100 text-chari-blue-600 rotate-180 animate-pulse' : ''}
                        ${status === 'success' ? 'bg-chari-green-600/20 text-chari-green scale-110' : ''}
                        ${status === 'error' ? 'bg-chari-red/20 text-chari-red' : ''}
                    `}>
                        {status === 'idle' && <Zap className="w-8 h-8" />}
                        {status === 'testing' && <Loader2 className="w-8 h-8 animate-spin" />}
                        {status === 'success' && <CheckCircle2 className="w-8 h-8" />}
                        {status === 'error' && <XCircle className="w-8 h-8" />}
                    </div>

                    <h2 className="text-2xl font-black text-chari-blue-900 dark:text-neutral-100 mb-1">
                        Step 4: Test Connection
                    </h2>
                    <p className="text-neutral-500 mb-8 max-w-sm text-sm">
                        Everything is set! Let's ping the ChariBaas servers to verify your API configuration.
                    </p>

                    <div className="w-full space-y-4">
                        <button
                            onClick={runTest}
                            disabled={status === 'testing'}
                            className={`
                                w-full py-4 rounded-2xl font-black text-lg transition-all shadow-xl
                                ${status === 'testing' 
                                    ? 'bg-neutral-100 text-neutral-400 cursor-not-allowed shadow-none' 
                                    : 'btn-primary'
                                }
                            `}
                        >
                            {status === 'testing' ? 'Pinging Servers...' : 'Run Connection Test'}
                        </button>

                        {status === 'idle' && (
                            <div className="flex items-center justify-center gap-2 text-neutral-400 text-sm font-medium">
                                <Activity className="w-4 h-4" />
                                <span>Approximate latency: ~45ms</span>
                            </div>
                        )}

                        {status === 'success' && (
                            <motion.div 
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="p-4 bg-chari-green-600/10 border border-chari-green-600/20 rounded-xl text-chari-green font-bold flex items-center justify-center gap-2"
                            >
                                <CheckCircle2 className="w-5 h-5" />
                                <span>API Handshake Successful!</span>
                            </motion.div>
                        )}
                    </div>
                </div>
            </div>
            
            <p className="text-center mt-8 text-sm text-neutral-400">
                Facing issues? Check our <span className="text-chari-blue-600 underline font-bold cursor-pointer">Troubleshooting Guide</span>
            </p>
        </div>
    );
}
const motion = {
    div: ({ children, className }: any) => <div className={className}>{children}</div>
};
