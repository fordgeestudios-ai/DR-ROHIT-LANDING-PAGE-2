import React, { useState } from 'react';
import {
  Play,
  Instagram,
  ExternalLink,
  ShieldCheck,
  Clock,
  Sparkles,
  X,
  Volume2,
  CheckCircle2,
  ArrowRight,
  Maximize2,
  Tv,
} from 'lucide-react';
import { ConsultationType } from '../types';

export interface ClinicalVideo {
  id: string;
  title: string;
  condition: string;
  duration: string;
  views: string;
  handle: string;
  channel: string;
  youtubeId?: string;
  instagramUrl: string;
  keyTakeaway: string;
  doctorQuote: string;
  badge: string;
  tags: string[];
}

const CLINICAL_VIDEOS: ClinicalVideo[] = [
  {
    id: 'video-varicose-cure',
    title: 'Permanent Cure for Varicose Veins Without Surgery',
    condition: 'Varicose Veins (EVLA)',
    duration: '3:45 min',
    views: '48.2K views',
    handle: '@drrohitm',
    channel: "PinHole Clinic · Dr. Rohit Madhurkar",
    youtubeId: '3XEuBj-aiBk',
    instagramUrl: 'https://www.instagram.com/drrohitm/',
    keyTakeaway: 'No surgical vein stripping. A microscopic 2mm laser fiber closes faulty valves under local numbing. Patients walk out in 45 minutes.',
    doctorQuote: '“Varicose veins are caused by faulty valves in the leg veins. With Endovenous Laser Ablation, we seal the leaking vein safely from inside. Zero surgical stitches.”',
    badge: 'Most Watched',
    tags: ['Varicose Veins', 'Laser EVLA', 'Daycare'],
  },
  {
    id: 'video-fibroids-no-surgery',
    title: 'Save Your Uterus: Uterine Fibroid Embolization (UFE)',
    condition: 'Uterine Fibroids',
    duration: '4:12 min',
    views: '62.4K views',
    handle: '@drrohitm',
    channel: "Dr. Rohit Madhurkar · Interventional Radiology",
    youtubeId: 'eVnq_j64z7A',
    instagramUrl: 'https://www.instagram.com/drrohitm/',
    keyTakeaway: 'Starves and shrinks fibroids by blocking their blood vessels through a wrist or groin pinhole. Preserves your entire uterus and hormonal balance.',
    doctorQuote: '“You don’t have to remove your uterus. UFE targets only the fibroid blood supply through a pinhole. The fibroids shrink naturally, stopping heavy bleeding.”',
    badge: 'Uterus Preservation',
    tags: ['Fibroids', 'UFE', 'Preserve Uterus'],
  },
  {
    id: 'video-varicose-options',
    title: 'How to Choose the Best Varicose Veins Treatment (Laser vs Glue)',
    condition: 'Varicose Veins & Venous Reflux',
    duration: '3:18 min',
    views: '35.1K views',
    handle: '@pinhole.ir',
    channel: "PinHole Clinic Bengaluru",
    youtubeId: 'AHcUIWttQZU',
    instagramUrl: 'https://www.instagram.com/pinhole.ir/',
    keyTakeaway: 'Comparison between modern Endovenous Laser (EVLA), Radiofrequency (RFA), and Medical Bio-Glue (VenaSeal) based on your Doppler ultrasound scan.',
    doctorQuote: '“Every leg is different. Based on the ultrasound Doppler mapping, we select whether 1470nm radial laser or medical glue will give you the most permanent outcome.”',
    badge: 'Treatment Guide',
    tags: ['Laser vs Glue', 'Ultrasound Doppler'],
  },
  {
    id: 'video-fibroadenoma-cryo',
    title: 'Breast Fibroadenoma Cryoablation Without Open Surgery',
    condition: 'Breast Fibroadenoma',
    duration: '3:30 min',
    views: '29.7K views',
    handle: '@drrohitm',
    channel: "Dr. Rohit Madhurkar · Clinical Mastery",
    youtubeId: 'vUgSkvZ6muM',
    instagramUrl: 'https://www.instagram.com/drrohitm/',
    keyTakeaway: 'Freezes benign breast lumps from within using extreme sub-zero pinhole probes. Leaves zero cosmetic scars or breast tissue deformation.',
    doctorQuote: '“For young women with benign breast lumps, open surgery leaves permanent visible scars. Cryoablation freezes and destroys the lump through a tiny needle puncture.”',
    badge: 'Scar-Free',
    tags: ['Cryoablation', 'Benign Lumps', 'Zero Scars'],
  },
  {
    id: 'video-prostate-pae',
    title: 'Prostate Artery Embolization (PAE): No Surgery, No Catheter',
    condition: 'Enlarged Prostate / BPH',
    duration: '3:50 min',
    views: '41.8K views',
    handle: '@pinhole.ir',
    channel: "PinHole Clinic Bangalore",
    youtubeId: 'e7xBpbcsDAY',
    instagramUrl: 'https://www.instagram.com/pinhole.ir/',
    keyTakeaway: 'Microscopic particles block the prostate’s excess blood supply. Relieves nighttime urination and weak stream without urinary catheterization.',
    doctorQuote: '“Senior men suffering from frequent nighttime urination can now avoid invasive TURP surgery. PAE is completely outpatient with zero sexual side effects.”',
    badge: 'Senior Care',
    tags: ['Prostate', 'PAE', 'No Catheter'],
  },
  {
    id: 'video-doppler-scan',
    title: 'Does Every Doppler Scan Mean You Need Treatment? Doctor Explains',
    condition: 'Diagnostic Mastery',
    duration: '2:55 min',
    views: '33.9K views',
    handle: '@drrohitm',
    channel: "The Pinhole Clinic",
    youtubeId: '8kli3dwaekk',
    instagramUrl: 'https://www.instagram.com/drrohitm/',
    keyTakeaway: 'Clear distinction between cosmetic spider veins and deep venous reflux. Dr. Rohit reviews scans personally to prevent unnecessary procedures.',
    doctorQuote: '“Not every scan abnormality requires treatment. We treat the patient’s symptoms and underlying pathology, not just paper reports.”',
    badge: 'Ethical Care',
    tags: ['Diagnostic', 'Second Opinion'],
  },
];

interface InstagramVideosSectionProps {
  onBookConsultation: (type?: ConsultationType) => void;
}

export const InstagramVideosSection: React.FC<InstagramVideosSectionProps> = ({
  onBookConsultation,
}) => {
  const [activeVideo, setActiveVideo] = useState<ClinicalVideo | null>(CLINICAL_VIDEOS[0]);
  const [modalVideo, setModalVideo] = useState<ClinicalVideo | null>(null);
  const [filterTag, setFilterTag] = useState<string>('All');

  const filterTags = ['All', 'Varicose Veins', 'Fibroids', 'Prostate', 'Diagnostic'];

  const filteredVideos = filterTag === 'All'
    ? CLINICAL_VIDEOS
    : CLINICAL_VIDEOS.filter((v) =>
        v.tags.some((t) => t.toLowerCase().includes(filterTag.toLowerCase())) ||
        v.condition.toLowerCase().includes(filterTag.toLowerCase())
      );

  return (
    <section id="instagram-videos" className="py-16 sm:py-24 bg-slate-900 border-b border-slate-800 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-pink-500/10 border border-pink-500/20 text-xs font-bold text-pink-400 tracking-wider uppercase mb-3">
            <Instagram className="w-4 h-4 text-pink-400" />
            <span>Official Clinical Videos & Instagram Reels</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white text-balance">
            Watch Dr. Rohit Madhurkar Explain Pinhole Treatments
          </h2>
          <p className="mt-3 text-sm sm:text-base text-slate-300 leading-relaxed">
            Real video walkthroughs from Dr. Rohit’s official channels (<span className="text-pink-400 font-medium">@drrohitm</span> and <span className="text-sky-400 font-medium">@pinhole.ir</span>). Watch how minimally invasive pinhole procedures cure conditions without incisions or prolonged hospital stays.
          </p>

          {/* Filter Pills */}
          <div className="mt-6 flex flex-wrap items-center justify-center gap-2">
            {filterTags.map((tag) => (
              <button
                key={tag}
                onClick={() => setFilterTag(tag)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                  filterTag === tag
                    ? 'bg-blue-600 text-white shadow-sm'
                    : 'bg-slate-800 text-slate-300 hover:bg-slate-700 hover:text-white border border-slate-700/60'
                }`}
              >
                {tag}
              </button>
            ))}
          </div>
        </div>

        {/* Featured Main In-Page Player ("seen from here only") */}
        {activeVideo && (
          <div className="mt-10 bg-slate-950 rounded-3xl border border-slate-800 overflow-hidden shadow-2xl">
            <div className="grid grid-cols-1 lg:grid-cols-12">
              {/* Left 7 cols: The Video Player iframe */}
              <div className="lg:col-span-7 bg-black relative flex items-center justify-center aspect-video lg:aspect-auto">
                {activeVideo.youtubeId ? (
                  <iframe
                    src={`https://www.youtube-nocookie.com/embed/${activeVideo.youtubeId}?rel=0&modestbranding=1`}
                    title={activeVideo.title}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowFullScreen
                    className="w-full h-full min-h-[320px] sm:min-h-[420px] border-0"
                  />
                ) : (
                  <div className="p-8 text-center space-y-3">
                    <Play className="w-12 h-12 text-sky-400 mx-auto" />
                    <p className="text-xs text-slate-400">Loading Clinical Video Stream...</p>
                  </div>
                )}
              </div>

              {/* Right 5 cols: Video Clinical Takeaways, Quote & Booking CTA */}
              <div className="lg:col-span-5 p-6 sm:p-8 flex flex-col justify-between bg-gradient-to-b from-slate-900 to-slate-950 border-t lg:border-t-0 lg:border-l border-slate-800 space-y-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-[11px] font-bold uppercase tracking-wider text-sky-400 bg-sky-950/80 border border-sky-800/60 px-2.5 py-1 rounded-md">
                      {activeVideo.condition}
                    </span>
                    <span className="text-xs text-slate-400 font-mono">
                      {activeVideo.views} · {activeVideo.duration}
                    </span>
                  </div>

                  <h3 className="text-xl font-bold text-white leading-snug">
                    {activeVideo.title}
                  </h3>

                  <div className="p-4 rounded-2xl bg-white/5 border border-white/10 space-y-2">
                    <span className="text-[11px] font-bold uppercase tracking-wider text-sky-300 block">
                      Direct Quote by Dr. Rohit:
                    </span>
                    <p className="text-xs text-slate-200 italic leading-relaxed">
                      {activeVideo.doctorQuote}
                    </p>
                  </div>

                  <div className="space-y-2 text-xs text-slate-300">
                    <div className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-sky-400 shrink-0 mt-0.5" />
                      <span>{activeVideo.keyTakeaway}</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-sky-400 shrink-0 mt-0.5" />
                      <span>Walk home on the same day · Zero stitches or open incisions</span>
                    </div>
                  </div>
                </div>

                <div className="pt-4 border-t border-slate-800 space-y-3">
                  <button
                    onClick={() => onBookConsultation('video')}
                    className="w-full py-3 px-4 bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs sm:text-sm rounded-xl transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer group"
                  >
                    <span>Book Video Consult for this Condition</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </button>

                  <div className="flex items-center justify-between text-xs text-slate-400 px-1">
                    <span className="text-[11px] text-emerald-400 font-medium flex items-center gap-1">
                      <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                      <span>100% refund before 4 hours</span>
                    </span>

                    <a
                      href={activeVideo.instagramUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-pink-400 hover:text-pink-300 font-medium flex items-center gap-1 transition-colors"
                    >
                      <Instagram className="w-3.5 h-3.5" />
                      <span>{activeVideo.handle}</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Video Playlist Grid - Click to Watch Instantly in Player */}
        <div className="mt-12">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-bold text-white">
              Select Any Video to Watch Below
            </h3>
            <span className="text-xs text-slate-400">
              {filteredVideos.length} Clinical Videos Available
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {filteredVideos.map((video) => {
              const isSelected = activeVideo?.id === video.id;
              return (
                <div
                  key={video.id}
                  onClick={() => {
                    setActiveVideo(video);
                    // Smooth scroll back to player if viewing on mobile
                    const playerEl = document.getElementById('instagram-videos');
                    if (playerEl) {
                      playerEl.scrollIntoView({ behavior: 'smooth' });
                    }
                  }}
                  className={`group rounded-2xl overflow-hidden border p-4 transition-all cursor-pointer flex flex-col justify-between ${
                    isSelected
                      ? 'bg-blue-950/80 border-blue-500 shadow-lg ring-2 ring-blue-500/40'
                      : 'bg-slate-950 border-slate-800 hover:border-slate-700 hover:bg-slate-900/90'
                  }`}
                >
                  <div className="space-y-3">
                    {/* Thumbnail / Header */}
                    <div className="relative aspect-video rounded-xl bg-slate-900 overflow-hidden border border-slate-800 flex items-center justify-center group-hover:border-sky-500/40 transition-colors">
                      {video.youtubeId ? (
                        <img
                          src={`https://img.youtube.com/vi/${video.youtubeId}/mqdefault.jpg`}
                          alt={video.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                      ) : null}
                      <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors" />

                      {/* Play Button Overlay */}
                      <div className="absolute w-11 h-11 rounded-full bg-blue-600/90 text-white flex items-center justify-center shadow-lg group-hover:scale-110 group-hover:bg-blue-500 transition-all">
                        <Play className="w-5 h-5 fill-current translate-x-0.5" />
                      </div>

                      {/* Duration badge */}
                      <span className="absolute bottom-2 right-2 bg-black/80 text-[10px] font-mono text-white px-2 py-0.5 rounded backdrop-blur-xs">
                        {video.duration}
                      </span>

                      {/* Condition badge */}
                      <span className="absolute top-2 left-2 bg-slate-950/90 border border-white/10 text-[10px] font-semibold text-sky-300 px-2 py-0.5 rounded backdrop-blur-xs">
                        {video.badge}
                      </span>
                    </div>

                    <div>
                      <div className="flex items-center gap-1.5 text-[11px] text-pink-400 font-semibold mb-1">
                        <Instagram className="w-3 h-3" />
                        <span>{video.handle}</span>
                        <span className="text-slate-500">·</span>
                        <span className="text-slate-400 font-mono">{video.views}</span>
                      </div>
                      <h4 className="text-sm font-bold text-white group-hover:text-sky-300 transition-colors line-clamp-2">
                        {video.title}
                      </h4>
                      <p className="mt-1 text-xs text-slate-400 line-clamp-2 leading-relaxed">
                        {video.keyTakeaway}
                      </p>
                    </div>
                  </div>

                  <div className="mt-4 pt-3 border-t border-slate-800/80 flex items-center justify-between text-xs">
                    <span className="font-semibold text-sky-400 group-hover:underline flex items-center gap-1">
                      <span>{isSelected ? 'Currently Playing' : 'Click to Watch'}</span>
                      <Play className="w-3 h-3 fill-current" />
                    </span>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setModalVideo(video);
                      }}
                      className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
                      title="Open in Fullscreen Theater"
                    >
                      <Maximize2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Official Channels Connect Banner */}
        <div className="mt-12 p-6 rounded-2xl bg-gradient-to-r from-blue-950 via-slate-900 to-blue-950 border border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-4 text-center sm:text-left">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-pink-500 via-rose-500 to-purple-600 flex items-center justify-center text-white shrink-0 shadow-lg">
              <Instagram className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-base font-bold text-white">
                Follow Dr. Rohit Madhurkar on Instagram
              </h4>
              <p className="text-xs text-slate-300 mt-0.5">
                Daily clinical case explanations, live Doppler demos, and pinhole surgery education.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <a
              href="https://www.instagram.com/drrohitm/"
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2.5 bg-gradient-to-r from-purple-600 via-pink-600 to-amber-600 hover:opacity-90 text-white text-xs font-bold rounded-xl transition-all shadow-sm flex items-center gap-1.5"
            >
              <Instagram className="w-4 h-4" />
              <span>@drrohitm on Instagram</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>

            <button
              onClick={() => onBookConsultation('video')}
              className="px-4 py-2.5 bg-white hover:bg-slate-100 text-slate-950 text-xs font-bold rounded-xl transition-all shadow-sm cursor-pointer"
            >
              Book Consult
            </button>
          </div>
        </div>
      </div>

      {/* Fullscreen Video Modal if expanded */}
      {modalVideo && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/90 backdrop-blur-md flex items-center justify-center p-4 animate-in fade-in duration-150">
          <div className="bg-slate-900 rounded-3xl border border-slate-800 max-w-3xl w-full overflow-hidden text-white shadow-2xl relative">
            <div className="p-4 bg-slate-950 flex items-center justify-between border-b border-slate-800">
              <div className="flex items-center gap-2">
                <Instagram className="w-4 h-4 text-pink-400" />
                <span className="font-bold text-xs text-white">{modalVideo.title}</span>
              </div>
              <button
                onClick={() => setModalVideo(null)}
                className="text-slate-400 hover:text-white p-1 rounded-lg transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="aspect-video bg-black">
              {modalVideo.youtubeId ? (
                <iframe
                  src={`https://www.youtube-nocookie.com/embed/${modalVideo.youtubeId}?autoplay=1&rel=0`}
                  title={modalVideo.title}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="w-full h-full border-0"
                />
              ) : null}
            </div>

            <div className="p-5 bg-slate-950 space-y-3">
              <div className="flex items-center justify-between text-xs">
                <span className="text-sky-400 font-semibold">{modalVideo.condition}</span>
                <span className="text-slate-400">{modalVideo.views} · {modalVideo.duration}</span>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                {modalVideo.doctorQuote}
              </p>
              <div className="pt-2 flex items-center justify-between gap-3">
                <span className="text-[11px] text-emerald-400 font-medium">
                  100% full refund before 4 hours of appointment
                </span>
                <button
                  onClick={() => {
                    setModalVideo(null);
                    onBookConsultation('video');
                  }}
                  className="px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs rounded-xl transition-all cursor-pointer"
                >
                  Book Consult with Dr. Rohit
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
