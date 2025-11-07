import { useEffect, useState } from "react";
import { RefreshCw } from "lucide-react";
import api from "../lib/api";
import PostCard from "../components/PostCard";

export default function Home() {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [refreshing, setRefreshing] = useState(false);

    const fetchPosts = async () => {
        try {
            const res = await api.get("/posts");
            setPosts(res.data.data || res.data);
        } catch (err) {
            console.error("Error fetching posts:", err);
        } finally {
            setLoading(false);
            setRefreshing(false);
        }
    };

    useEffect(() => {
        fetchPosts();
    }, []);

    const handleRefresh = () => {
        setRefreshing(true);
        fetchPosts();
    };

    const handlePostUpdate = (updatedPost) => {
        setPosts(posts.map((p) => (p.id === updatedPost.id ? updatedPost : p)));
    };

    const handlePostDelete = (postId) => {
        setPosts(posts.filter((p) => p.id !== postId));
    };

    const handleNewPost = (newPost) => {
        setPosts([newPost, ...posts]);
    };

    return (
        <div className="pb-20 pt-2">
            {/* Refresh Button */}
            <div className="px-4 py-2 flex justify-between items-center">
                <h2 className="text-lg font-semibold text-gray-800">Feed</h2>
                <button
                    onClick={handleRefresh}
                    disabled={refreshing}
                    className="p-2 hover:bg-gray-100 rounded-full transition disabled:opacity-50"
                    title="Refresh"
                >
                    <RefreshCw size={20} className={refreshing ? "animate-spin" : ""} />
                </button>
            </div>

            {/* Posts */}
            <div className="px-4">
                {loading ? (
                    <div className="text-center py-20">
                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto"></div>
                        <p className="mt-4 text-gray-600">Loading posts...</p>
                    </div>
                ) : posts.length === 0 ? (
                    <div className="text-center py-20">
                        <div className="text-6xl mb-4">📸</div>
                        <h3 className="text-xl font-semibold text-gray-800 mb-2">No posts yet</h3>
                        <p className="text-gray-600">Be the first to share something!</p>
                    </div>
                ) : (
                    posts.map((post) => (
                        <PostCard
                            key={post.id}
                            post={post}
                            onUpdate={handlePostUpdate}
                            onDelete={handlePostDelete}
                        />
                    ))
                )}
            </div>
        </div>
    );
}

