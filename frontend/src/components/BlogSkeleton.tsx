
export const BlogSkeleton = () => {
  return <div role="status" className="animate-pulse">

    <div className="border-b border-slate-200  p-4 w-screen max-w-screen-md cursor-pointer">
      <div className="flex">
        <div className="h-4 w-4 bg-gray-200 rounded-full mb-4"></div>
        <div className="h-2 bg-gray-200 rounded-full mb-2.5"></div>
        <div className="h-2 bg-gray-200 rounded-full mb-2.5"></div>
        <div className="flex justify-center flex-col text-xs ml-2">&#9679;</div>
        <div className="h-2 bg-gray-200 rounded-full mb-2.5"></div>
      </div>
      <div className="h-2 bg-gray-200 rounded-full max-w-[330px] mb-2.5"></div>
      <div className="h-2 bg-gray-200 rounded-full max-w-[330px] mb-2.5"></div>
      <div className="h-2 bg-gray-200 rounded-full max-w-[330px] mb-2.5"></div>
    </div>    
</div>
}