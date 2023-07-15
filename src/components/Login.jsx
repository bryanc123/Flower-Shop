const Login = () => {
    return (
        <section className="login">
            <div className="login-form">
                <div>Username</div>
                <div><input type="text" /></div>
                <div>Password</div>
                <div><input type="password" /></div>
                <div className="login-button-container"><button>Log In</button></div>
            </div>
        </section>
    )
};

export default Login;