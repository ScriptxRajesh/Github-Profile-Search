export interface User {
    login: string;
    id: number;
    avatar_url: string;
    html_url: string;
}

export interface Profile extends User {
    name: string | null;
    bio: string | null;
    location: string | null;
    followers: number;
    following: number;
    blog: string | null;
    twitter_username: string | null;
    public_repos: number;
    email: string | null;
}

export interface Repository {
    id: number;
    name: string;
    html_url: string;
    description?: string;
    stargazers_count: number;
    language?: string;
    updated_at: string;
    forks_count: number;
}

export interface SearchUsersResponse {
    items: User[];
    total_count: number;
}