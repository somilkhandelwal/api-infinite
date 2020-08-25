const process = require('process');

const createCookie = (res, token, name, expires) => {
  const cookieOption = {
    httpOnly: true,
    expires: new Date(Date.now() + expires * 24 * 60 * 60 * 1000),
    secure: process.env.NODE_ENV === "production" ? true : false
  };

  return res.cookie(name, token, cookieOption);
};

const deleteCookies = (req, res) => {
  const cookie = req.cookies;
  Object.keys(cookie).forEach((item) => {
    res.cookie(item, '', {expires: new Date(0)});
  })
}


module.exports = {
  createCookie,
  deleteCookies
};