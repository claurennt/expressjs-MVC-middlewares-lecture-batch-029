//middleware that checks if the an admin_token is sent alongside the request headers and if it is, it checks if the token is valid
const checkAdminToken = (req, res, next) => {
  const { admin_token } = req.headers;
  if (!admin_token || admin_token !== process.env.ADMIN_TOKEN)
    return res
      .status(401)
      .send("You are not allowed to perform this operation. Unauthorized");
  next();
};

module.exports = checkAdminToken;
