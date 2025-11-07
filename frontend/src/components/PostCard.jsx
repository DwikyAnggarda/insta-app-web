import React, { useState, useEffect } from "react";
import { useAuth } from "../hooks/useAuth";
import { Heart, MessageCircle, MoreVertical, Trash2, Edit2 } from "lucide-react";
import CommentModal from "./CommentModal";
import EditPostModal from "./EditPostModal";
import api from "../lib/api";

const PostCard = ({ post, onUpdate, onDelete }) => {
    const { user } = useAuth();
    const [isLiking, setIsLiking] = useState(false);
    const [liked, setLiked] = useState(post.liked_by_me || false);
    const [likesCount, setLikesCount] = useState(post.likes_count || 0);
    const [showComments, setShowComments] = useState(false);
    const [comments, setComments] = useState(post.comments || []);
    const [showMenu, setShowMenu] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);
    const [deleting, setDeleting] = useState(false);

    const isOwner = user && post.user?.id === user.id;

    // Update liked state when post prop changes (important for navigation fix!)
    useEffect(() => {
        setLiked(post.liked_by_me || false);
        setLikesCount(post.likes_count || 0);
        setComments(post.comments || []);
    }, [post.liked_by_me, post.likes_count, post.comments]);

    const handleLike = async () => {
        if (isLiking) return;
        
        setIsLiking(true);
        const prevLiked = liked;
        const prevCount = likesCount;
        
        // Optimistic update
        setLiked(!liked);
        setLikesCount(liked ? likesCount - 1 : likesCount + 1);
        
        try {
            const res = await api.post(`/posts/${post.id}/like`);
            const newLiked = res.data.liked;
            const newCount = res.data.likes_count;
            
            setLiked(newLiked);
            setLikesCount(newCount);
            
            // Update parent component's post data
            if (onUpdate) {
                onUpdate({
                    ...post,
                    liked_by_me: newLiked,
                    likes_count: newCount,
                });
            }
        } catch (err) {
            console.error("Error toggling like:", err);
            // Revert on error
            setLiked(prevLiked);
            setLikesCount(prevCount);
        } finally {
            setIsLiking(false);
        }
    };

    const handleDelete = async () => {
        if (!confirm("Are you sure you want to delete this post?")) return;
        
        setDeleting(true);
        try {
            await api.delete(`/posts/${post.id}`);
            onDelete?.(post.id);
        } catch (err) {
            console.error("Error deleting post:", err);
            alert("Failed to delete post");
        } finally {
            setDeleting(false);
        }
    };

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        const now = new Date();
        const diffMs = now - date;
        const diffMins = Math.floor(diffMs / 60000);
        const diffHours = Math.floor(diffMs / 3600000);
        const diffDays = Math.floor(diffMs / 86400000);

        if (diffMins < 1) return "just now";
        if (diffMins < 60) return `${diffMins}m ago`;
        if (diffHours < 24) return `${diffHours}h ago`;
        if (diffDays < 7) return `${diffDays}d ago`;
        return date.toLocaleDateString();
    };

    return (
        <>
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 mb-4">
                {/* Header */}
                <div className="flex items-center justify-between p-3">
                    <div className="flex items-center gap-3">
                        <img
                            src={post.user?.avatar_url || "https://ui-avatars.com/api/?name=" + encodeURIComponent(post.user?.name || "User")}
                            alt={post.user?.name}
                            className="w-10 h-10 rounded-full object-cover"
                        />
                        <div>
                            <p className="font-semibold text-sm">{post.user?.name}</p>
                            <p className="text-xs text-gray-500">{formatDate(post.created_at)}</p>
                        </div>
                    </div>
                    
                    {isOwner && (
                        <div className="relative">
                            <button
                                onClick={() => setShowMenu(!showMenu)}
                                className="p-1 hover:bg-gray-100 rounded-full transition"
                            >
                                <MoreVertical size={20} className="text-gray-600" />
                            </button>
                            
                            {showMenu && (
                                <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-1 z-10">
                                    <button
                                        onClick={() => {
                                            setShowEditModal(true);
                                            setShowMenu(false);
                                        }}
                                        className="w-full px-4 py-2 text-left text-sm hover:bg-gray-50 flex items-center gap-2"
                                    >
                                        <Edit2 size={16} />
                                        Edit Post
                                    </button>
                                    <button
                                        onClick={handleDelete}
                                        disabled={deleting}
                                        className="w-full px-4 py-2 text-left text-sm text-red-600 hover:bg-red-50 flex items-center gap-2 disabled:opacity-50"
                                    >
                                        <Trash2 size={16} />
                                        {deleting ? "Deleting..." : "Delete Post"}
                                    </button>
                                </div>
                            )}
                        </div>
                    )}
                </div>

                {/* Image */}
                {post.image_url && (
                    <img
                        src={post.image_url}
                        alt="Post"
                        className="w-full object-cover max-h-[400px]"
                    />
                )}

                {/* Caption */}
                {post.body && (
                    <div className="p-3">
                        <p className="text-sm whitespace-pre-wrap">{post.body}</p>
                    </div>
                )}

                {/* Actions */}
                <div className="flex items-center gap-4 px-3 py-2 border-t border-gray-100">
                    <button
                        onClick={handleLike}
                        disabled={isLiking}
                        className="flex items-center gap-1 hover:text-pink-500 transition disabled:opacity-50"
                    >
                        <Heart
                            size={22}
                            className={liked ? "fill-pink-500 text-pink-500" : "text-gray-700"}
                        />
                        <span className="text-sm font-medium">{likesCount}</span>
                    </button>
                    <button
                        onClick={() => setShowComments(true)}
                        className="flex items-center gap-1 hover:text-blue-500 transition"
                    >
                        <MessageCircle size={22} className="text-gray-700" />
                        <span className="text-sm font-medium">{comments.length}</span>
                    </button>
                </div>
            </div>

            {/* Comment Modal */}
            <CommentModal
                isOpen={showComments}
                onClose={() => setShowComments(false)}
                post={{ ...post, comments }}
                onCommentsUpdate={(updatedComments) => {
                    setComments(updatedComments);
                    // Update parent component's post data
                    if (onUpdate) {
                        onUpdate({
                            ...post,
                            comments: updatedComments,
                        });
                    }
                }}
            />

            {/* Edit Modal */}
            {showEditModal && (
                <EditPostModal
                    post={post}
                    isOpen={showEditModal}
                    onClose={() => setShowEditModal(false)}
                    onUpdated={(updatedPost) => {
                        onUpdate?.(updatedPost);
                        setShowEditModal(false);
                    }}
                />
            )}
        </>
    );
};

export default PostCard;
