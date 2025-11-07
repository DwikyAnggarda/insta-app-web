import { useEffect, useState } from "react";
import { useAuth } from "../hooks/useAuth";
import { Calendar, Mail, AtSign } from "lucide-react";
import api from "../lib/api";
import PostCard from "../components/PostCard";

export default function Profile() {
    const { user } = useAuth();
    const [myPosts, setMyPosts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchMyPosts();
    }, []);

    const fetchMyPosts = async () => {
        try {
            const res = await api.get("/posts");
            const allPosts = res.data.data || res.data;
            // Filter posts by current user
            const userPosts = allPosts.filter((post) => post.user?.id === user?.id);
            setMyPosts(userPosts);
        } catch (err) {
            console.error("Error fetching posts:", err);
        } finally {
            setLoading(false);
        }
    };

    const handlePostUpdate = (updatedPost) => {
        setMyPosts(myPosts.map((p) => (p.id === updatedPost.id ? updatedPost : p)));
    };

    const handlePostDelete = (postId) => {
        setMyPosts(myPosts.filter((p) => p.id !== postId));
    };

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString("en-US", { month: "long", year: "numeric" });
    };

    if (!user) return null;

    return (
        <div className="pb-20">
            {/* Profile Header */}
            <div className="bg-gradient-to-br from-purple-100 to-blue-100 p-6">
                <div className="flex flex-col items-center">
                    {/* Avatar */}
                    <div className="relative">
                        <img
                            src={user.avatar_url || "https://ui-avatars.com/api/?name=" + encodeURIComponent(user.name)}
                            alt={user.name}
                            className="w-24 h-24 rounded-full object-cover border-4 border-white shadow-lg"
                        />
                    </div>

                    {/* User Info */}
                    <h2 className="text-2xl font-bold text-gray-800 mt-4">{user.name}</h2>
                    
                    {user.username && (
                        <div className="flex items-center gap-1 text-gray-600 mt-1">
                            <AtSign size={14} />
                            <span className="text-sm">{user.username}</span>
                        </div>
                    )}

                    <div className="flex items-center gap-1 text-gray-600 mt-1">
                        <Mail size={14} />
                        <span className="text-sm">{user.email}</span>
                    </div>

                    {user.created_at && (
                        <div className="flex items-center gap-1 text-gray-500 mt-2 text-xs">
                            <Calendar size={12} />
                            <span>Joined {formatDate(user.created_at)}</span>
                        </div>
                    )}
                </div>

                {/* Stats */}
                <div className="flex justify-around mt-6 bg-white rounded-lg p-4 shadow-sm">
                    <div className="text-center">
                        <p className="text-2xl font-bold text-gray-800">{myPosts.length}</p>
                        <p className="text-xs text-gray-600">Posts</p>
                    </div>
                    <div className="text-center">
                        <p className="text-2xl font-bold text-gray-800">
                            {myPosts.reduce((sum, post) => sum + (post.likes_count || 0), 0)}
                        </p>
                        <p className="text-xs text-gray-600">Likes</p>
                    </div>
                    <div className="text-center">
                        <p className="text-2xl font-bold text-gray-800">
                            {myPosts.reduce((sum, post) => sum + (post.comments?.length || 0), 0)}
                        </p>
                        <p className="text-xs text-gray-600">Comments</p>
                    </div>
                </div>
            </div>

            {/* My Posts */}
            <div className="px-4 mt-6">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">My Posts</h3>

                {loading ? (
                    <div className="text-center py-10">
                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto"></div>
                        <p className="mt-4 text-gray-600">Loading your posts...</p>
                    </div>
                ) : myPosts.length === 0 ? (
                    <div className="text-center py-10">
                        <div className="text-6xl mb-4">📸</div>
                        <h4 className="text-lg font-semibold text-gray-800 mb-2">No posts yet</h4>
                        <p className="text-gray-600">Share your first moment!</p>
                    </div>
                ) : (
                    myPosts.map((post) => (
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
