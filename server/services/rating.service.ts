import * as cheerio from "cheerio";
import { PlatformUrlConfig } from "../types/db/interfaces";



const PLATFORM_URLS: PlatformUrlConfig = {
    codechef: (username: string) =>
        `https://www.codechef.com/users/${username}`,
    codeforces: (username: string) =>
        `https://codeforces.com/profile/${username}`,
    geeksforgeeks: (username: string) =>
        `https://auth.geeksforgeeks.org/user/${username}/practice`,
    atcoder: (username: string) => `https://atcoder.jp/users/${username}`,
};

export async function fetchLeetCodeRating(username: string): Promise<{
    platform: string;
    username: string;
    rating: number | string | null;
}> {
    const url = "https://leetcode.com/graphql";
    const body = JSON.stringify({
        query: `
            query userContestRankingInfo($username: String!) {
                userContestRanking(username: $username) {
                    rating
                }
            }
        `,
        variables: { username },
        operationName: "userContestRankingInfo",
    });

    const response = await fetch(url, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body,
    });

    if (!response.ok) {
        return {
            platform: "leetcode",
            username,
            rating: "Failed to fetch data",
        };
    }

    const data = await response.json();
    const rating = Math.ceil(data?.data?.userContestRanking?.rating) ?? "N/A";

    return { platform: "leetcode", username, rating };
}

export async function fetchRating(
    platform: string,
    username: string
): Promise<{
    platform: string;
    username: string;
    rating: string | number | null;
}> {
    if (platform === "leetcode") {
        return fetchLeetCodeRating(username);
    }

    if (!PLATFORM_URLS[platform]) {
        return { platform, username, rating: "Platform not supported" };
    }

    const url = PLATFORM_URLS[platform](username);
    const response = await fetch(url);
    if (!response.ok) {
        return { platform, username, rating: "Failed to fetch data" };
    }

    const html = await response.text();
    const $ = cheerio.load(html);

    let rating: string | null = "N/A";

    switch (platform) {
        case "codechef":
            rating = $(".rating-number").text().trim();
            break;
        case "codeforces":
            rating = $(".userbox ul span").first().text().trim();
            break;
        case "geeksforgeeks":
            rating = $('[class^="scoreCard_head_left--score"]')
                .eq(2)
                .text()
                .trim();
            break;
        case "atcoder":
            rating = $(".dl-table").eq(1).find("span").text().trim();
            break;
    }

    return { platform, username, rating };
}


