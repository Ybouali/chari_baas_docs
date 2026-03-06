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
        <div className="w-full max-w-3xl mx-auto my-8">
            <div className="bg-chari-blue-700 rounded-xl overflow-hidden border border-chari-blue-200 shadow-card">
                {/* Header */}
                <div className="bg-chari-blue-700 px-5 py-3 flex items-center justify-between">
                    <span className="text-chari-blue-100 font-medium text-sm">
                        Example cURL Request — Register Customer
                    </span>
                </div>

                {/* Code block */}
                <div className="relative">
                    <pre className="p-6 text-sm leading-6 text-chari-blue-900 font-mono overflow-x-auto bg-chari-blue-400 ">
                        <code>{curlCommand}</code>
                    </pre>

                    {/* Copy button */}
                    <button
                        onClick={copyToClipboard}
                        className={`
              absolute top-4 right-4 p-2 rounded-lg 
              transition-all duration-200
              ${
                  copied
                      ? 'bg-chari-green text-white'
                      : 'bg-chari-blue-100 hover:bg-chari-blue-200 text-chari-blue-700'
              }
              shadow-card hover:shadow-card-hover
            `}
                        title="Copy to clipboard"
                        aria-label="Copy cURL command"
                    >
                        {copied ? (
                            <Check className="w-5 h-5" />
                        ) : (
                            <Copy className="w-5 h-5" />
                        )}
                    </button>

                    {/* Success toast */}
                    {copied && (
                        <div
                            className="
              absolute bottom-4 right-4 
              bg-chari-green text-white 
              px-4 py-2 rounded-lg text-sm font-medium
              shadow-card animate-fade-in-out
            "
                        >
                            Copied!
                        </div>
                    )}
                </div>

                {/* Footer hint */}
                <div className="px-6 py-3 bg-chari-blue-50 border-t border-chari-blue-200 text-sm text-chari-blue-700">
                    Replace{' '}
                    <code className="font-semibold text-chari-orange-700">
                        YOUR_API_KEY
                    </code>{' '}
                    with your actual Chari API key
                </div>
            </div>
        </div>
    );
}
