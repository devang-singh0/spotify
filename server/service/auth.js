import jwt from "jsonwebtoken";
let secret = "8008135$"
export function setToken(user) {
    return jwt.sign(user, secret);
}
export function checkToken(user) {
    try{
        return jwt.verify(user, secret);
    }catch{
        return false;
    }
}