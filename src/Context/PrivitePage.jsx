import useAuth from '../Hooks/useAuth';
import Loading from '../Components/Loading/Loading';
import { Navigate, useLocation } from 'react-router';

const PrivitePage = ({children}) => {
    const {user, loading} = useAuth();
    const location = useLocation();
    // console.log(location);

    if(loading) {
        return <Loading />
    };

    if(user) {
        return children;
    };

    return <Navigate state={location.pathname} to={'/login'} />;
};

export default PrivitePage;