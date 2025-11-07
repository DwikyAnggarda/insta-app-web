import { useState, useEffect } from "react";
import { X, Upload, Image as ImageIcon } from "lucide-react";
import api from "../lib/api";

export default function EditPostModal({ post, isOpen, onClose, onUpdated }) {
    const [imagePreview, setImagePreview] = useState(post.image_url || null);
    const [body, setBody] = useState(post.body || "");
    const [file, setFile] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [removeImage, setRemoveImage] = useState(false);

    useEffect(() => {
        if (isOpen) {
            setImagePreview(post.image_url || null);
            setBody(post.body || "");
            setFile(null);
            setRemoveImage(false);
            setError("");
        }
    }, [isOpen, post]);

    const handleImageChange = (e) => {
        const f = e.target.files[0];
        if (f) {
            // Validate file size (5MB max)
            if (f.size > 5 * 1024 * 1024) {
                setError("Image size must be less than 5MB");
                return;
            }

            // Validate file type
            const validTypes = ["image/jpeg", "image/jpg", "image/png", "image/webp"];
            if (!validTypes.includes(f.type)) {
                setError("Only JPG, PNG, and WebP images are allowed");
                return;
            }

            setError("");
            setImagePreview(URL.createObjectURL(f));
            setFile(f);
            setRemoveImage(false);
        }
    };

    const handleRemoveImage = () => {
        setImagePreview(null);
        setFile(null);
        setRemoveImage(true);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Validation: at least image or text
        if (!imagePreview && !body.trim()) {
            setError("Post must have an image or text");
            return;
        }

        // Validate body length
        if (body.length > 2000) {
            setError("Caption must be less than 2000 characters");
            return;
        }

        const formData = new FormData();
        if (file) {
            formData.append("image", file);
        }
        if (body.trim()) {
            formData.append("body", body.trim());
        }
        // Note: Laravel doesn't support file deletion via PUT, so we handle it differently
        // For simplicity, if user removes image and doesn't add new one, we just update text

        setLoading(true);
        setError("");

        try {
            // Laravel with _method=PUT for multipart
            formData.append("_method", "PUT");
            
            const res = await api.post(`/posts/${post.id}`, formData, {
                headers: { "Content-Type": "multipart/form-data" },
            });

            const updatedPost = res.data.post?.data || res.data.post;
            onUpdated(updatedPost);
        } catch (err) {
            console.error("Error updating post:", err);
            setError(err.response?.data?.message || "Failed to update post. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    const handleClose = () => {
        if (!loading) {
            onClose();
        }
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4">
            <div className="bg-white w-full max-w-md rounded-xl overflow-hidden shadow-lg">
                <div className="flex justify-between items-center border-b px-4 py-3">
                    <h2 className="font-semibold text-lg">Edit Post</h2>
                    <button
                        onClick={handleClose}
                        disabled={loading}
                        className="text-gray-500 hover:text-gray-700 transition disabled:opacity-50"
                    >
                        <X size={24} />
                    </button>
                </div>

                <form onSubmit={handleSubmit} className="p-4 space-y-4">
                    {/* Image Upload */}
                    <div className="flex flex-col items-center">
                        {imagePreview ? (
                            <div className="relative w-full">
                                <img
                                    src={imagePreview}
                                    alt="preview"
                                    className="w-full aspect-square object-cover rounded-lg"
                                />
                                <button
                                    type="button"
                                    onClick={handleRemoveImage}
                                    className="absolute top-2 right-2 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transition"
                                >
                                    <X size={20} />
                                </button>
                            </div>
                        ) : (
                            <label className="w-full border-2 border-dashed border-gray-300 rounded-lg flex flex-col items-center justify-center h-48 cursor-pointer hover:border-blue-400 transition">
                                <ImageIcon size={48} className="text-gray-400 mb-2" />
                                <span className="text-sm text-gray-500">Click to upload image</span>
                                <span className="text-xs text-gray-400 mt-1">JPG, PNG, WebP • Max 5MB</span>
                                <input
                                    type="file"
                                    accept="image/jpeg,image/jpg,image/png,image/webp"
                                    onChange={handleImageChange}
                                    className="hidden"
                                />
                            </label>
                        )}
                    </div>

                    {/* Caption */}
                    <div>
                        <textarea
                            placeholder="Write a caption..."
                            value={body}
                            onChange={(e) => setBody(e.target.value)}
                            className="w-full border border-gray-300 rounded-lg p-3 text-sm resize-none focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent"
                            rows="4"
                            maxLength={2000}
                        ></textarea>
                        <div className="text-xs text-gray-500 text-right mt-1">{body.length}/2000</div>
                    </div>

                    {/* Error Message */}
                    {error && (
                        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-2 rounded-lg text-sm">
                            {error}
                        </div>
                    )}

                    {/* Submit Button */}
                    <button
                        type="submit"
                        disabled={loading || (!imagePreview && !body.trim())}
                        className="w-full bg-blue-500 text-white py-3 rounded-lg font-medium hover:bg-blue-600 transition disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                    >
                        {loading ? (
                            <>
                                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                                Updating...
                            </>
                        ) : (
                            <>
                                <Upload size={20} />
                                Update Post
                            </>
                        )}
                    </button>
                </form>
            </div>
        </div>
    );
}
