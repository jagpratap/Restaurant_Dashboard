import { useEffect, useState } from "react";
import Cookies from "js-cookie";

import { useUserContext } from "../../../context/userContext";

const apiAuthKey = process.env.REACT_APP_API_AUTHORIZATION_KEY;

const getRecordsResponse = async () => {
  const response = await fetch("https://api.airtable.com/v0/appjWdL7YgpxIxCKA/restaurants?maxRecords=9999&view=Grid%20view", {
    headers: {
      Authorization: `Bearer ${apiAuthKey}`,
    },
  });
  if (response.status !== 200) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  const { records } = await response.json();
  return records;
};

const Home = () => {
  // Search field state
  const [search, setSearch] = useState("");

  // Using user context
  const { chartList, setChartList } = useUserContext();
  const { bookmarks, setBookmarks } = useUserContext();

  // Suggestions states
  const [recordsList = [], setRecordsList] = useState([]);
  const [suggestions = [], setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [activeSuggestion, setActiveSuggestion] = useState(0);

  // Records response
  useEffect(() => {
    getRecordsResponse()
      .then((records) => {
        setRecordsList(records);
      })
      .catch(() => { });
  }, []);

  // Retrieving chartList from cookies
  useEffect(() => {
    const localData = Cookies.get("chartList");
    if (localData) {
      setChartList(JSON.parse(localData));
    }
  }, []);

  const onChangeHandler = (event) => {
    const { value } = event.target;
    const filteredTempList = recordsList.filter(({ fields }) => {
      const name = fields.Name.toLowerCase();
      return name.includes(value.toLowerCase());
    });
    setSearch(value);
    setSuggestions(filteredTempList);
    setShowSuggestions(true);
  };

  // Navigating and setting suggestion to input field using keys
  const onKeyDownHandler = (event) => {
    if (event.keyCode === 13) { // Enter key
      setActiveSuggestion(0);
      setShowSuggestions(false);
      setSearch(suggestions[activeSuggestion].fields.Name);
    } else if (event.keyCode === 38) { // Up Arrow key
      if (activeSuggestion === 0) {
        return;
      }
      setActiveSuggestion((prev) => prev - 1);
    } else if (event.keyCode === 40) { // Down Arrow key
      if (activeSuggestion === suggestions.length - 1) {
        return;
      }
      setActiveSuggestion((prev) => prev + 1);
    }
  };

  // Setting suggestion to input field on click
  const onClickSuggestion = (event) => {
    setActiveSuggestion(0);
    setShowSuggestions(false);
    setSearch(event.currentTarget.innerText);
  };

  // Removing cartList item
  const onRemoveHandler = (id) => {
    const filteredTempList = chartList.filter((item) => item.id !== id);
    setChartList(filteredTempList);
    Cookies.set("chartList", JSON.stringify(filteredTempList));
  };

  // Bookmarking cartList item
  const onBookmarkHandler = (id) => {
    const bookmarkedItem = chartList.filter((item) => item.id === id);
    for (let i = 0; i < bookmarks.length; i += 1) {
      if (bookmarks[i].id === id) {
        return;
      }
    }
    const bookmarkedTempList = [...bookmarks, ...bookmarkedItem];
    setBookmarks(bookmarkedTempList);
    Cookies.set("bookmarkedList", JSON.stringify(bookmarkedTempList));
    onRemoveHandler(id);
  };

  const onSubmitHandler = (event) => {
    event.preventDefault();
    if (!suggestions.length) return;
    const url = `https://datastudio.google.com/embed/reporting/430242fa-4162-4950-a984-824b3b355b3c/page/dQMwC?params={"ds2.name2":"${search.charAt(0).toUpperCase() + search.slice(1)}"}`;
    const chartListTemp = [...chartList, { id: new Date().getTime(), url }];
    setChartList(chartListTemp);
    Cookies.set("chartList", JSON.stringify(chartListTemp));
    setSearch("");
  };

  // Return suggestions list JSX based on suggestions content
  let suggestionsList;

  if (showSuggestions && search) {
    if (suggestions.length) {
      suggestionsList = (
        <ul className="suggestions">
          {
            suggestions.map(({ id, fields }, index) => (
              <li
                key={id}
                className={(index === activeSuggestion) ? "suggestion-active" : ""}
                onClick={onClickSuggestion}
                onKeyDown={onClickSuggestion}
              >
                {fields.Name}
              </li>
            ))
          }
        </ul>
      );
    } else {
      suggestionsList = (
        <div className="suggestions">
          <p>--- No Restaurant Found ---</p>
        </div>
      );
    }
  }

  // console.log(bookmarks);
  return (
    <section className="home-section">
      <div className="section-header">
        <form
          className="header-form"
          autoComplete="off"
          onSubmit={onSubmitHandler}
        >
          <input
            type="search"
            id="search"
            name="search"
            placeholder="Search Restaurant name"
            value={search}
            onChange={onChangeHandler}
            onKeyDown={onKeyDownHandler}
            required
          />
          <input
            type="submit"
            id="add"
            name="add"
            value="Add"
          />
        </form>
        {suggestionsList}
      </div>
      <div className="section-content">
        {
          chartList.map(({ id, url }) => (
            <div key={id} className="data_chart">
              <iframe title="data-chart" width="600" height="450" src={url} frameBorder="0" allowFullScreen />
              <div className="chart_actions">
                <button
                  type="button"
                  className="bookmark"
                  onClick={() => onBookmarkHandler(id)}
                >
                  Bookmark
                </button>
                <button
                  type="button"
                  className="remove"
                  onClick={() => onRemoveHandler(id)}
                >
                  Remove
                </button>
              </div>
            </div>
          ))
        }
      </div>
    </section>
  );
};

export default Home;
