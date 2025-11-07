import { useState } from "react";
import { useAuth } from "../hooks/useAuth";
import { X, Send, Trash2, MessageCircle } from "lucide-react";
import api from "../lib/api";

export default function CommentModal({ isOpen, onClose, post, onCommentsUpdate }) {
    const { user } = useAuth();
    const [commentBody, setCommentBody] = useState("");
    const [loading, setLoading] = useState(false);
    const [deletingId, setDeletingId] = useState(null);
    const [localComments, setLocalComments] = useState(post.comments || []);

    const handleAddComment = async (e) => {
        e.preventDefault();
        if (!commentBody.trim() || loading) return;

        setLoading(true);
        try {
            const res = await api.post(`/posts/${post.id}/comments`, {
                body: commentBody.trim(),
            });

            const newComment = res.data.comment?.data || res.data.comment;
            const updatedComments = [newComment, ...localComments];
            setLocalComments(updatedComments);
            onCommentsUpdate?.(updatedComments);
            setCommentBody("");
        } catch (err) {
            console.error("Error adding comment:", err);
            alert(err.response?.data?.message || "Failed to add comment");
        } finally {
            setLoading(false);
        }
    };

    const handleDeleteComment = async (commentId) => {
        if (!confirm("Delete this comment?")) return;

        setDeletingId(commentId);
        try {
            await api.delete(`/comments/${commentId}`);
            const updatedComments = localComments.filter((c) => c.id !== commentId);
            setLocalComments(updatedComments);
            onCommentsUpdate?.(updatedComments);
        } catch (err) {
            console.error("Error deleting comment:", err);
            alert(err.response?.data?.message || "Failed to delete comment");
        } finally {
            setDeletingId(null);
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

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black/60 flex items-end sm:items-center justify-center z-50">
            <div className="bg-white w-full sm:max-w-lg sm:rounded-2xl rounded-t-2xl max-h-[90vh] flex flex-col animate-slide-up">
                {/* Header */}
                <div className="flex items-center justify-between p-4 border-b border-gray-200 bg-white sticky top-0 rounded-t-2xl">
                    <h2 className="font-semibold text-lg">Comments</h2>
                    <button
                        onClick={onClose}
                        className="p-2 hover:bg-gray-100 rounded-full transition"
                    >
                        <X size={24} />
                    </button>
                </div>

                {/* Post Preview */}
                <div className="flex items-center gap-3 p-4 border-b border-gray-100 bg-gray-50">
                    <img
                        src={
                            post.user?.avatar_url ||
                            "https://ui-avatars.com/api/?name=" + encodeURIComponent(post.user?.name || "User")
                        }
                        alt={post.user?.name}
                        className="w-10 h-10 rounded-full object-cover"
                    />
                    <div className="flex-1 min-w-0">
                        <p className="font-semibold text-sm">{post.user?.name}</p>
                        {post.body && (
                            <p className="text-sm text-gray-600 truncate">{post.body}</p>
                        )}
                    </div>
                    {post.image_url && (
                        <img
                            src={post.image_url}
                            alt="Post"
                            className="w-12 h-12 rounded object-cover"
                        />
                    )}
                </div>

                {/* Comments List */}
                <div className="flex-1 overflow-y-auto">
                    {localComments.length === 0 ? (
                        <div className="text-center py-16 text-gray-500">
                            <MessageCircle size={48} className="mx-auto mb-3 text-gray-300" />
                            <p className="text-sm">No comments yet.</p>
                            <p className="text-xs text-gray-400 mt-1">Be the first to comment!</p>
                        </div>
                    ) : (
                        <div className="divide-y divide-gray-100">
                            {localComments.map((comment) => (
                                <div key={comment.id} className="p-4 hover:bg-gray-50 transition">
                                    <div className="flex gap-3">
                                        <img
                                            src={
                                                comment.user?.avatar_url ||
                                                "https://ui-avatars.com/api/?name=" +
                                                    encodeURIComponent(comment.user?.name || "User")
                                            }
                                            alt={comment.user?.name}
                                            className="w-8 h-8 rounded-full object-cover flex-shrink-0"
                                        />
                                        <div className="flex-1 min-w-0">
                                            <div className="flex items-start justify-between gap-2">
                                                <div className="flex-1">
                                                    <p className="font-semibold text-sm">{comment.user?.name}</p>
                                                    <p className="text-sm text-gray-800 mt-1 whitespace-pre-wrap break-words">
                                                        {comment.body}
                                                    </p>
                                                    <p className="text-xs text-gray-500 mt-1">
                                                        {formatDate(comment.created_at)}
                                                    </p>
                                                </div>
                                                {user && comment.user?.id === user.id && (
                                                    <button
                                                        onClick={() => handleDeleteComment(comment.id)}
                                                        disabled={deletingId === comment.id}
                                                        className="text-red-500 hover:text-red-700 p-1 disabled:opacity-50"
                                                        title="Delete comment"
                                                    >
                                                        {deletingId === comment.id ? (
                                                            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-red-500"></div>
                                                        ) : (
                                                            <Trash2 size={16} />
                                                        )}
                                                    </button>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                {/* Add Comment Form */}
                <form
                    onSubmit={handleAddComment}
                    className="p-4 border-t border-gray-200 bg-white sticky bottom-0"
                >
                    <div className="flex gap-2">
                        <img
                            src={
                                user?.avatar_url ||
                                "https://ui-avatars.com/api/?name=" + encodeURIComponent(user?.name || "User")
                            }
                            alt={user?.name}
                            className="w-8 h-8 rounded-full object-cover flex-shrink-0"
                        />
                        <div className="flex-1 flex gap-2">
                            <input
                                type="text"
                                value={commentBody}
                                onChange={(e) => setCommentBody(e.target.value)}
                                placeholder="Add a comment..."
                                className="flex-1 px-4 py-2 border border-gray-300 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent"
                                maxLength={1000}
                                disabled={loading}
                            />
                            <button
                                type="submit"
                                disabled={loading || !commentBody.trim()}
                                className="px-4 py-2 bg-blue-500 text-white rounded-full hover:bg-blue-600 transition disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-1"
                            >
                                {loading ? (
                                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                                ) : (
                                    <Send size={16} />
                                )}
                            </button>
                        </div>
                    </div>
                </form>
            </div>

            <style>{`
                @keyframes slide-up {
                    from {
                        transform: translateY(100%);
                    }
                    to {
                        transform: translateY(0);
                    }
                }

                .animate-slide-up {
                    animation: slide-up 0.3s ease-out;
                }
            `}</style>
        </div>
    );
}
