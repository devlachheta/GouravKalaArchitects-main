
import { useEffect, useState } from "react";
import { client } from "./sanity/client";
import { GET_ARCHITECTURE_PROJECTS } from "./sanity/queries";

function TestSanity() {
    const [projects, setProjects] = useState([]);

    useEffect(() => {
        client.fetch(GET_ARCHITECTURE_PROJECTS).then((data) => {
            console.log(data);
            console.log(projects);
            setProjects(data);
        });
    }, []);


    return (
        <div>
            {projects.map((project) => (
                <div key={project._id}>
                    <h1>{project.title}</h1>

                    <img
                        src={project.coverImage}
                        alt=""
                        width="500"
                        style={{ border: "5px solid red" }}
                        onLoad={() => console.log("IMAGE LOADED")}
                        onError={() => console.log("IMAGE FAILED")}
                    />
                </div>
            ))}
        </div>
    );
}


export default TestSanity;