interface ImanageProfile {
    _id: string;
    name: string;
    email: string;
    phone_props: {
        phone: string;
        is_verified: boolean;
    };
    birth_day: string;
    province: string;
    district: number;
    specific_address: string;
}

export default ImanageProfile;