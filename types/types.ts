export type ProblemContainerType = {
    problem_id: string;
    platform_name: string;
    expanded: number | boolean;
    setExpanded: React.Dispatch<React.SetStateAction<number | boolean>>;
    problem_name: string;
    difficulty: string;
    url: string;
    companies: CompanyType[];
    tags: TagType[];
    resources: string[];
    time_complexity: string;
    space_complexity: string;
    inventories?: InventoryType[];
    notes?: string;
    is_revision?: boolean;
    idx?: number;
};

export type ProblemType = {
    problem_id: string;
    platform_name: string;
    expanded: number | boolean;
    problem_name: string;
    difficulty: string;
    url: string;
    companies: CompanyType[];
    tags: TagType[];
    resources: string[];
    time_complexity: string;
    space_complexity: string;
    inventories?: InventoryType[];
    notes?: string;
    is_revision?: boolean;
};

export type InventoryType = {
    inventory_id: string;
    inventory_name: string;
    inventory_desc?: string;
    problem_count: number;
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
    tag_id: string;
    tag_name: string;
};

export type CompanyType = {
    company_id: string;
    company_name: string;
};
