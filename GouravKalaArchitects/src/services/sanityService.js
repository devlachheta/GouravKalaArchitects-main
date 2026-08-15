import { client } from "../sanity/client";
import {
    GET_ARCHITECTURE_PROJECTS,
    GET_INTERIOR_PROJECTS,
    GET_ARCHITECTURE_PROJECT,
    GET_INTERIOR_PROJECT,
    GET_HOMEPAGE_STATISTICS,
    GET_ABOUT_SOCIAL_STATISTICS,
} from "../sanity/queries";

// Get all architecture projects
export const getArchitectureProjects = async () => {
    return await client.fetch(GET_ARCHITECTURE_PROJECTS);
};

// Get all interior projects
export const getInteriorProjects = async () => {
    return await client.fetch(GET_INTERIOR_PROJECTS);
};

// Get single architecture project by slug
export const getArchitectureProject = async (slug) => {
    return await client.fetch(GET_ARCHITECTURE_PROJECT, { slug });
};

// Get single interior project by slug
export const getInteriorProject = async (slug) => {
    return await client.fetch(GET_INTERIOR_PROJECT, { slug });
};

// Get homepage statistics
export const getHomepageStatistics = async () => {
    return await client.fetch(GET_HOMEPAGE_STATISTICS);
};

// Get About social statistics
export const getAboutSocialStatistics = async () => {
    return await client.fetch(GET_ABOUT_SOCIAL_STATISTICS);
};