import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Register = ({ useRegister }) => {
    const [usersList, setUsersList] = useRegister;
    const [isError, setIsError] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();

        for(const user of usersList) {
            if(user.email === e.target.email.value) {
                setIsError(true);
                return;
            }
        }

        const newUser = {
            username: e.target.username.value,
            email: e.target.email.value,
            password: e.target.password.value,
            libraryList: [[], []],
            titleList: [[],[]],
            previousSearch: "",
            readBookCount: 0
        }

        setIsError(false);

        e.target.reset();

        setUsersList(prev => {
            const users = prev.filter(curValue => Object.keys(curValue).length > 0);
            localStorage.setItem("usersList", JSON.stringify([...users, newUser]));
            return [...users, newUser];
        });

        navigate("/");
    }

    return (
        <>
            <form className="reg-auto-form" onSubmit={handleSubmit}>
                <h1>Registration</h1>
                <div className="input-div">
                    <label htmlFor="username">Username</label>
                    <input type="text" name="username" id="username" placeholder="Please enter your name" required />
                </div>
                <div className="input-div">
                    <label htmlFor="reg-email">Email</label>
                    <input type="email" name="email" id="reg-email" placeholder="Please enter your email" required />
                </div>
                <div className="input-div">
                    <label htmlFor="reg-pass">Password</label>
                    <input type="password" name="password" id="reg-pass" placeholder="Please enter your password" required />
                </div>
                <button>Sign up</button>
                <p>Already have an account? <span><Link to="/">Sign In</Link></span></p>
                <p className="error-p" style={{color: "red"}}>{ isError ? "Email is already existed" : ""}</p>
            </form>
        </>
    );
}

export default Register;