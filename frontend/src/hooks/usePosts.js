import { useState } from "react";
import api from "../lib/api";

export function usePosts() {
    const [posts, setPosts] = useState([]);
    const [meta, setMeta] = useState(null);
    const [loading, setLoading] = useState(false);

    const fetchPosts = async (page = 1) => {
        setLoading(true);
        const res = await api.get("/posts", { params: { page } });
        // Laravel pagination resource: res.data.data
        setPosts(res.data.data || res.data);
        setMeta(res.data.meta || null);
        setLoading(false);
        return res;
    };

    const createPost = async (formData) => {
        const res = await api.post("/posts", formData, {
            headers: { "Content-Type": "multipart/form-data" },
        });
        return res;
    };

    const updatePost = async (id, formData) => {
        const res = await api.put(`/posts/${id}`, formData);
        return res;
    };

    const deletePost = async (id) => {
        const res = await api.delete(`/posts/${id}`);
        return res;
    };

    const toggleLike = async (postId) => {
        const res = await api.post(`/posts/${postId}/like`);
        return res;
    };

    return { posts, setPosts, meta, loading, fetchPosts, createPost, updatePost, deletePost, toggleLike };
}
