import { Link, useNavigate } from "react-router-dom";

const Nav = ({ setThisUser }) => {

    const navigate = useNavigate();

    const handleLogOut = () => {
        setThisUser({});
        navigate("/");
    }

    const pStyles = {
        color: "#551a8b",
        cursor: "pointer",
        textDecoration: "underline"
    }

    return (
        <>
            <nav>
                <div className="nav-item">
                    <i className="fa-solid fa-house-chimney-user"></i>
                    <h1><span>Book</span>Base</h1>
                </div>
                <div className="nav-item" style={{color: '#6e778a'}}>
                    <i className="fa-solid fa-house"></i>
                    <p><Link to="/discover">Discover</Link></p>
                </div>
                <div className="nav-item">
                    <i className="fa-solid fa-book"></i>
                    <p>Category</p>
                </div>
                <div className="nav-item" style={{color: '#0055ff'}}>
                    <i className="fa-solid fa-book-open"></i>
                    <p><Link to="/mylibrary">My Library</Link></p>
                </div>
                <div className="nav-item">
                    <i className="fa-solid fa-file-arrow-down"></i>
                    <p>Download</p>
                </div>
                <div className="nav-item">
                    <i className="fa-solid fa-headphones"></i>
                    <p>Audio Books</p>
                </div>
                <div className="nav-item">
                    <i className="fa-regular fa-heart"></i>
                    <p>Favorite</p>
                </div>

                <div className="border-div"></div>

                <div className="nav-item">
                    <i className="fa-solid fa-gear"></i>
                    <p>Settings</p>
                </div>
                <div className="nav-item">
                    <i className="fa-regular fa-comments"></i>
                    <p>Suppot</p>
                </div>
                <div className="nav-item">
                    <i className="fa-solid fa-arrow-right-to-bracket"></i>
                    <p onClick={handleLogOut} style={pStyles}>Logout</p>
                </div>
            </nav>
        </>
    );
}

export default Nav;