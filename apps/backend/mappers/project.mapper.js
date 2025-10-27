export function toProjectDTO(project) {
    return {
        id: project._id.toString(),
        title: project.title,
        description: project.description,
        image_url: project.image_url,
        tags: project.tags,
        github_url: project.github_url,
        demo_url: project.demo_url,
    };
}
