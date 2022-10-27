/* eslint-disable no-unused-vars */
import React, { useState } from "react";

const Home = () => {
  const [isLoading, setLoading] = useState(false);
  const onSubmitHandler = (event) => {
    event.preventDefault();
  };
  return (
    <section className="home-section">
      <div className="section-header">
        <form className="header-form" onSubmit={onSubmitHandler}>
          <input
            type="search"
            id="search"
            name="search"
            placeholder="Search"
          />
          <div className="submit_field">
            <input
              type="submit"
              id="add"
              name="add"
              value="Add"
            />
            {isLoading && <div className="lds-dual-ring" />}
          </div>
        </form>
      </div>
    </section>
  );
};

export default Home;
