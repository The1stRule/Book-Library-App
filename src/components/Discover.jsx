import { useEffect, useState } from 'react';
import Nav from './Nav.jsx';

const BookLibrary = ({ user, pStyles }) => {
    const [thisUser, setThisUser] = user;
    const [booksList, setBooksList] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const prevSearch = async () => {
            setIsLoading(true);
            const data = await fetchData(thisUser.previousSearch);
            const books = [];
            let bookCount = 1;
            for (const book of data.items) {
                if (bookCount <= 10) {
                    const volumeInfo = book.volumeInfo;
                    const title = volumeInfo.title.length > 16 ? `${volumeInfo.title.slice(0, 16)}...` : volumeInfo.title;

                    const obj = {
                        title: title,
                        src: volumeInfo.imageLinks.thumbnail,
                        author: volumeInfo.authors !== undefined ? volumeInfo.authors[0] : "",
                        isSelected: ([...thisUser.titleList[0], ...thisUser.titleList[1]].includes(title)) ? true : false,
                        isRead: title in thisUser.titleList[0] ? true : false
                    }
                    books.push(obj);
                }

                bookCount += 1;
            }

            setBooksList(books);
            setIsLoading(false);
        }

        if (thisUser.previousSearch.length > 0) {
            prevSearch();
        }

    }, []);

    const fetchData = async (searchTerm) => {
        try {
            const response = await fetch(`https://www.googleapis.com/books/v1/volumes?q=${searchTerm}`);
            const data = await response.json();

            return data;
        } catch (error) {
            console.log(error)
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        const data = await fetchData(e.target.book.value);
        if(data.totalItems === 0) {
            return;
        }

        setThisUser(prev => ({...prev, previousSearch: e.target.book.value}));
        
        e.target.reset();
        const books = [];
        let bookCount = 1;
        for(const book of data.items) {
            if(bookCount <= 10) {
                const volumeInfo = book.volumeInfo;
                const title = volumeInfo.title.length > 16 ? `${volumeInfo.title.slice(0, 16)}...` : volumeInfo.title;
    
                const obj = {
                    title: title,
                    src: volumeInfo.imageLinks.thumbnail,
                    author: volumeInfo.authors !== undefined ? volumeInfo.authors[0] : "",
                    isSelected: ([...thisUser.titleList[0], ...thisUser.titleList[1]].includes(title))? true : false,
                    isRead: title in thisUser.titleList[0] ? true : false
                }
                books.push(obj);
            }

            bookCount += 1;
        }

        setBooksList(books);
    }

    const addBook = (index, title, book) => {
        let newTitleList;
        let newLibraryList;
    
        if(index === 0) {
          newTitleList = [[...thisUser.titleList[0], title], thisUser.titleList[1]];
          newLibraryList = [[...thisUser.libraryList[0], book], thisUser.libraryList[1]];
        } else {
          newTitleList = [thisUser.titleList[0], [...thisUser.titleList[1], title]];
          newLibraryList = [thisUser.libraryList[0], [...thisUser.libraryList[0], book]];
        }
    
        setThisUser(prev => ({...prev, titleList: newTitleList, libraryList: newLibraryList}));
    }
    
    const handleClick = ({ target }) => {
        const title = target.parentElement.previousSibling.textContent;
        target.style.color = "red";
        if (![...thisUser.titleList[0], ...thisUser.titleList[1]].includes(title)) {
            let bookObj;
            for(const book of booksList) {
                if(book.title === title) {
                    bookObj = book;
                    bookObj.isSelected = true;
                }
            }

            addBook(0, title, bookObj);
        }
    }
    
    return (
        <>
            <Nav setThisUser={setThisUser} />
            <section className="search-section">
                <form className="search-form" onSubmit={handleSubmit}>
                    <label htmlFor="book"><i className="fa-solid fa-magnifying-glass"></i></label>
                    <input type="text" name="book" id="book" placeholder="Search your favorite books" required />
                </form>
                <div className="profile-info">
                    <img src="/images/profile.jpg" alt="profile" />
                    <p>{thisUser.username} <i className="fa-solid fa-chevron-down"></i></p>
                </div>
            </section>
            <section className="books">
                {   booksList.length > 0 ?
                    booksList.map((curValue, index) => {
                        return (
                            <div key={index} className="book-div">
                                <div className="img-div">
                                    <img src={curValue.src} alt={curValue.title} />
                                </div>
                                <h2>{curValue.title}</h2>
                                <div className="author-div">
                                    <p>{curValue.author}</p>
                                    <i className="fa-regular fa-heart" style={{color: (curValue.isSelected ? "red" : "")}}
                                    onClick={handleClick}></i>
                                </div>
                            </div>
                        );
                    }) : <p style={pStyles}>{thisUser.previousSearch.length > 0 && isLoading ? "Loading..." : "Nothing to recommend"}</p>
                }
            </section>
        </>
    );
}

export default BookLibrary;