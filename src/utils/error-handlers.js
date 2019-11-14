function handleApiError(res) {
    return (apiError) => {
      res.status(apiError.statusCode).json(apiError);
    };
}
  
function handleModelError(err) {
    const apiError = {
        statusCode: 500,
        errorMessage: err.message,
    };

    throw apiError;
}

module.exports = {
    handleApiError,
    handleModelError,
};
