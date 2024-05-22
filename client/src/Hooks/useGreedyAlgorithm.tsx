import { useState, useEffect } from 'react';

// Custom hook for sorting data using a greedy algorithm
function useGreedyAlgorithm<T>(data: T[], key: keyof T): T[] {
    // State to hold the sorted data
    const [sortedData, setSortedData] = useState<T[]>([]);

    useEffect(() => {
        // Function to perform the greedy sorting
        const greedySort = (data: T[], key: keyof T): T[] => {
            // Create a copy of the data to avoid mutating the original array
            const sorted = [...data];

            // Sort the data using the key provided
            sorted.sort((a, b) => {
                // Extract the values to compare
                const valueA = a[key];
                const valueB = b[key];

                // Handle comparison based on the type of the values
                if (typeof valueA === 'number' && typeof valueB === 'number') {
                    return valueA - valueB; // Numeric comparison
                }
                if (typeof valueA === 'string' && typeof valueB === 'string') {
                    return valueA.localeCompare(valueB); // String comparison
                }

                // Fallback for unsupported types (objects, arrays, etc.)
                return 0;
            });

            return sorted; // Return the sorted array
        };

        // Sort the data whenever 'data' or 'key' changes
        setSortedData(greedySort(data, key));
    }, [data, key]); // Dependencies array: triggers useEffect when data or key changes

    return sortedData; // Return the sorted data
}

export default useGreedyAlgorithm;

// Example usage
// Initial state with an array of items
    // const [items, setItems] = useState<Item[]>([
    //     { name: 'Item A', value: 3 },
    //     { name: 'Item B', value: 1 },
    //     { name: 'Item C', value: 2 },
    // ]);

// Use the custom hook to get the sorted items
// Sorting by the 'value' property
    // const sortedItems = useGreedyAlgorithm(items, 'value');