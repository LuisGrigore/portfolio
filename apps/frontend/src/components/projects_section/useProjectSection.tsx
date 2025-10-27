import { useEffect, useState } from "react";
import { getAllProjects } from "../../services/project.service";
import type { Project } from "../../model/project.model";

export const useProjectSection = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  useEffect(() => {
    getAllProjects().then((data) => setProjects(data));
  }, []);
  return projects;
};
