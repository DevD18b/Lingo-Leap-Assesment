function maxMoves(grid) {
    const n = grid.length;
    const m = grid[0].length;
    const dp = new Array(n);

    for (let i = 0; i < n; i++) {
        dp[i] = new Array(m).fill(-1);
    }

    let max = Number.MIN_SAFE_INTEGER;

    for (let i = 0; i < n; i++) {
        max = Math.max(max, dfs(grid, grid[i][0], i, 0, dp));
    }

    return max;
}

function tabulation(grid) {
    const n = grid.length;
    const m = grid[0].length;
    const dp = new Array(n + 1);

    for (let i = 0; i <= n; i++) {
        dp[i] = new Array(m + 1).fill(0);
    }

    for (let col = m - 2; col >= 0; col--) {
        for (let row = 0; row < n; row++) {
            if (row !== 0) {
                if (grid[row - 1][col + 1] > grid[row][col]) {
                    dp[row][col] = Math.max(dp[row - 1][col + 1] + 1, dp[row][col]);
                }
            }
            if (row !== n - 1) {
                if (grid[row + 1][col + 1] > grid[row][col]) {
                    dp[row][col] = Math.max(1 + dp[row + 1][col + 1], dp[row][col]);
                }
            }
            if (grid[row][col + 1] > grid[row][col]) {
                dp[row][col] = Math.max(dp[row][col + 1] + 1, dp[row][col]);
            }
        }
    }

    let ans = Number.MIN_SAFE_INTEGER;
    for (let i = 0; i < dp.length; i++) {
        for (let j = 0; j < dp[0].length; j++) {
            ans = Math.max(ans, dp[i][j]);
        }
    }

    return ans;
}

function dfs(grid, value, row, col, dp) {
    if (row < 0 || col < 0 || row >= grid.length || col >= grid[0].length) return -1;

    if (col !== 0 && grid[row][col] <= value) return -1;

    if (dp[row][col] !== -1) return dp[row][col];

    dp[row][col] = 1 + Math.max(
        dfs(grid, grid[row][col], row - 1, col + 1, dp),
        Math.max(
            dfs(grid, grid[row][col], row, col + 1, dp),
            dfs(grid, grid[row][col], row + 1, col + 1, dp)
        )
    );

    return dp[row][col];
}

const grid = [
    [2, 4, 3, 5],
    [5, 4, 9, 3],
    [3, 4, 2, 11],
    [10, 9, 13, 15]
];

console.log(tabulation(grid));
