const useGreedyAlgorithm = () => {
    // Define the type for the sorting order
    type SortOrder = 'asc' | 'desc';

    // Custom hook for sorting data using a greedy algorithm
    function sortData<T>(data: T[], key: keyof T, order: SortOrder = 'asc'): T[] {
        // Create a copy of the data to avoid mutating the original array
        const sorted = [...data];

        // Function to perform the greedy sorting
        const greedySort = (data: T[], key: keyof T, order: SortOrder): T[] => {
            // Sort the data using the key provided
            sorted.sort((a, b) => {
                // Extract the values to compare
                const valueA = a[key];
                const valueB = b[key];

                // Handle comparison based on the type of the values
                let comparison = 0;
                if (typeof valueA === 'number' && typeof valueB === 'number') {
                    comparison = valueA - valueB; // Numeric comparison
                } else if (typeof valueA === 'string' && typeof valueB === 'string') {
                    comparison = valueA.localeCompare(valueB); // String comparison
                }

                // Adjust comparison result based on the sort order
                return order === 'asc' ? comparison : -comparison;
            });

            return sorted; // Return the sorted array
        };

        // Sort the data whenever 'data', 'key', or 'order' changes
        return greedySort(sorted, key, order); // Return the sorted data
    }

    return { sortData }; 
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
    // const {sortData} = useGreedyAlgorithm();
    // const sortedItems = sortData(items, 'value', 'asc');