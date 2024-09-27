import React, { useEffect, useState } from "react";
import { fetchAboutDescription } from "../../Services/Api";

function About() {
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getDescription = async () => {
      try {
        const data = await fetchAboutDescription();
        // Access the first element of the array and its description
        if (data.length > 0) {
          setDescription(data[0].description); // Access the description from the first object
        }
      } catch (err) {
        setError("Failed to fetch description");
      } finally {
        setLoading(false);
      }
    };

    getDescription();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div>
      <h2 className="text-3xl font-bold"></h2>
      <p>{description}</p>
    </div>
  );
}

export default About;