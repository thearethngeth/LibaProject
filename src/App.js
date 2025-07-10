import "./App.css";
import Result from "./components/Result";
import React, { useState } from "react";
import axios from "axios";
import cover from "./Assets/default_book_cover_2015.jpg";
import Nav from "./components/Nav";
import Footer from "./components/Footer";
import Popup from "./components/Popup";
import LoginForm from "./components/LoginForm"; // Import LoginForm
import { ImBooks } from "react-icons/im";

function App() {
  const [searchQuery, setSearchQuery] = useState("");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [stat, setStat] = useState(false);
  const [isEmpty, setIsEmpty] = useState(true);
  const [query, setQuery] = useState("");

  // State for popups
  const [popupBook, setPopupBook] = useState(null);
  const [showPopup, setShowPopup] = useState(false);
  const [showAbout, setShowAbout] = useState(false); // State for About popup
  const [showLogin, setShowLogin] = useState(false); // State for Login popup

  async function handleSubmit(event) {
    setIsEmpty(false);
    setLoading(true);
    event.preventDefault();
    setResults([]);

    await axios
      .get(`https://openlibrary.org/search.json?q=${searchQuery}`)
      .then((response) => {
        setResults(response.data.docs);
        setQuery(response.data.q);
      })
      .catch((error) => {
        console.error(error);
      });
    setLoading(false);
    setStat(true);
  }

  // Handle book click to fetch detailed info
  async function handleBookClick(bookKey) {
    try {
      const response = await axios.get(
        `https://openlibrary.org${bookKey}.json`
      );
      const bookDetails = response.data;

      setPopupBook({
        title: bookDetails.title,
        author: bookDetails.authors?.map((a) => a.name).join(", ") || "Unknown",
        description:
          bookDetails.description?.value ||
          bookDetails.description ||
          "No description available.",
      });
      setShowPopup(true); // Show the popup
    } catch (error) {
      console.error("Error fetching book details:", error);
    }
  }

  // Close popups
  function closePopup() {
    setShowPopup(false);
    setPopupBook(null);
  }

  function closeAbout() {
    setShowAbout(false);
  }

  function closeLogin() {
    setShowLogin(false);
  }

  return (
    <div>
      {/* Pass onAboutClick and onLoginClick handlers to Nav */}
      <Nav
        onAboutClick={() => setShowAbout(true)}
        onLoginClick={() => setShowLogin(true)}
      />

      <form className="bg-book bg-cover w-full h-[300px] flex justify-center ">
        <input
          type="text"
          value={searchQuery}
          onChange={(event) => setSearchQuery(event.target.value)}
          placeholder="Book Name/Authors Name/ISBN..."
          className="rounded-md w-68 sm:w-96 my-auto p-3 sm:p-4 sm:text-lg bg-black text-white placeholder-gray-400"
        />
        <button
          onClick={handleSubmit}
          type="submit"
          className="rounded-md font-bold text-black cursor-pointer my-auto p-3 sm:p-4 sm:text-lg bg-white hover:bg-gray-200 border border-black"
        >
          Search
        </button>
      </form>

      {isEmpty ? (
        <h1 className="center text-2xl sm:text-4xl font-extrabold flex-col mt-[-50px]">
          <span className="text-[100px] sm:text-[150px]">
            <ImBooks />
          </span>
          Search to discover books here!
        </h1>
      ) : null}

      {stat ? (
        <div className="text-center text-xl font-bold my-2">
          <h1>
            Showing results for{" "}
            <span className="font-extrabold italic text-accent">{query}</span>
          </h1>
          <p>
            Total{" "}
            <span className="font-extrabold italic text-white">
              {results.length}
            </span>{" "}
            books found
          </p>
        </div>
      ) : null}

      <div className="flex flex-wrap justify-around">
        {loading ? (
          <div>
            <div className="text-center text-lg font-bold mt-[40px] mb-[-50px]">
              Keep patience! Great books are waiting for you to see...
            </div>
          </div>
        ) : (
          results.map((result) => (
            <Result
              key={result.key}
              book_title={result.title}
              img={
                result.cover_i
                  ? `https://covers.openlibrary.org/b/id/${result.cover_i}-L.jpg`
                  : cover
              }
              author={
                result.author_name
                  ? result.author_name.length <= 2
                    ? result.author_name
                    : `${result.author_name[0]} ${result.author_name[1]} and others`
                  : "Not Available"
              }
              year={
                result.first_publish_year
                  ? result.first_publish_year
                  : "Not Available"
              }
              page={
                result.number_of_pages_median
                  ? result.number_of_pages_median
                  : "Not Available"
              }
              onClick={() => handleBookClick(result.key)}
            />
          ))
        )}
      </div>

      <Footer />

      {/* Popup for book details */}
      {showPopup && <Popup book={popupBook} onClose={closePopup} />}

      {/* Popup for About Us */}
      {showAbout && (
        <Popup
          book={{
            title: "About Us",
            description: `
              We are a passionate group of students from the Royal University of Phnom Penh (RUPP), 
              dedicated to making book searching easier and more accessible for everyone. 
              Our mission is to simplify the process of finding books, whether for academic, personal, or professional use. 
              If you have any questions, feel free to reach out at (+855) 123-456-789.
            `,
          }}
          onClose={closeAbout}
        />
      )}

      {/* Popup for Login Form */}
      {showLogin && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <LoginForm onClose={closeLogin} />
        </div>
      )}
    </div>
  );
}

export default App;
