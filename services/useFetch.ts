import { useEffect, useState } from 'react';

// Custom hook — a reusable function that wraps useState and useEffect.
// The naming convention "useFetch" (starts with "use") is required for React
// to recognise it as a hook. Hooks can only be called inside components or other hooks.
//
// The <T> is a TypeScript generic — it means "I don't know the data type yet,
// use whatever type the caller passes in". This makes the hook reusable for
// any kind of API call, not just movies.

const useFetch = <T>(fetchFunction: () => Promise<T>, autoFetch = true) => {

    // useState — stores a value and triggers a re-render when it changes.
    // Each piece of state has its own useState call:
    const [data, setData] = useState<T | null>(null);        // the API result
    const [loading, setLoading] = useState<boolean>(false);  // true while waiting
    const [error, setError] = useState<string | null>(null); // error message if failed

    const fetchData = async () => {
        try{
            setLoading(true);
            setError(null); // clear any previous error before retrying

            const result = await fetchFunction(); // call whatever fetch was passed in
            setData(result);
        } catch (err) {
            // @ts-ignore
            // err.message extracts the string from the Error object.
            // This works because we throw new Error(...) in api.ts.
            setError(err instanceof Error ? err : new Error('An error occured'));
        } finally {
            // finally always runs — whether the try succeeded or catch ran.
            // This ensures loading is always turned off.
            setLoading(false);
        }
    }

    // reset — clears all state back to initial values.
    // Used on the search screen to clear results when the query is emptied.
    const reset = () => {
        setData(null);
        setError(null);
        setLoading(false);
    }

    // useEffect — runs side effects after the component renders.
    // The empty array [] means "only run once when the component first mounts".
    // If autoFetch is true (default), it fetches immediately on mount.
    useEffect(() => {
        if (autoFetch) {
            fetchData();
        }
    }, []);

    // Return everything the component might need:
    // data, loading, error for display — refetch and reset for manual control.
    return { data, loading, error, refetch: fetchData, reset };
}

export default useFetch;
