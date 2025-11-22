export enum Category {
  Frontend = "Frontend",
  Backend = "Backend",
}

export type Skill = {
  name: string;
  level: number;
  category: Category;
};

export type CategoryFilter = Category | "All";
