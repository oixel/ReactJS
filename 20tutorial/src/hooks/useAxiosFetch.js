// Custom fetch hook utilizing the axios package

import { useState, useEffect } from 'react';
import axios from 'axios';

// Define custom hook
const useAxiosFetch = (dataUrl) => {
    // Set our initial, differents states
    const [data, setData] = useState([]);
    const [fetchError, setFetchError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    // Define our useEffect hook inside custom hook
    useEffect(() => {
        // Initialize is mounted to true
        let isMounted = true;

        // Use cancel token so we can cancel requrest if for whatever reason the component is unmounted
        const source = axios.CancelToken.source();

        const fetchData = async (url) => {
            setIsLoading(true);

            try {
                const response = await axios.get(url, {
                    cancelToken: source.token
                });

                // Constantly checking if component is indeed mounted, if it is, then we can take action
                if (isMounted) {
                    setData(response.data);
                    setFetchError(null);
                }
            } catch (err) {
                if (isMounted) {  // If error occurs but component is mounted, return error message and clear data
                    setFetchError(err.message);
                    setData([]);
                }
            } finally {
                // When posts have been properly loading using axios fetch, set isLoading to false!
                isMounted && setIsLoading(false);
            }
        }

        fetchData(dataUrl);

        // Return clean up function to avoid memory leaking
        return () => {
            isMounted = false;
            source.cancel();
        }

        // If dataUrl changes, we want to call useEffect!
    }, [dataUrl]);

    return { data, fetchError, isLoading };
}

export default useAxiosFetch;