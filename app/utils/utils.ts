import { ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

export function formatComplexity(complexity: string) {
    return complexity.replace(/\^(\d+)/g, (_, exp) => `<sup>${exp}</sup>`);
}

export function capitalizeFirstLetter(str: string) {
    return str?.charAt(0).toUpperCase() + str?.slice(1);
}

// export const problems: Problem[] = [
//     {
//         id: 0,
//         title: "Two Sum",
//         slug: "two-sum",
//         difficulty: "Easy",
//         link: "https://leetcode.com/problems/two-sum/description/",
//         companies: ["Amazon", "Google", "Facebook", "Microsoft"],
//         timeComplexity: "O(n)",
//         spaceComplexity: "O(n)",
//         platform: "LeetCode",
//         topic: ["Array", "Hash Table"],
//     },
//     {
//         id: 1,
//         title: "Add Two Numbers",
//         slug: "add-two-numbers",
//         difficulty: "Medium",
//         link: "https://leetcode.com/problems/add-two-numbers/description/",
//         companies: ["Amazon", "Google", "Facebook", "Microsoft"],
//         timeComplexity: "O(n)",
//         spaceComplexity: "O(n)",
//         platform: "GeeksForGeeks",
//         topic: ["Linked List", "Math"],
//     },
//     {
//         id: 2,
//         title: "Longest Substring Without Repeating Characters",
//         slug: "longest-substring-without-repeating-characters",
//         difficulty: "Medium",
//         link: "https://leetcode.com/problems/longest-substring-without-repeating-characters/description/",
//         companies: ["Amazon", "Google", "Facebook", "Microsoft"],
//         timeComplexity: "O(n)",
//         spaceComplexity: "O(n)",
//         platform: "LeetCode",
//         topic: ["Hash Table", "Two Pointers", "String"],
//     },
//     {
//         id: 3,
//         title: "Container With Most Water",
//         slug: "container-with-most-water",
//         difficulty: "Medium",
//         link: "https://leetcode.com/problems/container-with-most-water/description/",
//         companies: ["Amazon", "Google", "Facebook", "Microsoft"],
//         timeComplexity: "O(n)",
//         spaceComplexity: "O(1)",
//         platform: "LeetCode",
//         topic: ["Array", "Two Pointers"],
//     },
//     {
//         id: 4,
//         title: "3Sum",
//         slug: "3sum",
//         difficulty: "Medium",
//         link: "https://leetcode.com/problems/3sum/description/",
//         companies: ["Amazon", "Google", "Facebook", "Microsoft"],
//         timeComplexity: "O(n^2)",
//         spaceComplexity: "O(1)",
//         platform: "LeetCode",
//         topic: ["Array", "Two Pointers"],
//     },
//     {
//         id: 5,
//         title: "4Sum",
//         slug: "4sum",
//         difficulty: "Medium",
//         link: "https://leetcode.com/problems/4sum/description/",
//         companies: ["Amazon", "Google", "Facebook", "Microsoft"],
//         timeComplexity: "O(n^3)",
//         spaceComplexity: "O(1)",
//         platform: "LeetCode",
//         topic: ["Array", "Two Pointers"],
//     },
//     {
//         id: 6,
//         title: "Letter Combinations of a Phone Number",
//         slug: "letter-combinations-of-a-phone-number",
//         difficulty: "Hard",
//         link: "https://leetcode.com/problems/letter-combinations-of-a-phone-number/description/",
//         companies: ["Amazon", "Google", "Facebook", "Microsoft"],
//         timeComplexity: "O(3^n * 4^m)",
//         spaceComplexity: "O(3^n * 4^m)",
//         platform: "LeetCode",
//         topic: ["String", "Backtracking"],
//     },
//     {
//         id: 7,
//         title: "Remove Nth Node From End of List",
//         slug: "remove-nth-node-from-end-of-list",
//         difficulty: "Medium",
//         link: "https://leetcode.com/problems/remove-nth-node-from-end-of-list/description/",
//         companies: ["Amazon", "Google", "Facebook", "Microsoft"],
//         timeComplexity: "O(n)",
//         spaceComplexity: "O(1)",
//         platform: "LeetCode",
//         topic: ["Linked List", "Two Pointers"],
//     },
//     {
//         id: 8,
//         title: "Valid Parentheses",
//         slug: "valid-parentheses",
//         difficulty: "Easy",
//         link: "https://leetcode.com/problems/valid-parentheses/description/",
//         companies: ["Amazon", "Google", "Facebook", "Microsoft"],
//         timeComplexity: "O(n)",
//         spaceComplexity: "O(n)",
//         platform: "LeetCode",
//         topic: ["String", "Stack"],
//     },
//     {
//         id: 9,
//         title: "Reverse Integer",
//         slug: "reverse-integer",
//         difficulty: "Easy",
//         link: "https://leetcode.com/problems/reverse-integer/description/",
//         companies: ["Amazon", "Google", "Facebook", "Microsoft"],
//         timeComplexity: "O(log(n))",
//         spaceComplexity: "O(1)",
//         platform: "LeetCode",
//         topic: ["Math"],
//     },
//     {
//         id: 10,
//         title: "Palindrome Number",
//         slug: "palindrome-number",
//         difficulty: "Easy",
//         link: "https://leetcode.com/problems/palindrome-number/description/",
//         companies: ["Amazon", "Google", "Facebook", "Microsoft"],
//         timeComplexity: "O(log(n))",
//         spaceComplexity: "O(1)",
//         platform: "LeetCode",
//         topic: ["Math"],
//     },
// ];

// export const inventories = [
//     {
//         id: 0,
//         title: "Sorting Algorithms",
//         description: "Learn about sorting algorithms",
//         slug: "sorting-algorithms",
//         problemCounts: 10,
//         createdAt: "2021-10-10",
//     },
//     {
//         id: 1,
//         title: "Searching Algorithms",
//         description: "Learn about searching algorithms",
//         slug: "searching-algorithms",
//         problemCounts: 10,
//         createdAt: "2021-10-10",
//     },
//     {
//         id: 2,
//         title: "Graph Algorithms",
//         description: "Learn about graph algorithms",
//         slug: "graph-algorithms",
//         problemCounts: 10,
//         createdAt: "2021-10-10",
//     },
//     {
//         id: 3,
//         title: "Dynamic Programming",
//         description: "Learn about dynamic programming",
//         slug: "dynamic-programming",
//         problemCounts: 10,
//         createdAt: "2021-10-10",
//     },
//     {
//         id: 4,
//         title: "Bit Manipulation",
//         description: "Learn about bit manipulation",
//         slug: "bit-manipulation",
//         problemCounts: 10,
//         createdAt: "2021-10-10",
//     },
//     {
//         id: 5,
//         title: "Greedy Algorithms",
//         description: "Learn about greedy algorithms",
//         slug: "greedy-algorithms",
//         problemCounts: 10,
//         createdAt: "2021-10-10",
//     },
//     {
//         id: 6,
//         title: "Backtracking",
//         description: "Learn about backtracking",
//         slug: "backtracking",
//         problemCounts: 10,
//         createdAt: "2021-10-10",
//     },
//     {
//         id: 7,
//         title: "Divide and Conquer",
//         description: "Learn about divide and conquer",
//         slug: "divide-and-conquer",
//         problemCounts: 10,
//         createdAt: "2021-10-10",
//     },
//     {
//         id: 8,
//         title: "Math",
//         description: "Learn about math",
//         slug: "math",
//         problemCounts: 10,
//         createdAt: "2021-10-10",
//     },
//     {
//         id: 9,
//         title: "String",
//         description: "Learn about string",
//         slug: "string",
//         problemCounts: 10,
//         createdAt: "2021-10-10",
//     },
// ];

export const ratingPlatforms = [
    {
        id: 1,
        platform: "LeetCode",
        imgSrc: "https://creatorspace.imgix.net/sites/favicons/aHR0cHM6Ly9sZWV0Y29kZS5jb20vZmF2aWNvbi5pY28=.ico?fm=png",
    },
    {
        id: 2,
        platform: "Codeforces",
        imgSrc: "https://cdn.iconscout.com/icon/free/png-256/free-code-forces-logo-icon-download-in-svg-png-gif-file-formats--technology-social-media-vol-2-pack-logos-icons-2944796.png?f=webp&w=256",
    },
    {
        id: 3,
        platform: "Codechef",
        imgSrc: "https://img.icons8.com/fluent/512/codechef.png",
    },
    {
        id: 4,
        platform: "GeeksforGeeks",
        imgSrc: "https://upload.wikimedia.org/wikipedia/commons/e/eb/GeeksForGeeks_logo.png",
    },
    {
        id: 5,
        platform: "AtCoder",
        imgSrc: "https://i.namu.wiki/i/oloBJdRd29lBIF-mdv1FjWucpE3tGPhudDBTvOBChAT3A5w9zDUYg51mvn6NNOwoHJZIwxkVyzeXQMhtLAcQOQ.webp",
    },
];

export const ratingImagesMap: Record<string, string> = {
    leetcode:
        "https://creatorspace.imgix.net/sites/favicons/aHR0cHM6Ly9sZWV0Y29kZS5jb20vZmF2aWNvbi5pY28=.ico?fm=png",
    codeforces:
        "https://cdn.iconscout.com/icon/free/png-256/free-code-forces-logo-icon-download-in-svg-png-gif-file-formats--technology-social-media-vol-2-pack-logos-icons-2944796.png?f=webp&w=256",
    codechef: "https://img.icons8.com/fluent/512/codechef.png",
    geeksforgeeks:
        "https://storage.googleapis.com/creatorspace-public/sites%2Ffavicons%2FaHR0cHM6Ly9tZWRpYS5nZWVrc2ZvcmdlZWtzLm9yZy93cC1jb250ZW50L2Nkbi11cGxvYWRzL2dmZ19mYXZpY29uLnBuZw%3D%3D.png",
    atcoder:
        "https://i.namu.wiki/i/oloBJdRd29lBIF-mdv1FjWucpE3tGPhudDBTvOBChAT3A5w9zDUYg51mvn6NNOwoHJZIwxkVyzeXQMhtLAcQOQ.webp",
};
