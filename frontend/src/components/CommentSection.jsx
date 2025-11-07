import { useState } from "react";
import { useAuth } from "../hooks/useAuth";
import { Send, Trash2, X } from "lucide-react";
import api from "../lib/api";

export default function CommentSection({ postId, comments, onCommentsUpdate }) {
    const { user } = useAuth();
    const [commentBody, setCommentBody] = useState("");
    const [loading, setLoading] = useState(false);
    const [deletingId, setDeletingId] = useState(null);

    const handleAddComment = async (e) => {
        e.preventDefault();
        if (!commentBody.trim() || loading) return;

        setLoading(true);
        try {
            const res = await api.post(`/posts/${postId}/comments`, {
                body: commentBody.trim(),
            });

            const newComment = res.data.comment?.data || res.data.comment;
            onCommentsUpdate([newComment, ...comments]);
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
            onCommentsUpdate(comments.filter((c) => c.id !== commentId));
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

    return (
        <div className="border-t border-gray-100 bg-gray-50">
            {/* Add Comment Form */}
            <form onSubmit={handleAddComment} className="p-3 border-b border-gray-200">
                <div className="flex gap-2">
                    <img
                        src={user?.avatar_url || "https://ui-avatars.com/api/?name=" + encodeURIComponent(user?.name || "User")}
                        alt={user?.name}
                        className="w-8 h-8 rounded-full object-cover flex-shrink-0"
                    />
                    <div className="flex-1 flex gap-2">
                        <input
                            type="text"
                            value={commentBody}
                            onChange={(e) => setCommentBody(e.target.value)}
                            placeholder="Add a comment..."
                            className="flex-1 px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent"
                            maxLength={1000}
                            disabled={loading}
                        />
                        <button
                            type="submit"
                            disabled={loading || !commentBody.trim()}
                            className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-1"
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

            {/* Comments List */}
            <div className="max-h-96 overflow-y-auto">
                {comments.length === 0 ? (
                    <div className="text-center py-8 text-gray-500 text-sm">
                        No comments yet. Be the first to comment!
                    </div>
                ) : (
                    <div className="divide-y divide-gray-200">
                        {comments.map((comment) => (
                            <div key={comment.id} className="p-3 hover:bg-gray-100 transition">
                                <div className="flex gap-3">
                                    <img
                                        src={
                                            comment.user?.avatar_url ||
                                            "https://ui-avatars.com/api/?name=" + encodeURIComponent(comment.user?.name || "User")
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
                                                <p className="text-xs text-gray-500 mt-1">{formatDate(comment.created_at)}</p>
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
        </div>
    );
}
