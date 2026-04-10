function PostCard({ post }) {
  // Automatically generates a unique, colorful avatar for every user
  const avatarUrl = `https://api.dicebear.com/7.x/avataaars/svg?seed=${post.user}`;

  return (
    <div className="bg-white p-5 rounded-2xl border border-[#ead7c9] shadow-sm hover:border-black transition-colors">
      <div className="flex items-center gap-3 mb-4">
        <img 
          src={avatarUrl} 
          alt="User avatar" 
          className="w-10 h-10 rounded-full bg-[#fdf4ec] border border-[#ead7c9]" 
        />
        <div>
          <h3 className="font-bold text-[#2d2d2d] leading-none">{post.user}</h3>
          <span className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">
            {post.time || "Just Now"}
          </span>
        </div>
      </div>

      <p className="text-gray-700 text-sm leading-relaxed">
        {post.text || post.content}
      </p>

      <div className="flex gap-6 mt-4 pt-4 border-t border-[#fcf3ed] text-gray-400 text-xs font-bold">
        <button className="hover:text-black transition-colors">👍 LIKE</button>
        <button className="hover:text-black transition-colors">💬 COMMENT</button>
      </div>
    </div>
  );
}

export default PostCard;