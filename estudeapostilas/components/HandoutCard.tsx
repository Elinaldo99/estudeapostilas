
import React from 'react';
import { Handout } from '../types';

interface HandoutCardProps {
  handout: Handout;
  onClick: (handout: Handout) => void;
}

const HandoutCard: React.FC<HandoutCardProps> = ({ handout, onClick }) => {
  return (
    <div
      className="group bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden hover:shadow-md transition-all duration-300 cursor-pointer flex flex-col"
      onClick={() => onClick(handout)}
    >
      <div className="relative aspect-[3/4] overflow-hidden">
        <img
          src={handout.thumbnail}
          alt={handout.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute top-2 right-2 bg-indigo-600 text-white text-xs font-bold px-2 py-1 rounded shadow-lg">
          {handout.category}
        </div>
      </div>
      <div className="p-4 flex flex-col flex-grow">
        <h3 className="font-bold text-slate-800 line-clamp-2 mb-2 group-hover:text-indigo-600 transition-colors">
          {handout.title}
        </h3>
        <p className="text-slate-500 text-xs mb-3 line-clamp-3 flex-grow">
          {handout.description}
        </p>
        <div className="flex items-center justify-between mt-auto pt-3 border-t border-slate-100">
          <span className="text-xs text-slate-400">
            {handout.pages} pág • {handout.year}
          </span>
          <div className="flex items-center text-amber-500">
            <svg className="w-3 h-3 fill-current" viewBox="0 0 20 20">
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
            <span className="text-xs font-bold ml-1">{handout.rating}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HandoutCard;
