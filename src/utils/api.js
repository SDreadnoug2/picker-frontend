const baseUrl = "https://localhost:3001";

function checkResponse(res) {
  if (res.ok) {
    return res.json();
  }
  return Promise.reject(`Error ${res.status}`);
}

export function getRandomSteamGame() {
  return fetch(`${baseUrl}/steamstore/random`, {
    method: "GET",
  }).then((res) => {
    return checkResponse(res);
  }).then((data) => {
    return data;
  })
}

export function getRandomUserGame(userId) {
  console.log(userId);
  return fetch(`${baseUrl}/userLibrary/random?userID=${userId}`, {
    method: "GET",
  }).then((res) => {
    return checkResponse(res);
  }).then((data) => {
    return data;
  })
}

export function login() {
  window.location.href = `${baseUrl}/auth/login`;
}