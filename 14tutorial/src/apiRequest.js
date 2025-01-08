const apiRequest = async (url = '', optionsObject = null, errorMessage = null) => {
    try {
        console.log(url);
        const response = await fetch(url, optionsObject);

        if (!response.ok) throw Error('Please reload the app.');
    } catch (err) {
        errorMessage = err.message;
    } finally {
        // Regardless if an error occured, return the error
        return errorMessage;
    }
}

export default apiRequest;