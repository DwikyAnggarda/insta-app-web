export default function Feed() {
    const posts = [
        { id: 1, user: "dwiky", img: "https://images.unsplash.com/photo-1622532832487-b18b9c7f23d3?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=464", caption: "Belajar backend 💻" },
        { id: 2, user: "angga", img: "https://plus.unsplash.com/premium_photo-1683580362892-fc31c2ff935b?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=774", caption: "Coding terus!" },
    ];

    return (
        <main className="pt-16 pb-20 bg-gray-50 min-h-screen">
            {posts.map((p) => (
                <div key={p.id} className="bg-white mb-4">
                    <div className="px-3 py-2 font-medium">{p.user}</div>
                    <img src={p.img} alt={p.caption} className="w-full aspect-square object-cover" />
                    <div className="p-3 text-sm text-gray-800">{p.caption}</div>
                </div>
            ))}
        </main>
    );
}
  