export type ProblemContainerType = {
    id: number;
    expanded: number | boolean;
    setExpanded: React.Dispatch<React.SetStateAction<number | boolean>>;
    title: string;
    difficulty: string;
    link: string;
    companies: string[];
    timeComplexity: string;
    spaceComplexity: string;
    platform: string;
    topic: string[];
    slug: string;
};

export type Problem = {
    id: number;
    title: string;
    slug: string;
    difficulty: string;
    link: string;
    companies: string[];
    timeComplexity: string;
    spaceComplexity: string;
    platform: string;
    topic: string[];
};

export type InventoryType = {
    id: number;
    title: string;
    description: string;
    problemCount: number;
    slug: string;
    createdAt: string;
};

export type Platform = {
    id: number;
    platform: string;
    username: string;
    imgSrc: string;
};
