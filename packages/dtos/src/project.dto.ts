
export interface ProjectDTO {
  id: string;
  title: string;
  description: string;
  image_url: string;
  tags: string[];
  github_url?: string;
  demo_url?: string;
}