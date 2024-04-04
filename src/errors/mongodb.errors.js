const notFoundError = (res) => {
    return res.status(404).send("Este dado não foi encontado no DB.");
};

module.exports = {
    notFoundError,
};
