/**
 * Renders a single announcement notice.
 * Designed with a formal campus 'Notice Board' aesthetic.
 */
function AnnouncementCard({ announcement }) {
  return (
    <div className="bg-white p-6 rounded-2xl border border-[#ead7c9] shadow-sm relative overflow-hidden hover:shadow-md transition-shadow">
      {/* Decorative vertical accent to signify a 'Notice' */}
      <div className="absolute top-0 left-0 w-1.5 h-full bg-black"></div>
      
      <div className="flex justify-between items-start mb-3">
        <h3 className="font-bold text-lg text-[#2d2d2d] leading-tight">
          {announcement.title}
        </h3>
        <span className="text-[10px] font-black bg-[#fff7ef] px-2 py-1 rounded border border-[#ead7c9] uppercase tracking-tighter">
          {new Date(announcement.createdAt).toLocaleDateString()}
        </span>
      </div>

      <p className="text-gray-600 text-sm leading-relaxed">
        {announcement.content}
      </p>
      
      <div className="mt-4 flex items-center gap-2">
        <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
        <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">
          Official Update
        </span>
      </div>
    </div>
  );
}

export default AnnouncementCard;