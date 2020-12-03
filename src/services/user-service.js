import backend from "../api"
import authHeader from "./auth-header"
import base64js from 'base64-js'

const getUserBoard = async () => {
  return backend.get("/api/user", { headers: authHeader() })
}

const updateUser = async (id, obj) => {
  console.log(obj)
  return backend.patch(`/api/user/${id}`, obj)
}

const getImage = (avatar) =>  avatar ? `data:image/png;base64,${base64js.fromByteArray(avatar.data)}` : "//ssl.gstatic.com/accounts/ui/avatar_2x.png"

export default { 
  getUserBoard,
  updateUser,
  getImage
}
