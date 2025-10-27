export function toMessageDTO(message) {
    return {
        id: message._id.toString(),
        name: message.name,
        email: message.email,
        content: message.content,
        createdAt: message.createdAt,
    };
}
