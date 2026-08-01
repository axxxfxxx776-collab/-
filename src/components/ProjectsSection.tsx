import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Project } from '../types';
import { Building2, Calendar, MapPin, CheckCircle2, Clock, Eye, ChevronLeft } from 'lucide-react';

export const ProjectsSection: React.FC = () => {
  const { projects, language, t, openProjectDetail } = useApp();
  const [filterTab, setFilterTab] = useState<'all' | 'current' | 'upcoming' | 'completed'>('all');

  const filteredProjects = projects.filter(p => {
    if (filterTab === 'all') return true;
    return p.status === filterTab;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 text-white space-y-8">
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-neutral-800 pb-6">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/20 text-amber-400 text-xs font-bold mb-3 border border-amber-500/30">
            <Building2 className="w-4 h-4" />
            <span>مشاريع ماجا للتطوير والاستثمار</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
            المشاريع العقارية الكبرى
          </h2>
        </div>

        {/* Status Filter Tabs */}
        <div className="flex items-center gap-2 bg-neutral-900 p-1.5 rounded-2xl border border-neutral-800 overflow-x-auto">
          {[
            { id: 'all', label: t.allProjects },
            { id: 'current', label: t.currentProjects },
            { id: 'upcoming', label: t.upcomingProjects },
            { id: 'completed', label: t.completedProjects },
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setFilterTab(tab.id as any)}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all whitespace-nowrap ${
                filterTab === tab.id
                  ? 'bg-amber-500 text-black shadow-md'
                  : 'text-neutral-400 hover:text-white'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Projects Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {filteredProjects.map((project) => (
          <div
            key={project.id}
            onClick={() => openProjectDetail(project)}
            className="group bg-neutral-900 border border-neutral-800 hover:border-amber-500/50 rounded-3xl overflow-hidden shadow-xl hover:shadow-2xl hover:shadow-amber-500/10 transition-all duration-300 flex flex-col cursor-pointer"
          >
            {/* Project Hero Image */}
            <div className="relative aspect-[16/9] overflow-hidden bg-black">
              <img
                src={project.heroImage}
                alt={project.nameAr}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-neutral-950/40 to-transparent" />

              {/* Status Badge */}
              <div className="absolute top-4 right-4 z-10">
                <span className={`px-3 py-1.5 rounded-full text-xs font-extrabold shadow-lg ${
                  project.status === 'current' ? 'bg-amber-500 text-black' :
                  project.status === 'upcoming' ? 'bg-purple-600 text-white' : 'bg-emerald-600 text-white'
                }`}>
                  {project.statusLabelAr}
                </span>
              </div>

              {/* Progress Bar Badge on Image */}
              {project.status === 'current' && (
                <div className="absolute bottom-4 inset-x-4 bg-black/80 backdrop-blur-md p-3 rounded-2xl border border-neutral-800">
                  <div className="flex justify-between text-xs font-bold text-white mb-1.5">
                    <span>{t.progressPercentage}</span>
                    <span className="text-amber-400">{project.progressPercent}%</span>
                  </div>
                  <div className="w-full h-2 bg-neutral-800 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-gradient-to-r from-amber-500 to-yellow-400 rounded-full"
                      style={{ width: `${project.progressPercent}%` }}
                    />
                  </div>
                </div>
              )}
            </div>

            {/* Project Details Body */}
            <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
              <div>
                <div className="flex items-center gap-1.5 text-amber-400 text-xs font-bold mb-2">
                  <MapPin className="w-3.5 h-3.5" />
                  <span>{project.location.city} - {project.location.district}</span>
                </div>

                <h3 className="text-2xl font-black text-white group-hover:text-amber-400 transition-colors mb-2">
                  {language === 'ar' ? project.nameAr : project.nameEn}
                </h3>

                <p className="text-amber-400/90 text-xs font-semibold mb-3">
                  {language === 'ar' ? project.taglineAr : project.taglineEn}
                </p>

                <p className="text-neutral-400 text-xs line-clamp-2 leading-relaxed">
                  {language === 'ar' ? project.descriptionAr : project.descriptionEn}
                </p>
              </div>

              {/* Specs & Pricing */}
              <div className="pt-4 border-t border-neutral-800 flex items-center justify-between">
                <div>
                  <span className="text-[11px] text-neutral-400 font-bold block">{t.startingFrom}</span>
                  <span className="text-xl font-black text-amber-400">
                    {project.startingPriceSAR.toLocaleString()} ر.س
                  </span>
                </div>

                <button className="bg-neutral-800 hover:bg-neutral-700 text-white font-bold px-4 py-2.5 rounded-xl text-xs flex items-center gap-1.5 transition-all">
                  <span>استكشف المشروع</span>
                  <ChevronLeft className="w-4 h-4 text-amber-400" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
