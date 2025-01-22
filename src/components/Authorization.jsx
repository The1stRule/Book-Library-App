import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Authorization = ({ usersList, setThisUser }) => {

    const [isError, setIsError] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();

        const email = e.target.email.value;
        const password = e.target.password.value;

        for(const user of usersList) {
            if(user.email === email && user.password === password) {
                e.target.reset();
                setIsError(false);
                setThisUser(user);
                navigate("/discover");
                return;
            }
        }

        setIsError(true);
    }

    return (
        <>
            <form className="autorize-form reg-auto-form" onSubmit={handleSubmit}>
                <h1>Autorization</h1>
                <div className="input-div">
                    <label htmlFor="auto-email">Email</label>
                    <input type="email" name="email" id="auto-email" placeholder="Please enter your email" required />
                </div>
                <div className="input-div">
                    <label htmlFor="auto-pass">Password</label>
                    <input type="password" name="password" id="auto-pass" placeholder="Please enter your password" required />
                </div>
                <button>Sign in</button>
                <p>Don't have an account? <span><Link to="/register">Sign up</Link></span></p>
                <p className="error-p" style={{color: "red"}}>{ isError ? "User not found" : ""}</p>
            </form>
        </>
    );
}
export default Authorization;