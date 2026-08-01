import { seasons } from '../data/seasondata';
const teamInfo = {
  "McLaren": { color: "#FF8700", logo: "https://media.formula1.com/content/dam/fom-website/teams/2024/mclaren-logo.png" },
  "Red Bull": { color: "#3671C6", logo: "https://media.formula1.com/content/dam/fom-website/teams/2024/red-bull-racing-logo.png" },
  "Mercedes": { color: "#27F4D2", logo: "https://media.formula1.com/content/dam/fom-website/teams/2024/mercedes-logo.png" },
  "Ferrari": { color: "#E8002D", logo: "https://media.formula1.com/content/dam/fom-website/teams/2024/ferrari-logo.png" },
  "Renault": { color: "#FFD500", logo: "https://upload.wikimedia.org/wikipedia/en/thumb/1/1a/Renault_F1_Team_logo_2016.svg/1200px-Renault_F1_Team_logo_2016.svg.png" },
  "Brawn": { color: "#B8FD00", logo: "https://upload.wikimedia.org/wikipedia/commons/8/87/Brawn_GP_logo.svg" }
};

const Seasons = () => {
 
  return (
    <div className='min-h-screen bg-[#0a0a0f] px-0 py-6 text-white sm:px-0 sm:py-8'>
      <div className='mx-auto max-w-5xl px-4 sm:px-6'>
        <div className='mb-8 flex items-center gap-3'>
          <div className='h-8 w-2 rounded-full bg-[#e10600]'></div>
          <h1 className='text-3xl font-black uppercase tracking-wider text-white'>Season Winners</h1>
        </div>

        <div className='overflow-hidden rounded-2xl border border-zinc-800/50 bg-black/40 backdrop-blur-md shadow-2xl shadow-[#e10600]/5'>
          <div className='grid grid-cols-1 gap-4 bg-zinc-900/80 px-6 py-5 text-xs font-bold uppercase tracking-widest text-zinc-500 sm:grid-cols-4 sm:gap-6'>
            <p>Year</p>
            <p>Champion</p>
            <p>Team</p>
            <p>Nationality</p>
          </div>

          <div className='flex flex-col'>
            {seasons.map((season) => (
              <div
                key={season.year}
                className='group grid grid-cols-1 items-center gap-4 border-t border-zinc-800/50 bg-transparent px-6 py-4 transition-all hover:bg-[var(--team-color)] sm:grid-cols-4 sm:gap-6'
                style={{ '--team-color': teamInfo[season.team]?.color || 'rgba(255,255,255,0.05)' }}
              >
                <p className='text-xl font-bold text-white/90 font-mono group-hover:text-white group-hover:drop-shadow-md'>{season.year}</p>
                <p className='text-lg font-semibold text-white transition-colors group-hover:drop-shadow-md'>{season.champion}</p>
                <div className='flex items-center gap-3'>
                  {teamInfo[season.team]?.logo ? (
                    <div className='flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white/5 p-1.5 transition-transform group-hover:scale-110 group-hover:bg-white/20 shadow-sm'>
                      <img src={teamInfo[season.team].logo} alt={season.team} className='max-h-full max-w-full object-contain' onError={(e) => {e.target.style.display='none'}} />
                    </div>
                  ) : (
                    <div className='h-10 w-10 shrink-0 rounded-full bg-white/10 group-hover:bg-white/20' />
                  )}
                  <span className='font-bold tracking-wide transition-colors group-hover:!text-white group-hover:drop-shadow-md' style={{ color: teamInfo[season.team]?.color || '#fff' }}>{season.team}</span>
                </div>
                <p className='text-sm font-medium text-zinc-400 group-hover:text-white/90 group-hover:drop-shadow-md'>{season.nationality}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Seasons
