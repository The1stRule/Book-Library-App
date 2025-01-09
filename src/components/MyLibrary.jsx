import { useState } from 'react';
import Nav from './Nav.jsx';

const MyLibrary = ({ user, pStyles }) => {

    const [thisUser, setThisUser] = user;
    const [listIndex, setListIndex] = useState(null);

    const handleDelete = ({ target }) => {
        const delTitle = target.parentElement.previousSibling.textContent;
        let count = 0;
        let newTitleList;
        let newLibraryList;
        if(thisUser.titleList[0].includes(delTitle)) {
          newTitleList = [[...(thisUser.titleList[0].filter(curValue => curValue !== delTitle))], [...thisUser.titleList[1]]]
          newLibraryList = [[...(thisUser.libraryList[0].filter(curValue => curValue.title !== delTitle))], [...thisUser.libraryList[1]]]
        } else {
          newTitleList = [[...thisUser.titleList[0]], [...(thisUser.titleList[1].filter(curValue => curValue !== delTitle))]]
          newLibraryList = [[...thisUser.libraryList[0]], [...(thisUser.libraryList[1].filter(curValue => curValue.title !== delTitle))]]
          count += 1;
        }
    
        setThisUser(prev => ({...prev, titleList: newTitleList, libraryList: newLibraryList, readBookCount: prev.readBookCount - count}));
    }

    const handleHover = ({ target }) => {
        target.style.color = "white";
    }

    const handleLeave = ({ target }) => {
        target.style.color = "red";
    }

    const handleChange = ({ target }) => {
        const thisTitle = target.parentElement.previousSibling.previousSibling.textContent;
        let obj;
        if(target.checked) {
            const newList = thisUser.libraryList[0].filter(curValue => {
                if(curValue.title === thisTitle) {
                    curValue.isRead = true;
                    obj = curValue;
                }

                return curValue.title !== thisTitle;
            })

            const newLibraryList = [[...newList], [...thisUser.libraryList[1], obj]]

            const newTitleList = [thisUser.titleList[0].filter(curValue => curValue !== thisTitle), [...thisUser.titleList[1], thisTitle]];

            setThisUser(prev => ({...prev, titleList: newTitleList, libraryList: newLibraryList, readBookCount: prev.readBookCount + 1}));
        } else {
            const newList = thisUser.libraryList[1].filter(curValue => {
                if(curValue.title === thisTitle) {
                    curValue.isRead = false;
                    obj = curValue;
                }

                return curValue.title !== thisTitle;
            })

            const newLibraryList = [[...thisUser.libraryList[0], obj], [...newList]]

            const newTitleList = [[...thisUser.titleList[0], thisTitle], thisUser.titleList[1].filter(curValue => curValue !== thisTitle)];
            
            setThisUser(prev => ({...prev, titleList: newTitleList, libraryList: newLibraryList, readBookCount: prev.readBookCount - 1}));
        }
    }

    return (
        <>
            <Nav setThisUser={setThisUser} />
            <section className="search-section">
                <div className="btn-div">
                    <button onClick={() => setListIndex(null)}>All</button>
                    <button onClick={() => setListIndex(1)}>Readed</button>
                    <button onClick={() => setListIndex(0)}>Unreaded</button>
                </div>

                <div className="progress-div">
                    <span>{(thisUser.readBookCount - 5 * Math.floor(thisUser.readBookCount / 5)) * 20}%</span>
                    <meter min="0" value={(thisUser.readBookCount - 5 * Math.floor(thisUser.readBookCount / 5)) * 20}
                    max="100" low="20" optimum="60" ></meter>
                </div>
                <div className="profile-info">
                    <img src="/images/profile.jpg" alt="profile" />
                    <p>{thisUser.username} <i className="fa-solid fa-chevron-down"></i></p>
                    <p>lvl: {Math.floor(thisUser.readBookCount / 5)}</p>
                </div>
            </section>
            <section className="books" style={{ height: "585px", overflowY: "auto" }}>
                {
                    [...thisUser.libraryList[0], ...thisUser.libraryList[1]].length > 0 ? 
                    ((listIndex === null ? [...thisUser.libraryList[0], ...thisUser.libraryList[1]] :
                    thisUser.libraryList[listIndex]).map((curValue, index) => {
                        return (
                            <div key={index} className="book-div">
                                <div className="img-div">
                                    <img src={curValue.src} alt={curValue.title} />
                                </div>
                                <h2>{curValue.title}</h2>
                                <div className="author-div">
                                    <p>{curValue.author}</p>
                                    <i className="fa-regular fa-heart" style={{color: "red"}}
                                    onClick={handleDelete}
                                    onMouseOver={handleHover}
                                    onMouseLeave={handleLeave}></i>
                                </div>
                                <div className="checkbox-div">
                                    <label htmlFor="isread">Read:</label>
                                    {curValue.isRead ? <input type="checkbox" id="isread" checked={true} onChange={handleChange}  /> :
                                    <input type="checkbox" id="isread" checked={false} onChange={handleChange}  />}
                                </div>
                            </div>
                        );
                    }))
                    : <p style={pStyles}>Your library is empty</p>
                }
            </section>
        </>
    );
}

export default MyLibrary;