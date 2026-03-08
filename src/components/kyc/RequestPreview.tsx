import React from 'react';

interface RequestPreviewProps {
    payload: any;
}

export const RequestPreview: React.FC<RequestPreviewProps> = ({ payload }) => {
    return (
        <div className="card bg-neutral-900 border-neutral-800 p-6 md:p-8 space-y-4">
            <div className="flex items-center justify-between">
                <h4 className="text-sm font-black uppercase tracking-widest text-neutral-400">
                    Live Request Preview
                </h4>
                <div className="px-2 py-0.5 bg-chari-blue-600/10 border border-chari-blue-600/20 rounded text-[9px] font-black text-chari-blue-400 uppercase">
                    Reactive Payload
                </div>
            </div>
            
            <pre className="json-viewer bg-neutral-950 p-4 rounded-xl border border-neutral-800 text-chari-blue-100/80 text-xs font-mono overflow-auto max-h-[300px] scrollbar-thin">
                {JSON.stringify(payload, null, 2)}
            </pre>
            
            <p className="text-[10px] text-neutral-500 font-medium italic">
                This object dynamically updates as you fill in the KYC form and upload documents.
            </p>
        </div>
    );
};
