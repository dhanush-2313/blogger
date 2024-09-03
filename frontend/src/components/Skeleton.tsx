export const Skeleton = () => {
  return (
    <div className="border-b border-slate-200 p-4 w-screen max-w-screen-md cursor-pointer animate-pulse">
      <div className="flex">
        <div className="h-10 w-10 bg-slate-300 rounded-full"></div>
        <div className="font-extralight pl-2 text-sm flex justify-center flex-col w-24 bg-slate-300 h-4"></div>
        <div className="flex justify-center flex-col pl-2">
          <div className="h-1 w-1 rounded-full bg-slate-500"></div>
        </div>
        <div className="pl-2 font-thin text-slate-500 text-sm flex justify-center flex-col w-24 bg-slate-300 h-4"></div>
      </div>
      <div className="text-xl font-semibold pt-2 w-48 bg-slate-300 h-6"></div>
      <div className="text-md font-thin w-full bg-slate-300 h-4 mt-2"></div>
      <div className="text-md font-thin w-full bg-slate-300 h-4 mt-2"></div>
      <div className="text-slate-500 text-sm font-thin pt-4 w-24 bg-slate-300 h-4"></div>
    </div>
  );
};
