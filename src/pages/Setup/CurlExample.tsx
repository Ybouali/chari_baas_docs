import { Copy, Check } from 'lucide-react';
import { useState } from 'react';

export default function CurlExample() {
    const [copied, setCopied] = useState(false);

    const curlCommand = `curl -X POST https://api.charimoney.com/v1/customer/register \\
  -H "Authorization: Bearer YOUR_API_KEY" \\
  -H "Content-Type: application/json" \\
  -d '{
    "phoneNumber": "+212612345678",
    "firstName": "Ahmed",
    "lastName": "Bennani"
  }'`;

    const copyToClipboard = () => {
        navigator.clipboard.writeText(curlCommand);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };
    return (
        <div className="w-full max-w-7xl mx-auto">
            <div className="bg-neutral-900 rounded-2xl overflow-hidden border border-neutral-800 shadow-2xl">
                <div className="bg-neutral-800/50 px-6 py-4 flex items-center justify-between border-b border-neutral-700">
                    <div className="flex items-center gap-2">
                        <div className="flex gap-1.5">
                            <div className="w-3 h-3 rounded-full bg-chari-red/80" />
                            <div className="w-3 h-3 rounded-full bg-chari-orange-500/80" />
                            <div className="w-3 h-3 rounded-full bg-chari-green/80" />
                        </div>
                        <span className="text-neutral-400 font-medium text-xs ml-4 uppercase tracking-widest">
                            Example cURL Request — Register Customer
                        </span>
                    </div>
                </div>

                <div className="relative group">
                    <pre className="p-8 text-sm leading-relaxed text-chari-blue-100 font-mono overflow-x-auto bg-neutral-950/50">
                        <code className="text-indigo-300">curl</code> <code className="text-neutral-400">-X</code> <code className="text-chari-green">POST</code> <code className="text-chari-blue-300">https://api.charimoney.com/v1/customer/register</code> \<br />
                        <span className="opacity-60 pl-4">{`  -H "`}</span><code className="text-chari-orange-300">Authorization: Bearer YOUR_API_KEY</code><span className="opacity-60">{`" \\`}</span><br />
                        <span className="opacity-60 pl-4">{`  -H "`}</span><code className="text-chari-blue-400">Content-Type: application/json</code><span className="opacity-60">{`" \\`}</span><br />
                        <span className="opacity-60 pl-4">{`  -d '{`}</span><br />
                        <span className="pl-8 opacity-60">"phoneNumber": "</span><code className="text-chari-green-600">+212612345678</code><span className="opacity-60">",</span><br />
                        <span className="pl-8 opacity-60">"firstName": "</span><code className="text-chari-green-600">Ahmed</code><span className="opacity-60">",</span><br />
                        <span className="pl-8 opacity-60">"lastName": "</span><code className="text-chari-green-600">Bennani</code><br />
                        <span className="opacity-60 pl-4">{`  }'`}</span>
                    </pre>

                    <button
                        onClick={copyToClipboard}
                        className={`
              absolute top-6 right-6 p-2 rounded-xl 
              transition-all duration-300 backdrop-blur-md
              ${
                  copied
                      ? 'bg-chari-green text-white scale-110'
                      : 'bg-white/5 hover:bg-white/10 text-neutral-400 border border-white/10'
              }
            `}
                        title="Copy to clipboard"
                    >
                        {copied ? (
                            <Check className="w-5 h-5" />
                        ) : (
                            <Copy className="w-5 h-5" />
                        )}
                    </button>
                </div>

                <div className="px-8 py-4 bg-neutral-900 border-t border-neutral-800 flex items-center gap-3">
                    <div className="w-2 h-2 rounded-full bg-chari-blue-500 animate-pulse" />
                    <p className="text-sm text-neutral-400">
                        Replace{' '}
                        <code className="font-bold text-chari-orange-400 bg-chari-orange-400/10 px-1.5 py-0.5 rounded">
                            YOUR_API_KEY
                        </code>{' '}
                        with your actual Chari API key from the dashboard.
                    </p>
                </div>
            </div>
        </div>
    );
}
