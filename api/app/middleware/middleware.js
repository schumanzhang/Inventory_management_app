
export function checkUser(req, res, next) {
    const user = req.headers['user-id-token'];
    if (parseInt(user) === 5448320 || parseInt(user) === 8046270) {
        return true;
    }
    return false;
}