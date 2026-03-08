
export const MOROCCAN_PHONE_REGEX = /^(\+212|06|07)[0-9]{8}$/;

export const MOROCCAN_CIN_REGEX = /^[A-Z]{2,3}[0-9]{6}$/i;

export interface ValidationResult {
    isValid: boolean;
    error?: string;
}

export const validatePhone = (phone: string): ValidationResult => {
    if (!phone) return { isValid: false, error: 'Phone number is required' };
    if (!MOROCCAN_PHONE_REGEX.test(phone)) {
        return { isValid: false, error: 'Invalid Moroccan phone number (use +2126xxxxxxxx or 06xxxxxxxx)' };
    }
    return { isValid: true };
};

export const validateOtp = (otp: string): ValidationResult => {
    if (!otp) return { isValid: false, error: 'OTP is required' };
    if (!/^[0-9]{6}$/.test(otp)) {
        return { isValid: false, error: 'OTP must be 6 digits' };
    }
    return { isValid: true };
};

export const validateCin = (cin: string): ValidationResult => {
    if (!cin) return { isValid: false, error: 'CIN Number is required' };
    if (!MOROCCAN_CIN_REGEX.test(cin)) {
        return { isValid: false, error: 'Invalid CIN format (e.g. EE123456)' };
    }
    return { isValid: true };
};

export const validateFile = (file: File | null, label: string): ValidationResult => {
    if (!file) return { isValid: false, error: `${label} is required` };
    
    const validTypes = ['image/jpeg', 'image/jpg', 'image/png'];
    if (!validTypes.includes(file.type)) {
        return { isValid: false, error: 'File must be an image (jpg, jpeg, png)' };
    }
    
    const maxSize = 5 * 1024 * 1024;
    if (file.size > maxSize) {
        return { isValid: false, error: 'File size must be less than 5MB' };
    }
    
    return { isValid: true };
};
