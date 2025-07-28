// Node.js equivalents of Redis Search commands
import { createClient } from "redis";

const client = createClient();
await client.connect();

// ðŸ”Ž Fuzzy Search (Approximate Matching)
await client.ft.search("userIdx", "%Kumar%");

// ðŸŒ  Search by Any Word (Logical OR)
await client.ft.search("userIdx", "Bhupesh|Sahil");

// ðŸ“ƒ Paging Results (Pagination)
await client.ft.search("userIdx", "Delhi", {
  LIMIT: {
    from: 10,
    size: 5,
  },
});

// ðŸš« Excluding Words from Search
await client.ft.search("userIdx", "-Sanat");

// ðŸ”  Partial Word Search
// Prefix Match
await client.ft.search("userIdx", "Kum*");

// Suffix Match
await client.ft.search("userIdx", "*mar");

// Specific Suffix Match
await client.ft.search("userIdx", "*maar");

// Disconnect when done
await client.quit();
