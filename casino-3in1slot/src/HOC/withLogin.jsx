import { useCallback, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useLoginMutation, useStealthLoginMutation } from '../api/hooks';
import { setCurrentUser, setStealthLogin } from '../app/slices/userSlice';
import { selectConfigData } from '../api/generalApi';

function withLogin(WrappedComponent) {
  return (props) => {
    const [login, {isLoading}] = useLoginMutation();
    const [stealthLogin, {isStealthLoading}] = useStealthLoginMutation();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [errors, setErrors] = useState({})
    const {login_style} = useSelector(selectConfigData);
    const searchParams = new URLSearchParams(location.search);
    const token_id = searchParams.get("token_id");

    useEffect(() => {
        const StealthLogin = async () => {
            dispatch(setStealthLogin(true));
            localStorage.removeItem('user')
            localStorage.removeItem("initUser")
            dispatch(setCurrentUser(null));
            await stealthLogin(token_id);
            navigate("/")
        }
        if (token_id && stealthLogin) {
            StealthLogin();
        }
    }, [token_id, stealthLogin]);

    const loginHandler = async (values) => {
        try {
            let allValues = values;
            if (login_style==="3") {
                allValues = {...values, username: `6${values.username}`}
            }
            const result = await login(allValues).unwrap();    
            if (result) {
                setErrors({});
                navigate("/")
            }
        } catch (error) {
            const {data}= error;
            const errorsObj={}
            for (const key in data) {
                if (Array.isArray(data[key])) {
                    errorsObj[key]=data[key][0];
                } else {
                    errorsObj[key]=data[key];
                }
            }
            setErrors(errorsObj);
        }
    }
    const handleLogin = useCallback((values) => {
        loginHandler(values);
    }, [])

    return WrappedComponent(props, {handleLogin, isLoading: isLoading || isStealthLoading, errors})
  }
}

export default withLogin