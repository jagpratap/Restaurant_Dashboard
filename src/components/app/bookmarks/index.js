import Cookies from "js-cookie";
import { useEffect } from "react";
import { useUserContext } from "../../../context/userContext";

const Bookmarks = () => {
  const { bookmarks, setBookmarks } = useUserContext();

  useEffect(() => {
    const localData = Cookies.get("bookmarkedList");
    if (localData) {
      setBookmarks(JSON.parse(localData));
    }
  }, []);

  const onRemoveBookmarkHandler = (id) => {
    const filteredTempList = bookmarks.filter((item) => item.id !== id);
    setBookmarks(filteredTempList);
    Cookies.set("bookmarkedList", JSON.stringify(filteredTempList));
  };

  return (
    <section className="bookmarks-section">
      <div className="section-content">
        {bookmarks.length > 0
          && bookmarks.map(({ id, url }) => (
            <div key={id} className="data_chart">
              <iframe title="data-chart" width="600" height="450" src={url} frameBorder="0" allowFullScreen />
              <div className="chart_actions">
                <button
                  type="button"
                  className="bookmark"
                  onClick={() => onRemoveBookmarkHandler(id)}
                >
                  Remove
                </button>
              </div>
            </div>
          ))}
      </div>
    </section>
  );
};

export default Bookmarks;
