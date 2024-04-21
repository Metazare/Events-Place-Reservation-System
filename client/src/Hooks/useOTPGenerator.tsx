import { useState } from 'react';
import useEmail from './useEmail';

const useOTPGenerator = () => {
    const [otp, setOTP] = useState('');
    const { sendEmail } = useEmail();

    const generateOTP = (email: string) => {
        const generatedOTP = Math.floor(1000 + Math.random() * 9000).toString();
        setOTP(generatedOTP);

        sendEmail({
            to: email,
            subject: "Events Place Marikina OTP Code",
            content: `Your OTP code is: ${generatedOTP}`,
        });

        console.log(generatedOTP);

        return generatedOTP;
    };

    const compareOTP = (inputOTP: string) => {
        return otp === inputOTP;
    };

    return { generateOTP, compareOTP };
};

export default useOTPGenerator;