const notFoundError = (res) => {
    return res
        .status(404)
        .send("Este dado não foi encontado no Banco de Dados.");
};

module.exports = {
    notFoundError,
};
