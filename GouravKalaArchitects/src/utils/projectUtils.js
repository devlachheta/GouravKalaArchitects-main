import projectsData from "../data/projectsData";

import { client } from "../sanity/client";

import {
    GET_ARCHITECTURE_PROJECTS,
    GET_INTERIOR_PROJECTS,
} from "../sanity/queries";


// ========================================
// GET ARCHITECTURE PROJECTS
// ========================================

export const getArchitectureProjects = async () => {

    const sanityProjects = await client.fetch(GET_ARCHITECTURE_PROJECTS);

    return [
        ...projectsData.filter(
            (project) => project.type === "architecture"
        ),

        ...sanityProjects,
    ];
};


// ========================================
// GET INTERIOR PROJECTS
// ========================================

export const getInteriorProjects = async () => {

    const sanityProjects = await client.fetch(GET_INTERIOR_PROJECTS);

    return [
        ...projectsData.filter(
            (project) => project.type === "interior"
        ),

        ...sanityProjects,
    ];
};