export function logout(setIsLogin, setToken, navigate){
    setIsLogin(false);
    setToken('');
    localStorage.removeItem('token');
    navigate('/login');
}