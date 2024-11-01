interface IProfileEpr {
    _id: string;
    name: string;
    email: string;
    phone_props: {
        phone: string;
        is_verified: boolean;
    };
    birth_day: string;
    address: string;
    desc_epr: string;
    image: string;
}

export default IProfileEpr;