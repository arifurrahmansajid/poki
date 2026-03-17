import React from 'react';
import { FiCalendar, FiMoreVertical } from 'react-icons/fi';

const Schedule = ({ upcomingTasks }) => {
  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
       <h2 className="text-3xl font-black text-dark tracking-tight">Your Schedule</h2>
       <div className="bg-white rounded-[32px] border border-slate-200 p-5 sm:p-8">
          <div className="flex items-center gap-4 mb-8">
             <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center text-primary">
                <FiCalendar className="w-6 h-6" />
             </div>
             <div>
                <h3 className="text-xl font-bold text-dark">Upcoming Activities</h3>
                <p className="text-slate-500">Don't miss out on your tasks for this week</p>
             </div>
          </div>
          <div className="space-y-6">
             {upcomingTasks.map((task, i) => (
                <div key={i} className="flex flex-col sm:flex-row sm:items-center justify-between p-4 sm:p-6 rounded-[24px] border border-slate-100 hover:border-primary/20 hover:bg-slate-50 transition-all group">
                   <div className="flex items-start sm:items-center gap-6 w-full">
                      <div className="w-16 h-16 rounded-2xl shrink-0 flex flex-col items-center justify-center font-bold text-xs bg-slate-50 text-slate-500 group-hover:bg-primary/10 group-hover:text-primary transition-colors">
                         <span>MAR</span>
                         <span className="text-xl leading-none">{14 + i}</span>
                      </div>
                      <div className="flex-1 min-w-0">
                         <h4 className="font-bold text-dark text-lg mb-1 truncate">{task.title}</h4>
                         <div className="flex flex-col sm:flex-row sm:items-center gap-2">
                            <span className="text-sm text-slate-400 font-medium">{task.date}</span>
                            <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider whitespace-nowrap
                               ${task.priority === 'High' ? 'bg-red-50 text-red-500' : 'bg-slate-100 text-slate-500'}
                            `}>
                               {task.type} • {task.priority}
                            </span>
                         </div>
                      </div>
                   </div>
                   <button className="mt-4 sm:mt-0 sm:ml-4 p-3 rounded-xl bg-white border border-slate-100 text-slate-400 hover:text-primary hover:border-primary/20 transition-all">
                      <FiMoreVertical />
                   </button>
                </div>
             ))}
          </div>
       </div>
    </div>
  );
};

export default Schedule;
