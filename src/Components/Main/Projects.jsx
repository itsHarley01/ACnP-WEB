import React, { useEffect, useState } from "react";
import { fetchProjects } from "../../Services/Api";

function Projects() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getProjects = async () => {
      try {
        const data = await fetchProjects();
        console.log(data);
        setProjects(data); // Adjust based on your API response structure
      } catch (err) {
        setError("Failed to fetch projects");
      } finally {
        setLoading(false);
      }
    };

    getProjects();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="">
     
      
      {/* Project Collage */}
      <div className="relative container mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {projects.map((project, index) => (
          <div
            key={project._id}
            className={`overflow-hidden rounded-lg shadow-lg transition-all duration-300 hover:scale-105 hover:z-10 ${
              index % 2 === 0 ? "transform rotate-0" : "transform -rotate-0"
            }`}
            style={{
              gridColumn: `${(index % 3) + 1}`, // Alternates columns for more dynamic collage layout
              gridRow: `${Math.floor(index / 3) + 1}`,
            }}
          >
            <img
              src={project.uri} // Adjust based on your API response
              alt={`Project ${project._id}`} // Use a descriptive alt attribute
              className="w-full h-64 object-cover"
            />
          </div>
        ))}
      </div>
    </div>
  );
}

export default Projects;
