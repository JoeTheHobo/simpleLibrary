function _search(query, array) {
    // Function to calculate the Levenshtein distance between two strings
    function levenshteinDistance(s1, s2) {
        const m = s1.length;
        const n = s2.length;
        const dp = Array.from(Array(m + 1), () => Array(n + 1).fill(0));

        for (let i = 0; i <= m; i++) {
            for (let j = 0; j <= n; j++) {
                if (i === 0) {
                    dp[i][j] = j;
                } else if (j === 0) {
                    dp[i][j] = i;
                } else {
                    dp[i][j] = Math.min(
                        dp[i - 1][j - 1] + (s1[i - 1] === s2[j - 1] ? 0 : 1),
                        dp[i - 1][j] + 1,
                        dp[i][j - 1] + 1
                    );
                }
            }
        }
        return dp[m][n];
    }

    // Calculate Levenshtein distance for each item in the array
    const distances = array.map(item => ({
        item,
        distance: levenshteinDistance(query.toLowerCase(), item.toLowerCase())
    }));

    // Sort the array by distance (relevance)
    distances.sort((a, b) => a.distance - b.distance);

    // Return the array sorted by relevance
    return distances.map(({ item }) => item);
}
