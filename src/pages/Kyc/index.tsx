import { useState, useEffect } from 'react';
import { AlertCircle } from 'lucide-react';

import { KycHeader } from '../../components/kyc/KycHeader';
import { ComplianceInfo } from '../../components/kyc/ComplianceInfo';
import { AuthSection } from '../../components/kyc/AuthSection';
import { ConfirmSection } from '../../components/kyc/ConfirmSection';
import { RequestPreview } from '../../components/kyc/RequestPreview';
import { ErrorCodes } from '../../components/kyc/ErrorCodes';
import { ApiResultDisplay } from '../../components/common/ApiResultDisplay';

import { validatePhone, validateOtp, validateCin, validateFile } from '../../utils/kycValidation';

const BASE_URL = 'https://api-sandbox.charimoney.com';

interface KycErrors {
    phone?: string;
    otp?: string;
    cin?: string;
    cinFront?: string;
    cinBack?: string;
    selfie?: string;
}

export default function KYC() {
    const [phoneNumber, setPhoneNumber] = useState('');
    const [otp, setOtp] = useState('');
    const [cin, setCin] = useState('');
    const [files, setFiles] = useState({
        cinFront: '',
        cinBack: '',
        selfie: ''
    });
    
    const [errors, setErrors] = useState<KycErrors>({});
    const [isLoading, setIsLoading] = useState(false);
    const [apiResult, setApiResult] = useState<any>(null);

    useEffect(() => {
        if (phoneNumber) {
            const result = validatePhone(phoneNumber);
            setErrors(prev => ({ ...prev, phone: result.isValid ? undefined : result.error }));
        } else {
            setErrors(prev => ({ ...prev, phone: undefined }));
        }
    }, [phoneNumber]);

    useEffect(() => {
        if (otp) {
            const result = validateOtp(otp);
            setErrors(prev => ({ ...prev, otp: result.isValid ? undefined : result.error }));
        } else {
            setErrors(prev => ({ ...prev, otp: undefined }));
        }
    }, [otp]);

    useEffect(() => {
        if (cin) {
            const result = validateCin(cin);
            setErrors(prev => ({ ...prev, cin: result.isValid ? undefined : result.error }));
        } else {
            setErrors(prev => ({ ...prev, cin: undefined }));
        }
    }, [cin]);

    const handleFileChange = (type: 'cinFront' | 'cinBack' | 'selfie', file: File) => {
        const labelMap = { cinFront: 'CIN Front', cinBack: 'CIN Back', selfie: 'Selfie' };
        const result = validateFile(file, labelMap[type]);
        
        if (!result.isValid) {
            setErrors(prev => ({ ...prev, [type]: result.error }));
            setFiles(prev => ({ ...prev, [type]: '' }));
            return;
        }

        setErrors(prev => ({ ...prev, [type]: undefined }));
        const reader = new FileReader();
        reader.onloadend = () => {
            setFiles(prev => ({ ...prev, [type]: reader.result as string }));
        };
        reader.readAsDataURL(file);
    };

    const handleSendOtp = async () => {
        const phoneVal = validatePhone(phoneNumber);
        if (!phoneVal.isValid) {
            setErrors(prev => ({ ...prev, phone: phoneVal.error }));
            return;
        }

        setIsLoading(true);
        setApiResult(null);
        
        const apiKey = localStorage.getItem('chari_api_key') || 'sk_test_dummy';
        const url = `${BASE_URL}/api/v1/kyc/auth`;
        const body = { phoneNumber };

        try {
            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${apiKey}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(body)
            });
            
            const data = await response.json();
            setApiResult({ method: 'POST', url, status: response.status, response: data });
        } catch (err: any) {
            setApiResult({ method: 'POST', url, status: 500, error: err.message || 'Connection failed' });
        } finally {
            setIsLoading(false);
        }
    };

    const handleSubmitKyc = async () => {
        const phoneVal = validatePhone(phoneNumber);
        const otpVal = validateOtp(otp);
        const cinVal = validateCin(cin);
        
        const newErrors: KycErrors = {
            phone: phoneVal.isValid ? undefined : phoneVal.error,
            otp: otpVal.isValid ? undefined : otpVal.error,
            cin: cinVal.isValid ? undefined : cinVal.error,
            cinFront: files.cinFront ? undefined : 'CIN Front is required',
            cinBack: files.cinBack ? undefined : 'CIN Back is required',
            selfie: files.selfie ? undefined : 'Selfie is required',
        };

        if (Object.values(newErrors).some(e => !!e)) {
            setErrors(newErrors);
            window.scrollTo({ top: 0, behavior: 'smooth' });
            return;
        }

        setIsLoading(true);
        setApiResult(null);
        
        const apiKey = localStorage.getItem('chari_api_key') || 'sk_test_dummy';
        const url = `${BASE_URL}/api/v1/kyc/confirm`;
        const body = {
            phoneNumber,
            cin,
            otp,
            documents: {
                cinFront: files.cinFront,
                cinBack: files.cinBack,
                selfie: files.selfie
            }
        };

        try {
            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${apiKey}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(body)
            });
            
            const data = await response.json();
            setApiResult({ method: 'POST', url, status: response.status, response: data });
        } catch (err: any) {
            setApiResult({ method: 'POST', url, status: 500, error: err.message || 'Connection failed' });
        } finally {
            setIsLoading(false);
        }
    };

    const hasErrors = Object.values(errors).some(e => !!e);
    
    const previewObject = hasErrors ? { error: "Form contains validation errors" } : {
        phoneNumber,
        cin: cin || 'Pending...',
        otp: otp || 'Pending...',
        documents: {
            cinFront: files.cinFront ? 'data:image/...;base64,...' : null,
            cinBack: files.cinBack ? 'data:image/...;base64,...' : null,
            selfie: files.selfie ? 'data:image/...;base64,...' : null
        }
    };

    const hasApiKey = !!localStorage.getItem('chari_api_key');

    return (
        <div className="min-h-screen bg-neutral-50 dark:bg-neutral-900 px-4 py-8 md:py-16">
            <div className="max-w-4xl mx-auto space-y-12">
                <KycHeader />

                {hasErrors && (
                    <div className="p-4 bg-chari-red/5 border border-chari-red/20 rounded-2xl flex items-center gap-3 animate-in fade-in slide-in-from-top-4">
                        <AlertCircle className="w-5 h-5 text-chari-red shrink-0" />
                        <p className="text-sm font-bold text-chari-red">Please fix the validation errors below before submitting.</p>
                    </div>
                )}

                {!hasApiKey && (
                    <div className="p-4 bg-chari-orange-50 dark:bg-chari-orange-900/10 border border-chari-orange-200 dark:border-chari-orange-800/30 rounded-2xl flex items-start gap-3">
                        <AlertCircle className="w-5 h-5 text-chari-orange-500 shrink-0 mt-0.5" />
                        <div className="space-y-1">
                            <p className="text-sm font-black text-neutral-900 dark:text-neutral-100 uppercase">Proactive Mode Enabled</p>
                            <p className="text-xs text-neutral-500 dark:text-neutral-400 font-medium leading-relaxed">
                                No API Key found in storage. The system will use <span className="text-chari-blue-600 font-bold">sk_test_dummy</span> for simulated requests. 
                                Configure your real key in <a href="/setup" className="underline font-bold text-chari-blue-600">Setup</a> for live validation.
                            </p>
                        </div>
                    </div>
                )}

                <ComplianceInfo />

                <div className="grid grid-cols-1 gap-10">
                    <AuthSection 
                        phoneNumber={phoneNumber}
                        setPhoneNumber={setPhoneNumber}
                        onSendOtp={handleSendOtp}
                        isLoading={isLoading}
                        onTestClick={() => {}}
                        errors={errors}
                    />

                    <ConfirmSection 
                        phoneNumber={phoneNumber}
                        setPhoneNumber={setPhoneNumber}
                        otp={otp}
                        setOtp={setOtp}
                        cin={cin}
                        setCin={setCin}
                        files={files}
                        onFileChange={handleFileChange}
                        onSubmit={handleSubmitKyc}
                        isLoading={isLoading}
                        onTestClick={() => {}}
                        errors={errors}
                    />

                    <RequestPreview payload={previewObject} />

                    <ErrorCodes />
                </div>

                {apiResult && <ApiResultDisplay {...apiResult} />}
            </div>
        </div>
    );
}

