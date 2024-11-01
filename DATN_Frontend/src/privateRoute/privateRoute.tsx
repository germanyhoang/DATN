import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import { useAppSelector } from '../app/hook';

type LayoutPrivateProps = {
    children: React.ReactElement
}

const PrivateRoute: any = ({ children }: LayoutPrivateProps) => {
    const { isLoggedIn } = useAppSelector((rs) => rs.authAdm)
    const navigate = useNavigate();
    if (isLoggedIn) return children
    useEffect(() => {
        return navigate('/login-admin');
    }, [])


}

export default PrivateRoute