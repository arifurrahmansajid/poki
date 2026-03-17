import React from 'react';
import { FiAward, FiMoreVertical } from 'react-icons/fi';

const MyCertificates = ({ certificates }) => {
  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <h2 className="text-3xl font-black text-dark tracking-tight">My Certificates</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {certificates.map((cert) => (
          <div key={cert.id} className="bg-white rounded-[32px] border border-slate-200 shadow-sm overflow-hidden group hover:shadow-xl transition-all duration-500">
            <div className="h-48 relative overflow-hidden bg-slate-900 flex items-center justify-center p-4">
              <img src={cert.img} alt={cert.title} className="max-w-full max-h-full object-contain opacity-60 group-hover:scale-110 group-hover:rotate-3 transition-transform duration-700" />
              <div className="absolute inset-0 flex items-center justify-center">
                 <FiAward className="w-16 h-16 text-primary drop-shadow-lg" />
              </div>
            </div>
            <div className="p-5 sm:p-8">
              <h3 className="text-xl font-bold text-dark mb-2">{cert.title}</h3>
              <div className="flex flex-col gap-1 mb-6 text-sm text-slate-500 font-medium">
                 <p>Issuer: {cert.issuer}</p>
                 <p>Issued on: {cert.date}</p>
              </div>
              <div className="flex gap-4">
                 <button className="flex-1 btn-primary py-3 rounded-2xl text-sm">Download PDF</button>
                 <button className="p-3 bg-slate-50 border border-slate-200 rounded-2xl text-slate-400 hover:text-primary hover:border-primary/20 transition-all">
                    <FiMoreVertical />
                 </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyCertificates;
