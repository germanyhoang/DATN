interface IUserNTD {
    _id: string;
    name: string;
    email: string;
    isEmailVerified: boolean;
    phone: string;
    isPhoneVerified: boolean;
    desc_epr: string;
    image: string;
    address: string;
    password: string;
    passwordResetToken: string;
    passwordChangeAt: string;
    passwordResetExpires: string;
    role: number;
    isBlock: boolean;
    next_post_time: Date;
    company_name: string;
    company_banner: string;
    company_size: string;
    company_field: string;
}

export default IUserNTD 