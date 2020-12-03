import backend from "../api"

const register = (username, email, password, firstName, lastName, token) => {
  return backend.post("/api/auth/signup", {
    username,
    email,
    password,
    firstName,
    lastName,
    token,
  })
}

const login = (username, password) => {
  return backend
    .post("/api/auth/signin", {
      username,
      password,
    })
    .then((response) => {
      if (response.data.accessToken) {
        localStorage.setItem("user", JSON.stringify(response.data))
      }

      return response.data
    })
}

const logout = () => {
  localStorage.removeItem("user")
}

const getCurrentUser = () => {
  return JSON.parse(localStorage.getItem("user"))
}

export default {
  register,
  login,
  logout,
  getCurrentUser,
}
