import axios from "axios";
import React from "react";

import { useEffect, useState } from "react";

import keycloak from "../keycloak";

// export const fetchExercises = async () => {
//   const exercisesURL = "http://localhost:8080/api/v1/exercises";

//   try {
//     const { data } = await axios.get(exercisesURL);
//     return Promise.resolve({
//       exercises: data,
//       error: null,
//     });
//   } catch (e) {
//     return {
//       exercises: [],
//       error: e.message,
//     };
//   }
// };

export const fetchExercises = () => {
  fetch(`http://localhost:8080/api/v1/exercises`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${keycloak.token}`,
      "Content-Type": "application/json",
    },
  })
    .then((response) => {
      if (response.ok) {
        return response.json();
      } else {
        // handleNoUser();
        throw new Error("Response not OK");
      }
    })
    .then((data) => {
      console.log("test", data);
    })
    .catch((error) => console.error(error));
};

// const fetchUser = () => {
//   fetch(`http://localhost:8080/api/v1/users/keycloak`, {
//       method: "GET",
//       headers: {
//           Authorization: `Bearer ${keycloak.token}`,
//           "Content-Type": "application/json",
//       },
//   })
//       .then((response) => {
//           if (response.ok) {
//               return response.json();
//           } else {
//               handleNoUser();
//               throw new Error("Response not OK");
//           }
//       })
//       .then((data) => {
//           console.log("test", data);
//           setUser(data);
//           setUserFetched(true);
//       })
//       .catch((error) => console.error(error));
// };
