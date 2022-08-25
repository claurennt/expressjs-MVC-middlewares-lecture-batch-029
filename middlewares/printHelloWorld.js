const printHelloWorld = (req, res, next) => {
  console.log("hello world");
  next();
};

module.exports = printHelloWorld;
