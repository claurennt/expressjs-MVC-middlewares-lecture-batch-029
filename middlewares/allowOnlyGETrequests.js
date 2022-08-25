//middleware that blocks any request that is not a GET request
const allowOnlyGETrequests = (req, res, next) => {
  if (req.method !== "GET")
    return res.status(403).send("Only GET requests are allowed on this path.");

  next();
};

module.exports = allowOnlyGETrequests;
