import React, { useEffect, useState } from "react";
import ApiService from "../services/ApiService";
import { STORAGE_TYPES } from "../utils/Constants";

interface Space {
  title: string;
  lastModifiedDate: string;
}

const HomePage = () => {
  const [spaces, setSpaces] = useState<Space[]>([]);
  const apiService = new ApiService("https://api.phoenixhub.app");

  useEffect(() => {
    const fetchSpaceData = async () => {
      const token = localStorage.getItem(STORAGE_TYPES.ACCESS_TOKEN);
      try {
        const response = await apiService.get("/Space", {
          headers: {
            accept: "application/json",
            Authorization: `Bearer ${token}`,
          },
        });
        setSpaces(response.items);
      } catch (error: any) {
        const msg = error.response.data.Errors;
        console.error("Error fetching space data:", error);
      }
    };

    fetchSpaceData();
  }, []);

  return (
    <div>
      <p>Home Page</p>
      {spaces.length > 0 ? (
        <div>
          <h2>Spaces</h2>
          <ul>
            {spaces.map((space, index) => (
              <li key={index}>
                <h3>{space.title}</h3>
                <p>
                  Last Modified Date:{" "}
                  {new Date(space.lastModifiedDate).toLocaleString()}
                </p>
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <p>Loading spaces data...</p>
      )}
    </div>
  );
};

export default HomePage;
