import projectsData from "../data/projectsData";

// Get all projects
export const getAllProjects = () => projectsData;

// Get architecture projects
export const getArchitectureProjects = () =>
    projectsData.filter(project => project.type === "architecture");

// Get interior projects
export const getInteriorProjects = () =>
    projectsData.filter(project => project.type === "interior");

// Find project by slug
export const getProjectBySlug = (slug) =>
    projectsData.find(project => project.slug === slug);

// Get featured projects
export const getFeaturedProjects = () =>
    projectsData.filter(project => project.featured);

// Get project by ID
export const getProjectById = (id) =>
    projectsData.find(project => project.id === id);

// Get related projects
export const getRelatedProjects = (currentProject, limit = 3) => {
    return projectsData
        .filter(
            project =>
                project.type === currentProject.type &&
                project.id !== currentProject.id
        )
        .slice(0, limit);
};

// Previous project
export const getPreviousProject = (currentSlug) => {
    const index = projectsData.findIndex(
        project => project.slug === currentSlug
    );

    if (index <= 0) return null;

    return projectsData[index - 1];
};

// Next project
export const getNextProject = (currentSlug) => {
    const index = projectsData.findIndex(
        project => project.slug === currentSlug
    );

    if (index === -1 || index === projectsData.length - 1) return null;

    return projectsData[index + 1];
};