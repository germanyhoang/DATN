import { useNavigate } from "react-router-dom"
import UseAuth from "../components/auth/UseAuth"

type LayoutPrivateProps = {
    children: React.ReactElement
}

const RedirectRoute: any = ({ children }: LayoutPrivateProps) => {
    const currentUser: any = UseAuth();
    const navigate = useNavigate();
    if (currentUser) return navigate('/');
    return children
}

export default RedirectRoute

