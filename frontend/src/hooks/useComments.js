import api from "../lib/api";

export const useComments = () => {
    const addComment = async (postId, body) => {
        const res = await api.post(`/posts/${postId}/comments`, { body });
        return res;
    };

    const deleteComment = async (commentId) => {
        const res = await api.delete(`/comments/${commentId}`);
        return res;
    };

    return { addComment, deleteComment };
};
