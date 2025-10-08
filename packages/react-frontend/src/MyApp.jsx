// src/MyApp.jsx
import React, { useState, useEffect } from "react";
import Table from "./Table";
import Form from "./Form";

function MyApp() {
  const [characters, setCharacters] = useState([
    { name: "Charlie", job: "Janitor" },
    { name: "Mac", job: "Bouncer" }
  ]);
  function fetchUsers() {
    const promise = fetch("http://localhost:8000/users");
    return promise;
  }
  useEffect(() => {
    fetchUsers()
	  .then((res) => res.json())
	  .then((json) => setCharacters(json["users_list"]))
	  .catch((error) => { console.log(error); });
  }, [] );
  function postUser(person) {
    const promise = fetch("Http://localhost:8000/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(person),
    });

    return promise;
  }
  function removeOneCharacter(index) {
    const id = characters[index].id;

    fetch(`http://localhost:8000/users/${id}`, { method: "DELETE" })
      .then(function (res) {
        if (res.status === 204) {
          const updated = characters.filter(function (_, i) {
            return i !== index;
          });
          setCharacters(updated);
        } else if (res.status === 404) {
          console.log("User not found on backend (404).");
        } else {
          console.log("Unexpected status:", res.status);
        }
      })
      .catch(function (error) {
        console.log("Error deleting user:", error);
      });
  }

  function updateList(person) { 
    postUser(person)
      .then(function (res) {
      if (res.status === 201) {
        return res.json();         
      } else {
        console.log("No update; server returned status:", res.status);
        return null;                
      }
    })
    .then(function (createdUser) {
      if (createdUser) {
        setCharacters(function (prev) {
          return [...prev, createdUser];
        });
      }
    })
    .catch(function (error) {
      console.log("Error adding user:", error);
    });
  }
   return (
      <div className="container">
         <Table
            characterData={characters}
            removeCharacter={removeOneCharacter}
         />
         <Form handleSubmit={updateList} />
      </div>
   );
}

export default MyApp;
