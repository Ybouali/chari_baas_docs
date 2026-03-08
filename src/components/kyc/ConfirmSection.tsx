import React, { useRef } from 'react';
import { CheckCircle, Loader2, Camera, IdCard, Upload, Play } from 'lucide-react';

interface ConfirmSectionProps {
    phoneNumber: string;
    setPhoneNumber: (val: string) => void;
    otp: string;
    setOtp: (val: string) => void;
    cin: string;
    setCin: (val: string) => void;
    files: {
        cinFront: string;
        cinBack: string;
        selfie: string;
    };
    onFileChange: (type: 'cinFront' | 'cinBack' | 'selfie', file: File) => void;
    onSubmit: () => void;
    isLoading: boolean;
    onTestClick: () => void;
    errors?: {
        phone?: string;
        otp?: string;
        cin?: string;
        cinFront?: string;
        cinBack?: string;
        selfie?: string;
    };
}

export const ConfirmSection: React.FC<ConfirmSectionProps> = ({
    phoneNumber,
    setPhoneNumber,
    otp,
    setOtp,
    cin,
    setCin,
    files,
    onFileChange,
    onSubmit,
    isLoading,
    onTestClick,
    errors
}) => {
    const handleFileChange = (type: 'cinFront' | 'cinBack' | 'selfie') => (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            onFileChange(type, file);
        }
    };

    const hasErrors = errors && Object.keys(errors).length > 0;
    const isComplete = phoneNumber && otp.length === 6 && cin && files.cinFront && files.cinBack && files.selfie;

    return (
        <div className="card p-6 md:p-8 space-y-8">
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                    <div className="p-2 bg-neutral-100 dark:bg-neutral-900 rounded-lg">
                        <CheckCircle className="w-5 h-5 text-chari-blue-600" />
                    </div>
                    <div>
                        <h3 className="text-lg font-black tracking-tight text-neutral-900 dark:text-neutral-100 uppercase">
                            Confirmation
                        </h3>
                        <p className="text-[10px] font-mono text-neutral-500 uppercase tracking-widest">
                            POST /api/v1/kyc/confirm
                        </p>
                    </div>
                </div>
                <button 
                    onClick={onTestClick}
                    className="btn-secondary py-1 px-3 text-[10px] uppercase font-black tracking-tighter flex items-center gap-1.5"
                >
                    <Play className="w-3 h-3 fill-current" />
                    Simulate Submit
                </button>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-1.5">
                    <label className={`block text-xs font-black uppercase tracking-widest ${errors?.phone ? 'text-chari-red' : 'text-neutral-500'}`}>
                        Phone Number *
                    </label>
                    <input
                        type="text"
                        value={phoneNumber}
                        onChange={(e) => setPhoneNumber(e.target.value)}
                        placeholder="+2126xxxxxxx"
                        className={`input-base ${errors?.phone ? 'border-chari-red focus:border-chari-red focus:ring-chari-red/30' : ''}`}
                    />
                    {errors?.phone && <p className="text-xs text-chari-red font-bold">{errors.phone}</p>}
                </div>
                <div className="space-y-1.5">
                    <label className={`block text-xs font-black uppercase tracking-widest ${errors?.otp ? 'text-chari-red' : 'text-neutral-500'}`}>
                        OTP Code *
                    </label>
                    <input
                        type="text"
                        maxLength={6}
                        value={otp}
                        onChange={(e) => setOtp(e.target.value)}
                        placeholder="123456"
                        className={`input-base font-mono tracking-[0.5em] text-center ${errors?.otp ? 'border-chari-red focus:border-chari-red focus:ring-chari-red/30' : ''}`}
                    />
                    {errors?.otp && <p className="text-xs text-chari-red font-bold">{errors.otp}</p>}
                </div>
                <div className="md:col-span-2 space-y-1.5">
                    <label className={`block text-xs font-black uppercase tracking-widest ${errors?.cin ? 'text-chari-red' : 'text-neutral-500'}`}>
                        CIN Number *
                    </label>
                    <input
                        type="text"
                        value={cin}
                        onChange={(e) => setCin(e.target.value)}
                        placeholder="EE123456"
                        className={`input-base uppercase font-bold ${errors?.cin ? 'border-chari-red focus:border-chari-red focus:ring-chari-red/30' : ''}`}
                    />
                    {errors?.cin && <p className="text-xs text-chari-red font-bold">{errors.cin}</p>}
                </div>
            </div>

            <div className="space-y-4">
                <label className="block text-xs font-black uppercase tracking-widest text-neutral-500">
                    Documents Verification *
                </label>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <FileUploadCard 
                        label="CIN Front" 
                        icon={IdCard} 
                        preview={files.cinFront} 
                        onUpload={handleFileChange('cinFront')} 
                        error={errors?.cinFront}
                    />
                    <FileUploadCard 
                        label="CIN Back" 
                        icon={IdCard} 
                        preview={files.cinBack} 
                        onUpload={handleFileChange('cinBack')} 
                        error={errors?.cinBack}
                    />
                    <FileUploadCard 
                        label="Selfie" 
                        icon={Camera} 
                        preview={files.selfie} 
                        onUpload={handleFileChange('selfie')} 
                        error={errors?.selfie}
                    />
                </div>
            </div>

            <button
                onClick={onSubmit}
                disabled={isLoading || !isComplete || hasErrors}
                className={`btn-primary w-full py-4 flex items-center justify-center gap-2 shadow-chari-blue-600/20 text-md uppercase font-black ${isLoading || !isComplete || hasErrors ? 'opacity-60 cursor-not-allowed grayscale' : ''}`}
            >
                {isLoading ? (
                    <>
                        <Loader2 className="w-5 h-5 animate-spin" />
                        Submitting KYC...
                    </>
                ) : (
                    <>
                        <CheckCircle className="w-5 h-5" />
                        Finalize Verification
                    </>
                )}
            </button>
        </div>
    );
};

interface FileUploadCardProps {
    label: string;
    icon: any;
    preview: string;
    onUpload: (e: React.ChangeEvent<HTMLInputElement>) => void;
    error?: string;
}

const FileUploadCard: React.FC<FileUploadCardProps> = ({ label, icon: Icon, preview, onUpload, error }) => {
    const fileInputRef = useRef<HTMLInputElement>(null);

    return (
        <div className="space-y-2">
            <div 
                onClick={() => fileInputRef.current?.click()}
                className={`group relative h-40 border-2 border-dashed rounded-2xl flex flex-col items-center justify-center gap-2 cursor-pointer transition-all overflow-hidden
                    ${error ? 'border-chari-red bg-chari-red/5' : 'border-neutral-200 dark:border-neutral-800 hover:border-chari-blue-500 hover:bg-chari-blue-50/10'}
                `}
            >
                <input 
                    type="file" 
                    ref={fileInputRef} 
                    onChange={onUpload} 
                    accept="image/*" 
                    className="hidden" 
                />
                {preview ? (
                    <div className="absolute inset-0 w-full h-full p-1 bg-white dark:bg-neutral-900">
                        <img src={preview} alt={label} className="w-full h-full object-cover rounded-xl" />
                        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                            <Upload className="w-6 h-6 text-white" />
                        </div>
                    </div>
                ) : (
                    <>
                        <div className={`p-3 rounded-full transition-colors ${error ? 'bg-chari-red/20' : 'bg-neutral-50 dark:bg-neutral-900 group-hover:bg-chari-blue-50/50'}`}>
                            <Icon className={`w-5 h-5 ${error ? 'text-chari-red' : 'text-neutral-400 group-hover:text-chari-blue-600'}`} />
                        </div>
                        <span className={`text-[10px] font-black uppercase tracking-wider ${error ? 'text-chari-red' : 'text-neutral-500 group-hover:text-chari-blue-600'}`}>
                            {label}
                        </span>
                    </>
                )}
            </div>
            {error && <p className="text-[10px] text-chari-red font-bold text-center">{error}</p>}
        </div>
    );
};
