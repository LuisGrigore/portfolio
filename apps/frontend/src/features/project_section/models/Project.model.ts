export type Project = {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  tags: string[];
  githubUrl?: string;
  readmeUrl?: string;
  demoUrl?: string;
};

export type ProjectsPage = {
	projects: Project[];
	totalPages: number;
	currentPage: number;
}

