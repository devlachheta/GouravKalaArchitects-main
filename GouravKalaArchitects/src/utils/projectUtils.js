const API_URL = "http://127.0.0.1:8000/api/public/projects/";

const getAllProjects = async () => {
    const response = await fetch(API_URL);

    if (!response.ok) {
        throw new Error("Failed to fetch projects");
    }

    const data = await response.json();

    return Array.isArray(data)
        ? data
        : data.results || [];
};


export const getArchitectureProjects = async () => {
    const projects = await getAllProjects();

    return projects.filter(
        (project) => project.type === "architecture"
    );
};


export const getInteriorProjects = async () => {
    const projects = await getAllProjects();

    return projects.filter(
        (project) => project.type === "interior"
    );
};