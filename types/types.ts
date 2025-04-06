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
    inventory_id?: string;
    inventory_name: string;
    inventory_desc?: string;
    problemCount?: number;
    createdAt?: Date;
};

export type Platform = {
    id: number;
    platform: string;
    username: string;
    imgSrc: string;
    show: boolean;
};

export type Rating = {
    platform: string;
    rating?: number;
    username: string;
    show: boolean;
};

export type TagType = {
    tag_name: string;
    tag_type: string;
};

export type CompanyType = {
    _id: string;
    company_tag_name: string;
};
