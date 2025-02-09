const GetToken = (req) => {
    const authHeaders = req.headers.authorization
    const token = authHeaders.split(" ")[1]
    return token
}
module.exports = GetToken