import jwt from "jsonwebtoken";

const useDecodedToken: any = (token: string) => {
    try {
        const secretKey = 'login_token';

        const decodedToken = jwt.verify(token, secretKey);
        return decodedToken;
    } catch (error) {
        console.log('Invalid token!');
        return null;
    }
}

export default useDecodedToken