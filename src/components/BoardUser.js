import React, { useState, useEffect } from "react";

import userService from "../services/user-service";

const BoardUser = () => {
  const [content, setContent] = useState("");

  useEffect(() => {
    userService.getUserBoard().then(
      (response) => {
        console.log(response)
        setContent(response.data.message);
      },
      (error) => {
        const eContent =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString();

        setContent(eContent);
      }
    );
  }, []);

  return (
    <div className="container">
      <header className="jumbotron">
        <h3>{content}</h3>
      </header>
    </div>
  );
};

export default BoardUser;