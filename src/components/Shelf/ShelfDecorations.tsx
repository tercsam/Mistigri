import { motion } from 'framer-motion';

const G='#828282';const GD='#6a6a6a';const GL='#9a9a9a';const CR='#F2EDE4';const PK='#E8A0A0';const PKD='#D47878';const NOSE='#E88B8B';

// =============================================================================
// CHAT (inchangé)
// =============================================================================
export function BlackCat({ dvdHovered=false }:{dvdHovered?:boolean}) {
  return (
    <div style={{width:120,height:230,flexShrink:0,position:'relative',overflow:'visible'}}>
      <motion.svg viewBox="0 0 55 190" style={{position:'absolute',left:-15,top:175,width:55,height:190,zIndex:200,pointerEvents:'none',overflow:'visible'}}>
        <motion.path stroke="rgba(0,0,0,0.06)" strokeWidth="14" fill="none" strokeLinecap="round" animate={{d:['M30 0 Q8 50 18 95 Q30 140 12 188','M30 0 Q48 55 35 100 Q18 145 38 188','M30 0 Q12 60 25 100 Q38 145 16 188','M30 0 Q8 50 18 95 Q30 140 12 188']}} transition={{duration:4.5,ease:'easeInOut',repeat:Infinity}}/>
        <motion.path stroke={G} strokeWidth="10" fill="none" strokeLinecap="round" animate={{d:['M28 0 Q6 50 16 95 Q28 140 10 188','M28 0 Q46 55 33 100 Q16 145 36 188','M28 0 Q10 60 23 100 Q36 145 14 188','M28 0 Q6 50 16 95 Q28 140 10 188']}} transition={{duration:4.5,ease:'easeInOut',repeat:Infinity}}/>
        <motion.circle r="7" fill={CR} animate={{cx:[10,36,14,10],cy:[188,188,188,188]}} transition={{duration:4.5,ease:'easeInOut',repeat:Infinity}}/>
      </motion.svg>
      <svg viewBox="0 0 120 230" style={{width:'100%',height:'100%',overflow:'visible'}}>
        <ellipse cx="60" cy="210" rx="48" ry="8" fill="rgba(0,0,0,0.05)"/>
        <ellipse cx="60" cy="185" rx="48" ry="28" fill={G}/><ellipse cx="58" cy="183" rx="42" ry="24" fill={GL} opacity="0.12"/>
        <ellipse cx="64" cy="194" rx="30" ry="14" fill={CR}/>
        <ellipse cx="18" cy="180" rx="18" ry="22" fill={G}/>
        <ellipse cx="14" cy="208" rx="11" ry="7" fill={G}/><ellipse cx="14" cy="210" rx="8" ry="4.5" fill={CR}/><circle cx="12" cy="211" r="1.8" fill={PK}/>
        <ellipse cx="30" cy="210" rx="9" ry="6" fill={G}/><ellipse cx="30" cy="212" rx="6" ry="3.5" fill={CR}/>
        <ellipse cx="90" cy="208" rx="11" ry="7" fill={G}/><ellipse cx="90" cy="210" rx="8" ry="4.5" fill={CR}/><circle cx="88" cy="211" r="1.8" fill={PK}/>
        <ellipse cx="106" cy="209" rx="10" ry="6" fill={G}/><ellipse cx="106" cy="211" rx="7" ry="4" fill={CR}/><circle cx="104" cy="212" r="1.8" fill={PK}/>
        <ellipse cx="96" cy="155" rx="24" ry="22" fill={G}/>
        <ellipse cx="108" cy="166" rx="16" ry="12" fill={CR}/>
        <polygon points="76,144 66,114 86,136" fill={G}/><polygon points="114,138 126,108 106,130" fill={G}/>
        <polygon points="77.5,142 69,118 84,136" fill={PK}/><polygon points="113,137 124,112 107,131" fill={PK}/>
        {dvdHovered?(<><circle cx="86" cy="152" r="8" fill="white"/><circle cx="88" cy="152" r="5.5" fill="#222"/><circle cx="90" cy="150" r="2.2" fill="white"/><path d="M102 150 Q108 144 114 150" stroke={GD} strokeWidth="2.8" fill="none" strokeLinecap="round"/></>):(<><path d="M80 152 Q86 146 92 152" stroke={GD} strokeWidth="2.8" fill="none" strokeLinecap="round"/><path d="M102 150 Q108 144 114 150" stroke={GD} strokeWidth="2.8" fill="none" strokeLinecap="round"/></>)}
        <ellipse cx="110" cy="162" rx="6" ry="4.5" fill={NOSE}/><ellipse cx="109" cy="160.5" rx="2.5" ry="1.8" fill="rgba(255,255,255,0.35)"/>
        <line x1="116" y1="158" x2="120" y2="154" stroke={GD} strokeWidth="0.6" opacity="0.5"/><line x1="116" y1="162" x2="120" y2="162" stroke={GD} strokeWidth="0.6" opacity="0.5"/><line x1="116" y1="166" x2="120" y2="170" stroke={GD} strokeWidth="0.6" opacity="0.5"/>
        <line x1="82" y1="162" x2="74" y2="158" stroke={GD} strokeWidth="0.6" opacity="0.5"/><line x1="82" y1="164" x2="74" y2="165" stroke={GD} strokeWidth="0.6" opacity="0.5"/>
        <path d="M106 168 Q110 171 114 168" stroke={GD} strokeWidth="0.8" fill="none" opacity="0.4"/>
      </svg>
    </div>
  );
}

// PLANTE GÉANTE (inchangée)
export function GiantPlant({ dvdHovered=false }:{dvdHovered?:boolean}) {
  return (
    <div style={{width:60,height:200,flexShrink:0}}>
      <svg viewBox="0 0 60 200" style={{width:'100%',height:'100%'}}>
        <defs><linearGradient id="gp" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#D4896A"/><stop offset="100%" stopColor="#8B5A3C"/></linearGradient></defs>
        <path d="M15 140 L12 188 Q12 196 18 196 L42 196 Q48 196 48 188 L45 140 Z" fill="url(#gp)"/>
        <rect x="12" y="134" width="36" height="10" rx="3" fill="#D4896A"/>
        <ellipse cx="30" cy="140" rx="16" ry="5" fill="#5C3A1E"/>
        <rect x="28" y="50" width="4" height="90" fill="#4A7C59"/>
        <rect x="26" y="80" width="3" height="50" fill="#3D6B4C" transform="rotate(15,27,105)"/>
        <rect x="31" y="70" width="3" height="40" fill="#3D6B4C" transform="rotate(-12,32,90)"/>
        <motion.g animate={dvdHovered?{rotate:[0,-3,3,-2,1,0]}:{rotate:0}} transition={{duration:1.5,ease:'easeInOut',repeat:dvdHovered?Infinity:0}} style={{transformOrigin:'30px 90px'}}>
          <ellipse cx="14" cy="60" rx="12" ry="6" fill="#5DA36F" transform="rotate(-40,14,60)"/><ellipse cx="46" cy="65" rx="12" ry="6" fill="#4A8C5E" transform="rotate(35,46,65)"/>
          <ellipse cx="20" cy="40" rx="11" ry="5" fill="#6BB87E" transform="rotate(-20,20,40)"/><ellipse cx="42" cy="45" rx="10" ry="5" fill="#58A06A" transform="rotate(25,42,45)"/>
          <ellipse cx="30" cy="25" rx="10" ry="5" fill="#78C890" transform="rotate(5,30,25)"/><ellipse cx="18" cy="50" rx="9" ry="4" fill="#6BB87E" transform="rotate(-50,18,50)"/>
          <ellipse cx="44" cy="55" rx="8" ry="4" fill="#4A8C5E" transform="rotate(45,44,55)"/><ellipse cx="26" cy="15" rx="8" ry="4" fill="#88D8A0" transform="rotate(-10,26,15)"/>
          <ellipse cx="36" cy="35" rx="9" ry="4.5" fill="#5DA36F" transform="rotate(15,36,35)"/>
        </motion.g>
      </svg>
    </div>
  );
}

// Wrapper qui anime sur dvdHovered
function D({ children, w, h, dvdHovered, anim = {} }: { children: React.ReactNode; w: number; h: number; dvdHovered: boolean; anim?: Record<string, unknown> }) {
  return <motion.div style={{ width: w, height: h, flexShrink: 0 }} animate={dvdHovered ? anim : {}} transition={{ type: 'spring', stiffness: 200, damping: 12 }}>{children}</motion.div>;
}

// =============================================================================
// OSCAR — statuette dorée détaillée avec socle 3 niveaux
// =============================================================================
export function MiniOscar({ dvdHovered=false }:{dvdHovered?:boolean}) {
  return (
    <D w={50} h={130} dvdHovered={dvdHovered} anim={{ filter: 'brightness(1.25) drop-shadow(0 0 12px rgba(255,215,0,0.6))' }}>
      <svg viewBox="0 0 50 130" style={{width:'100%',height:'100%'}}>
        <defs>
          <linearGradient id="og" x1="0.2" y1="0" x2="0.8" y2="1"><stop offset="0%" stopColor="#F5E080"/><stop offset="25%" stopColor="#E0C050"/><stop offset="50%" stopColor="#C8A030"/><stop offset="75%" stopColor="#B08820"/><stop offset="100%" stopColor="#907010"/></linearGradient>
          <linearGradient id="os" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#D4A944"/><stop offset="100%" stopColor="#806010"/></linearGradient>
        </defs>
        {/* Socle 3 niveaux */}
        <rect x="8" y="120" width="34" height="8" rx="2" fill="#705808"/><rect x="8" y="120" width="34" height="2" rx="1" fill="rgba(255,255,255,0.1)"/>
        <rect x="10" y="112" width="30" height="10" rx="2" fill="url(#os)"/><rect x="12" y="113" width="20" height="2" rx="1" fill="rgba(255,255,255,0.15)"/>
        <rect x="12" y="105" width="26" height="9" rx="2" fill="#C8A030"/>
        {/* Jambes */}
        <rect x="18" y="80" width="5" height="26" rx="2.5" fill="url(#og)"/><rect x="27" y="80" width="5" height="26" rx="2.5" fill="url(#og)"/>
        <ellipse cx="20.5" cy="105" rx="4.5" ry="2.5" fill="#B08820"/><ellipse cx="29.5" cy="105" rx="4.5" ry="2.5" fill="#B08820"/>
        {/* Torse */}
        <path d="M16 45 Q15 62 18 80 L32 80 Q35 62 34 45 Z" fill="url(#og)"/>
        <path d="M20 50 Q20 62 21 72 L27 72 Q28 62 28 50 Z" fill="rgba(255,255,255,0.08)"/>
        {/* Bras */}
        <path d="M16 48 Q8 56 11 74 L14 73 Q13 56 17 50 Z" fill="url(#og)"/>
        <path d="M34 48 Q42 56 39 74 L36 73 Q37 56 33 50 Z" fill="url(#og)"/>
        {/* Épée */}
        <rect x="9" y="38" width="2" height="38" rx="1" fill="#D8D8D8"/><rect x="7" y="73" width="6" height="3" rx="1" fill="#C8A030"/><rect x="8" y="36" width="4" height="5" rx="1.5" fill="#C8A030"/>
        {/* Cou */}
        <rect x="21" y="38" width="8" height="10" rx="4" fill="url(#og)"/>
        {/* Tête */}
        <ellipse cx="25" cy="28" rx="10" ry="13" fill="url(#og)"/>
        {/* Reflet tête */}
        <ellipse cx="22" cy="24" rx="4" ry="6" fill="rgba(255,255,255,0.12)"/>
        {/* Traits visage */}
        <ellipse cx="21" cy="27" rx="1.5" ry="1.2" fill="#907010"/><ellipse cx="29" cy="27" rx="1.5" ry="1.2" fill="#907010"/>
        <line x1="25" y1="29" x2="25" y2="33" stroke="#907010" strokeWidth="1"/>
      </svg>
    </D>
  );
}

// LIVRES — 3 livres empilés avec textures
export function BookStack({ dvdHovered=false }:{dvdHovered?:boolean}) {
  return (
    <D w={42} h={75} dvdHovered={dvdHovered} anim={{ y: -4 }}>
      <svg viewBox="0 0 36 60" style={{width:'100%',height:'100%'}}>
        <defs>
          <linearGradient id="b1" x1="0" y1="0" x2="1" y2="0"><stop offset="0%" stopColor="#b01830"/><stop offset="50%" stopColor="#c41e3a"/><stop offset="100%" stopColor="#a01528"/></linearGradient>
          <linearGradient id="b2" x1="0" y1="0" x2="1" y2="0"><stop offset="0%" stopColor="#8a6a08"/><stop offset="50%" stopColor="#B8860B"/><stop offset="100%" stopColor="#8a6a08"/></linearGradient>
          <linearGradient id="b3" x1="0" y1="0" x2="1" y2="0"><stop offset="0%" stopColor="#5a4880"/><stop offset="50%" stopColor="#7B6FA8"/><stop offset="100%" stopColor="#5a4880"/></linearGradient>
        </defs>
        {/* Livre 1 — rouge */}
        <rect x="2" y="42" width="28" height="14" rx="2" fill="url(#b1)"/><rect x="3" y="43" width="2" height="12" rx="1" fill="rgba(255,255,255,0.12)"/><rect x="26" y="43" width="3" height="12" rx="0.5" fill="rgba(0,0,0,0.1)"/>
        <rect x="10" y="47" width="12" height="1" rx="0.5" fill="rgba(255,215,0,0.3)"/>
        {/* Livre 2 — doré */}
        <rect x="4" y="28" width="26" height="15" rx="2" fill="url(#b2)"/><rect x="5" y="29" width="2" height="13" rx="1" fill="rgba(255,255,255,0.15)"/>
        <rect x="12" y="33" width="10" height="1" rx="0.5" fill="rgba(255,255,255,0.2)"/><rect x="14" y="36" width="6" height="1" rx="0.5" fill="rgba(255,255,255,0.15)"/>
        {/* Livre 3 — violet, de travers */}
        <g transform="rotate(-7,16,20)"><rect x="1" y="14" width="26" height="14" rx="2" fill="url(#b3)"/><rect x="2" y="15" width="2" height="12" rx="1" fill="rgba(255,255,255,0.12)"/></g>
        {/* Marque-page */}
        <rect x="18" y="8" width="2.5" height="12" rx="0.5" fill="#c41e3a" transform="rotate(-7,19,14)"/>
      </svg>
    </D>
  );
}

// POPCORN — seau rayé rouge/blanc, grains qui sautent au hover DVD
export function Popcorn({ dvdHovered=false }:{dvdHovered?:boolean}) {
  return (
    <div style={{ width: 60, height: 110, flexShrink: 0, overflow: 'visible' }}>
      <svg viewBox="0 0 100 170" style={{width:'100%',height:'100%',overflow:'visible'}}>
        <defs>
          <clipPath id="pcClip"><path d="M18 65 L10 148 Q10 156 20 156 L80 156 Q90 156 90 148 L82 65 Z"/></clipPath>
          <linearGradient id="pcR" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#b01020"/><stop offset="50%" stopColor="#e02030"/><stop offset="100%" stopColor="#b01020"/>
          </linearGradient>
        </defs>

        {/* Ombre */}
        <ellipse cx="50" cy="158" rx="35" ry="4" fill="rgba(0,0,0,0.05)"/>

        {/* === SEAU — trapèze évasé, rayures rouge/blanc alternées === */}
        {/* Fond rouge */}
        <path d="M18 65 L10 148 Q10 156 20 156 L80 156 Q90 156 90 148 L82 65 Z" fill="url(#pcR)"/>

        {/* Rayures blanches — larges bandes verticales qui suivent la perspective */}
        <g clipPath="url(#pcClip)">
          <path d="M24 65 L18 156 L28 156 L32 65 Z" fill="rgba(255,255,255,0.85)"/>
          <path d="M40 65 L36 156 L46 156 L48 65 Z" fill="rgba(255,255,255,0.85)"/>
          <path d="M56 65 L54 156 L64 156 L64 65 Z" fill="rgba(255,255,255,0.85)"/>
          <path d="M72 65 L72 156 L82 156 L80 65 Z" fill="rgba(255,255,255,0.85)"/>
        </g>

        {/* Ombre latérale gauche */}
        <path d="M18 65 L10 148 Q10 156 20 156 L24 156 L30 65 Z" fill="rgba(0,0,0,0.06)"/>
        {/* Reflet droit */}
        <path d="M74 65 L82 65 L90 148 Q90 156 80 156 L76 156 Z" fill="rgba(255,255,255,0.04)"/>

        {/* Rebord supérieur — lèvre épaisse du seau */}
        <path d="M16 62 L84 62 L82 70 Q50 74 18 70 Z" fill="#c82030"/>
        <path d="M18 63 L82 63 L81 66 Q50 68 19 66 Z" fill="rgba(255,255,255,0.15)"/>
        {/* Épaisseur du rebord */}
        <ellipse cx="50" cy="62" rx="34" ry="4" fill="#d83040"/>
        <ellipse cx="50" cy="61" rx="32" ry="3" fill="#e84050"/>

        {/* Intérieur visible du seau (ombre) */}
        <ellipse cx="50" cy="63" rx="28" ry="5" fill="rgba(0,0,0,0.15)"/>

        {/* === POPCORN — grains multiples avec ombres et reflets === */}
        {/* Couche du fond (dans le seau) */}
        <circle cx="34" cy="56" r="6" fill="#F0E0B0"/><circle cx="46" cy="58" r="5" fill="#EDD8A0"/><circle cx="58" cy="55" r="6.5" fill="#F0E0B0"/><circle cx="70" cy="58" r="5" fill="#E8D098"/>

        {/* Couche principale — gros grains irréguliers */}
        <g>
          {/* Grain gauche */}
          <circle cx="22" cy="48" r="8" fill="#FFF5D0"/><circle cx="18" cy="44" r="5" fill="#FFFAE0"/><circle cx="26" cy="44" r="4.5" fill="#FFF0C0"/>
          <circle cx="20" cy="50" r="3" fill="rgba(210,180,100,0.1)"/>

          {/* Grain centre-gauche */}
          <circle cx="36" cy="42" r="9" fill="#FFF5D0"/><circle cx="33" cy="38" r="5.5" fill="#FFFAE0"/><circle cx="40" cy="38" r="5" fill="#FFF0C0"/>
          <circle cx="36" cy="36" r="3.5" fill="#FFFBE8"/>

          {/* Grain centre */}
          <circle cx="50" cy="38" r="10" fill="#FFF5D0"/><circle cx="47" cy="34" r="6" fill="#FFFAE0"/><circle cx="54" cy="34" r="5.5" fill="#FFF0C0"/>
          <circle cx="50" cy="32" r="4" fill="#FFFBE8"/><circle cx="52" cy="30" r="2.5" fill="rgba(255,255,255,0.3)"/>

          {/* Grain centre-droit */}
          <circle cx="64" cy="42" r="8.5" fill="#FFF5D0"/><circle cx="68" cy="38" r="5" fill="#FFFAE0"/><circle cx="61" cy="39" r="4.5" fill="#FFF0C0"/>

          {/* Grain droit */}
          <circle cx="76" cy="48" r="7.5" fill="#FFF5D0"/><circle cx="78" cy="44" r="4.5" fill="#FFFAE0"/><circle cx="73" cy="45" r="4" fill="#FFF0C0"/>

          {/* Couche haute */}
          <circle cx="30" cy="32" r="6" fill="#FFF8D8"/><circle cx="28" cy="28" r="3.5" fill="#FFFBE8"/>
          <circle cx="44" cy="28" r="7" fill="#FFF5D0"/><circle cx="42" cy="24" r="4" fill="#FFFAE0"/>
          <circle cx="58" cy="30" r="6.5" fill="#FFF5D0"/><circle cx="60" cy="26" r="4" fill="#FFFAE0"/>
          <circle cx="70" cy="36" r="5.5" fill="#FFF8D8"/>

          {/* Sommet */}
          <circle cx="38" cy="22" r="5" fill="#FFFAE0"/><circle cx="50" cy="20" r="5.5" fill="#FFF5D0"/><circle cx="62" cy="24" r="4.5" fill="#FFFAE0"/>
          <circle cx="46" cy="16" r="4" fill="#FFFBE8"/><circle cx="54" cy="18" r="3.5" fill="#FFF8D8"/>
        </g>

        {/* Ombres sous l'amas */}
        <ellipse cx="40" cy="58" rx="12" ry="3" fill="rgba(180,150,80,0.06)"/>
        <ellipse cx="60" cy="56" rx="10" ry="3" fill="rgba(180,150,80,0.06)"/>

        {/* === GRAINS QUI SAUTENT — animés au hover DVD === */}
        <motion.circle cx="30" cy="18" r="4" fill="#FFF5D0" stroke="#EEE0B0" strokeWidth="0.3"
          animate={dvdHovered ? { y: [0, -14, 0, -8, 0], x: [0, -3, 0, 2, 0] } : { y: 0 }}
          transition={{ duration: 0.8, repeat: dvdHovered ? Infinity : 0, ease: 'easeOut' }}/>
        <motion.circle cx="52" cy="14" r="3.5" fill="#FFFAE0" stroke="#EEE0B0" strokeWidth="0.3"
          animate={dvdHovered ? { y: [0, -18, 0, -10, 0], x: [0, 4, 0, -2, 0] } : { y: 0 }}
          transition={{ duration: 0.9, repeat: dvdHovered ? Infinity : 0, ease: 'easeOut', delay: 0.15 }}/>
        <motion.circle cx="68" cy="20" r="3" fill="#FFF5D0" stroke="#EEE0B0" strokeWidth="0.3"
          animate={dvdHovered ? { y: [0, -12, 0, -6, 0], x: [0, 2, 0, -3, 0] } : { y: 0 }}
          transition={{ duration: 0.7, repeat: dvdHovered ? Infinity : 0, ease: 'easeOut', delay: 0.3 }}/>
        <motion.circle cx="42" cy="12" r="3" fill="#FFFBE8" stroke="#EEE0B0" strokeWidth="0.3"
          animate={dvdHovered ? { y: [0, -16, 0, -9, 0], x: [0, -2, 0, 3, 0] } : { y: 0 }}
          transition={{ duration: 1, repeat: dvdHovered ? Infinity : 0, ease: 'easeOut', delay: 0.08 }}/>
        <motion.circle cx="60" cy="16" r="2.5" fill="#FFF8D8" stroke="#EEE0B0" strokeWidth="0.3"
          animate={dvdHovered ? { y: [0, -20, 0, -12, 0], x: [0, 3, 0, -2, 0] } : { y: 0 }}
          transition={{ duration: 0.85, repeat: dvdHovered ? Infinity : 0, ease: 'easeOut', delay: 0.22 }}/>
      </svg>
    </div>
  );
}

// SABLIER — verre soufflé avec cadre ouvragé
export function Hourglass({ dvdHovered=false }:{dvdHovered?:boolean}) {
  return (
    <D w={38} h={95} dvdHovered={dvdHovered} anim={{ rotate: 180 }}>
      <svg viewBox="0 0 38 95" style={{width:'100%',height:'100%'}}>
        <defs>
          <linearGradient id="hf" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#E0C050"/><stop offset="100%" stopColor="#8B6914"/></linearGradient>
          <linearGradient id="hg" x1="0" y1="0" x2="1" y2="0"><stop offset="0%" stopColor="rgba(220,200,160,0.15)"/><stop offset="50%" stopColor="rgba(220,200,160,0.3)"/><stop offset="100%" stopColor="rgba(220,200,160,0.15)"/></linearGradient>
        </defs>
        {/* Cadre haut */}
        <rect x="5" y="0" width="28" height="5" rx="2" fill="url(#hf)"/><rect x="7" y="1" width="16" height="1.5" rx="0.75" fill="rgba(255,255,255,0.2)"/>
        <rect x="3" y="4" width="32" height="3" rx="1.5" fill="#B08820"/>
        {/* Cadre bas */}
        <rect x="5" y="90" width="28" height="5" rx="2" fill="url(#hf)"/><rect x="7" y="91" width="16" height="1.5" rx="0.75" fill="rgba(255,255,255,0.2)"/>
        <rect x="3" y="88" width="32" height="3" rx="1.5" fill="#B08820"/>
        {/* Verre haut */}
        <path d="M9 7 L9 38 L19 48 L29 38 L29 7 Z" fill="url(#hg)" stroke="rgba(180,160,120,0.4)" strokeWidth="0.8"/>
        {/* Verre bas */}
        <path d="M9 88 L9 57 L19 48 L29 57 L29 88 Z" fill="url(#hg)" stroke="rgba(180,160,120,0.4)" strokeWidth="0.8"/>
        {/* Sable haut */}
        <path d="M11 8 L11 32 L19 43 L27 32 L27 8 Z" fill="rgba(210,180,100,0.35)"/>
        {/* Sable bas */}
        <motion.path fill="rgba(210,180,100,0.45)"
          animate={dvdHovered ? { d: ['M13 88 L13 72 L19 62 L25 72 L25 88 Z', 'M11 88 L11 65 L19 55 L27 65 L27 88 Z'] } : {}}
          transition={{ duration: 2.5, repeat: dvdHovered ? Infinity : 0, repeatType: 'reverse' }}
          d="M13 88 L13 72 L19 62 L25 72 L25 88 Z"/>
        {/* Filet */}
        <rect x="18" y="42" width="2" height="16" fill="rgba(210,180,100,0.5)"/>
        {/* Reflets sur le verre */}
        <path d="M12 12 L12 34 L14 34 L14 12 Z" fill="rgba(255,255,255,0.08)"/>
        <path d="M12 60 L12 84 L14 84 L14 60 Z" fill="rgba(255,255,255,0.08)"/>
        {/* Piliers décoratifs */}
        <rect x="7" y="6" width="2" height="83" rx="1" fill="rgba(180,140,50,0.3)"/>
        <rect x="29" y="6" width="2" height="83" rx="1" fill="rgba(180,140,50,0.3)"/>
      </svg>
    </D>
  );
}

// CAMERA VINTAGE — boîtier cuir, objectif avec lentilles
export function OldCamera({ dvdHovered=false }:{dvdHovered?:boolean}) {
  return (
    <D w={60} h={70} dvdHovered={dvdHovered} anim={{ scale: 1.08 }}>
      <svg viewBox="0 0 60 70" style={{width:'100%',height:'100%'}}>
        <defs>
          <linearGradient id="cb" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#555"/><stop offset="100%" stopColor="#333"/></linearGradient>
          <radialGradient id="cl" cx="50%" cy="50%" r="50%"><stop offset="0%" stopColor="#555"/><stop offset="40%" stopColor="#333"/><stop offset="70%" stopColor="#222"/><stop offset="100%" stopColor="#111"/></radialGradient>
        </defs>
        {/* Corps */}
        <rect x="5" y="18" width="50" height="38" rx="5" fill="url(#cb)"/>
        <rect x="7" y="20" width="46" height="34" rx="3" fill="#3a3a3a"/>
        {/* Texture cuir */}
        <rect x="8" y="21" width="44" height="32" rx="2" fill="none" stroke="rgba(255,255,255,0.03)" strokeWidth="0.5"/>
        {/* Objectif — cercles concentriques */}
        <circle cx="30" cy="38" r="14" fill="#2a2a2a" stroke="#666" strokeWidth="2"/>
        <circle cx="30" cy="38" r="11.5" fill="#222" stroke="#555" strokeWidth="1.5"/>
        <circle cx="30" cy="38" r="9" fill="url(#cl)" stroke="#444" strokeWidth="1"/>
        <circle cx="30" cy="38" r="6" fill="#1a1a1a"/><circle cx="30" cy="38" r="3.5" fill="#2a2a2a"/>
        {/* Reflet lentille */}
        <circle cx="27" cy="35" r="3" fill="rgba(100,150,255,0.08)"/><circle cx="26" cy="34" r="1.5" fill="rgba(255,255,255,0.15)"/>
        {/* Viseur */}
        <rect x="16" y="8" width="22" height="12" rx="2.5" fill="#4a4a4a"/><rect x="18" y="10" width="18" height="8" rx="1.5" fill="#333"/>
        <rect x="20" y="12" width="14" height="4" rx="1" fill="#2a2a2a"/>
        {/* Flash */}
        <rect x="44" y="22" width="9" height="10" rx="2" fill="#555"/><circle cx="48.5" cy="27" r="3.5" fill="#777"/><circle cx="48.5" cy="27" r="2" fill="#999"/>
        {/* Bouton déclencheur */}
        <circle cx="44" cy="14" r="3.5" fill="#c41e3a"/><circle cx="44" cy="14" r="2" fill="#d83050"/><circle cx="43" cy="13" r="0.8" fill="rgba(255,255,255,0.3)"/>
        {/* Grip cuir */}
        <rect x="5" y="24" width="5" height="26" rx="2" fill="#444"/>
        <line x1="7" y1="28" x2="7" y2="30" stroke="#555" strokeWidth="1.5" strokeLinecap="round"/>
        <line x1="7" y1="33" x2="7" y2="35" stroke="#555" strokeWidth="1.5" strokeLinecap="round"/>
        <line x1="7" y1="38" x2="7" y2="40" stroke="#555" strokeWidth="1.5" strokeLinecap="round"/>
        <line x1="7" y1="43" x2="7" y2="45" stroke="#555" strokeWidth="1.5" strokeLinecap="round"/>
      </svg>
    </D>
  );
}

// TOUPIE INCEPTION — métal sombre argenté, rotation 3D horizontale
export function InceptionTop({ dvdHovered=false }:{dvdHovered?:boolean}) {
  return (
    <motion.div style={{ width: 50, height: 75, flexShrink: 0, perspective: '250px' }}>
      <motion.div style={{ width: '100%', height: '100%', transformStyle: 'preserve-3d' }}
        animate={dvdHovered ? { rotateY: [0, 360] } : { rotateY: 0 }}
        transition={{ duration: 1.8, repeat: dvdHovered ? Infinity : 0, ease: 'linear' }}>
        <svg viewBox="0 0 100 150" style={{width:'100%',height:'100%'}}>
          <defs>
            <linearGradient id="tM" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#1a1a1a"/><stop offset="15%" stopColor="#555"/><stop offset="35%" stopColor="#888"/>
              <stop offset="50%" stopColor="#a5a5a5"/><stop offset="65%" stopColor="#888"/><stop offset="85%" stopColor="#555"/>
              <stop offset="100%" stopColor="#1a1a1a"/>
            </linearGradient>
            <linearGradient id="tE" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#666"/><stop offset="100%" stopColor="#222"/>
            </linearGradient>
            <linearGradient id="tSt" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#222"/><stop offset="30%" stopColor="#777"/><stop offset="50%" stopColor="#999"/>
              <stop offset="70%" stopColor="#777"/><stop offset="100%" stopColor="#222"/>
            </linearGradient>
          </defs>

          <ellipse cx="50" cy="144" rx="16" ry="4" fill="rgba(0,0,0,0.1)"/>

          {/* === POINTE BASSE — cône sous le disque, effilé === */}
          <path d="M35 108 L50 140 L65 108 Z" fill="url(#tE)"/>
          {/* Reflet sur la pointe */}
          <path d="M42 110 L50 136 L54 110 Z" fill="rgba(255,255,255,0.05)"/>

          {/* === DISQUE — avec ÉPAISSEUR visible (pas juste une ellipse) === */}
          {/* Tranche du disque — la bande visible entre le dessus et le dessous */}
          <path d="M8 100 Q8 108 50 112 Q92 108 92 100" fill="url(#tE)" stroke="rgba(0,0,0,0.3)" strokeWidth="0.5"/>
          {/* Dessous du disque */}
          <ellipse cx="50" cy="100" rx="42" ry="10" fill="#333"/>
          {/* Surface supérieure du disque */}
          <ellipse cx="50" cy="95" rx="42" ry="10" fill="url(#tM)"/>
          {/* Bord chanfreiné — anneau sur le dessus */}
          <ellipse cx="50" cy="95" rx="42" ry="10" fill="none" stroke="rgba(0,0,0,0.2)" strokeWidth="1.2"/>
          <ellipse cx="50" cy="94" rx="38" ry="8.5" fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="0.6"/>
          {/* Reflet oval brillant décentré */}
          <ellipse cx="38" cy="92" rx="16" ry="5" fill="rgba(255,255,255,0.1)" transform="rotate(-8,38,92)"/>
          {/* Deuxième reflet plus petit */}
          <ellipse cx="62" cy="97" rx="8" ry="3" fill="rgba(255,255,255,0.05)"/>

          {/* === TIGE — forme de goutte allongée, renflement à la base === */}
          {/* La tige s'élargit en arrivant au disque — forme organique */}
          <path d="M46 93 Q44 80 44 60 Q44 40 46 25 Q48 14 50 8 Q52 14 54 25 Q56 40 56 60 Q56 80 54 93 Z" fill="url(#tSt)"/>
          {/* Renflement à la jonction tige/disque */}
          <ellipse cx="50" cy="92" rx="6" ry="3" fill="#555"/>
          <ellipse cx="50" cy="91" rx="5" ry="2.5" fill="#777"/>
          {/* Reflet central sur la tige */}
          <path d="M48.5 90 Q48 70 48.5 45 Q49 25 50 10 L51 10 Q52 25 52 45 Q52 70 51.5 90 Z" fill="rgba(255,255,255,0.1)"/>
          {/* Ombre côté gauche de la tige */}
          <path d="M46 90 Q45 70 45.5 50 Q46 35 47 22 L48 22 Q47 35 46.5 50 Q46 70 47 90 Z" fill="rgba(0,0,0,0.08)"/>
          {/* Pointe sommitale */}
          <ellipse cx="50" cy="8" rx="2.5" ry="1.5" fill="#888"/>
          <ellipse cx="50" cy="8" rx="1.2" ry="0.8" fill="#bbb"/>
        </svg>
      </motion.div>
    </motion.div>
  );
}

// FAUCON MILLENIUM — drift au hover
export function MilleniumFalcon({ dvdHovered=false }:{dvdHovered?:boolean}) {
  return (
    <D w={65} h={45} dvdHovered={dvdHovered} anim={{ x: [0, 4, -3, 5, 0], y: [0, -3, 2, -2, 0] }}>
      <svg viewBox="0 0 65 45" style={{width:'100%',height:'100%'}}>
        <defs><linearGradient id="fg" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#c0c0c0"/><stop offset="100%" stopColor="#888"/></linearGradient></defs>
        <ellipse cx="32" cy="24" rx="28" ry="15" fill="url(#fg)"/><ellipse cx="32" cy="24" rx="24" ry="12" fill="#a0a0a0"/>
        <ellipse cx="32" cy="24" rx="28" ry="15" fill="none" stroke="#777" strokeWidth="0.6"/>
        {/* Panneaux */}
        <rect x="20" cy="18" width="8" height="6" rx="1" fill="#999" x="18" y="18"/><rect x="28" y="20" width="6" height="4" rx="1" fill="#888"/>
        <circle cx="24" cy="20" r="4" fill="#888" stroke="#777" strokeWidth="0.5"/><circle cx="24" cy="20" r="2" fill="#999"/>
        <circle cx="38" cy="22" r="3" fill="#888" stroke="#777" strokeWidth="0.5"/>
        {/* Cockpit */}
        <rect x="46" y="17" width="14" height="8" rx="3.5" fill="#b0b0b0"/><rect x="48" y="19" width="10" height="4" rx="2" fill="#c0c0c0"/>
        <circle cx="53" cy="21" r="1.5" fill="rgba(120,200,255,0.4)"/>
        {/* Mandibules */}
        <rect x="6" y="18" width="14" height="8" rx="3" fill="#b0b0b0"/><rect x="8" y="20" width="10" height="4" rx="2" fill="#a0a0a0"/>
        {/* Réacteurs */}
        <circle cx="15" cy="36" r="2.5" fill="#666"/><circle cx="15" cy="36" r="1.2" fill="#888"/>
        <circle cx="22" cy="38" r="2" fill="#666"/><circle cx="22" cy="38" r="1" fill="#888"/>
      </svg>
    </D>
  );
}

// BOULE DE CRISTAL — grande, socle doré ouvragé, magie violette, lévite au hover
export function CrystalBall({ dvdHovered=false }:{dvdHovered?:boolean}) {
  return (
    <div style={{ width: 65, height: 130, flexShrink: 0, overflow: 'visible' }}>
      <svg viewBox="0 0 110 210" style={{width:'100%',height:'100%',overflow:'visible'}}>
        <defs>
          <radialGradient id="cbG" cx="45%" cy="40%" r="55%">
            <stop offset="0%" stopColor="rgba(220,190,255,0.35)"/><stop offset="40%" stopColor="rgba(180,140,240,0.2)"/><stop offset="100%" stopColor="rgba(140,100,200,0.15)"/>
          </radialGradient>
          <radialGradient id="cbMagic" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="rgba(200,160,255,0.4)"/><stop offset="50%" stopColor="rgba(160,100,240,0.15)"/><stop offset="100%" stopColor="rgba(140,80,220,0)"/>
          </radialGradient>
          <linearGradient id="cbS" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#5A4010"/><stop offset="20%" stopColor="#B08828"/><stop offset="40%" stopColor="#D4AA40"/><stop offset="50%" stopColor="#E8C060"/><stop offset="60%" stopColor="#D4AA40"/><stop offset="80%" stopColor="#B08828"/><stop offset="100%" stopColor="#5A4010"/>
          </linearGradient>
          <linearGradient id="cbS2" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#D4AA40"/><stop offset="100%" stopColor="#6B4E14"/>
          </linearGradient>
          <radialGradient id="cbGl" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="rgba(180,140,255,0.25)"/><stop offset="100%" stopColor="rgba(180,140,255,0)"/>
          </radialGradient>
        </defs>

        <ellipse cx="55" cy="206" rx="32" ry="4" fill="rgba(0,0,0,0.06)"/>

        {/* === SOCLE DORÉ OUVRAGÉ === */}

        {/* Pieds — 3 pattes griffues courbées */}
        <path d="M24 196 Q18 200 12 204 Q10 206 14 206 Q18 206 20 202 Q22 200 24 198 Z" fill="url(#cbS2)"/>
        <path d="M24 196 Q20 198 16 204" fill="none" stroke="#8B6E18" strokeWidth="1"/>
        <path d="M55 198 L55 204 Q53 208 57 208 Q59 206 57 202 Z" fill="url(#cbS2)"/>
        <path d="M86 196 Q92 200 98 204 Q100 206 96 206 Q92 206 90 202 Q88 200 86 198 Z" fill="url(#cbS2)"/>
        <path d="M86 196 Q90 198 94 204" fill="none" stroke="#8B6E18" strokeWidth="1"/>
        {/* Griffes au bout des pattes */}
        <circle cx="13" cy="205" r="1.5" fill="#B08828"/><circle cx="97" cy="205" r="1.5" fill="#B08828"/><ellipse cx="55" cy="207" rx="2" ry="1" fill="#B08828"/>

        {/* Corps bas du socle — évasé */}
        <path d="M22 188 Q16 192 22 196 L88 196 Q94 192 88 188 Z" fill="url(#cbS)"/>
        {/* Ombre sous le corps */}
        <path d="M24 196 Q55 200 86 196" fill="none" stroke="rgba(0,0,0,0.1)" strokeWidth="1.5"/>

        {/* Bandeau décoratif milieu */}
        <rect x="26" y="184" width="58" height="6" rx="1" fill="url(#cbS)"/>
        <rect x="28" y="185" width="54" height="1.5" rx="0.75" fill="rgba(255,255,255,0.12)"/>

        {/* Volutes et ornements — arabesques dorées */}
        <path d="M30 190 Q26 186 28 182 Q30 178 34 180" fill="none" stroke="#C8A040" strokeWidth="1.2" strokeLinecap="round"/>
        <path d="M80 190 Q84 186 82 182 Q80 178 76 180" fill="none" stroke="#C8A040" strokeWidth="1.2" strokeLinecap="round"/>
        <path d="M40 192 Q38 188 40 184" fill="none" stroke="#A88828" strokeWidth="0.8" strokeLinecap="round"/>
        <path d="M70 192 Q72 188 70 184" fill="none" stroke="#A88828" strokeWidth="0.8" strokeLinecap="round"/>
        {/* Petits points décoratifs entre les volutes */}
        <circle cx="34" cy="188" r="1" fill="#D4AA40"/><circle cx="44" cy="188" r="0.8" fill="#C8A040"/>
        <circle cx="66" cy="188" r="0.8" fill="#C8A040"/><circle cx="76" cy="188" r="1" fill="#D4AA40"/>

        {/* Feuille/fleuron central — comme sur l'image de référence */}
        <path d="M50 192 Q55 184 55 178 Q55 184 60 192" fill="#B89030" stroke="#A08020" strokeWidth="0.6"/>
        <path d="M48 190 Q55 186 62 190" fill="#C8A040" stroke="#A08020" strokeWidth="0.4"/>
        <line x1="55" y1="192" x2="55" y2="178" stroke="#D4AA40" strokeWidth="0.6"/>

        {/* Corps haut du socle — se rétrécit */}
        <path d="M28 178 Q26 182 28 184 L82 184 Q84 182 82 178 Z" fill="url(#cbS)"/>

        {/* Coupelle de réception — la boule repose dedans */}
        <ellipse cx="55" cy="178" rx="24" ry="7" fill="#5A4010"/>
        <ellipse cx="55" cy="176" rx="24" ry="7" fill="url(#cbS)"/>
        {/* Intérieur de la coupelle (ombre) */}
        <ellipse cx="55" cy="175" rx="18" ry="5" fill="#4A3008"/>
        {/* Rebord brillant */}
        <ellipse cx="55" cy="174" rx="20" ry="5" fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth="0.8"/>
        {/* Petit anneau intérieur */}
        <ellipse cx="55" cy="174" rx="14" ry="3.5" fill="none" stroke="rgba(200,160,40,0.2)" strokeWidth="0.5"/>

        {/* === SPHÈRE — posée dans la coupelle, lévite au hover === */}
        <motion.g
          animate={dvdHovered
            ? { y: [-22, -26, -22, -24, -22] }
            : { y: 0 }
          }
          transition={dvdHovered
            ? { duration: 3, repeat: Infinity, ease: 'easeInOut' }
            : { type: 'spring', stiffness: 80, damping: 12 }
          }>

          {/* Halo magique quand lévite */}
          <motion.circle cx="55" cy="126" r="55" fill="url(#cbGl)"
            animate={dvdHovered ? { opacity: [0.6, 1, 0.6] } : { opacity: 0 }}
            transition={{ duration: 2, repeat: dvdHovered ? Infinity : 0 }}/>

          {/* Ombre de la boule sur la coupelle — DISPARAÎT quand elle flotte */}
          <motion.ellipse cx="55" cy="172" rx="18" ry="5" fill="rgba(80,40,140,0.12)"
            animate={dvdHovered ? { opacity: 0 } : { opacity: 1 }}
            transition={{ duration: 0.3 }}/>

          {/* Sphère extérieure — cy=126 pour que le bas (126+44=170) soit dans la coupelle */}
          <circle cx="55" cy="126" r="44" fill="url(#cbG)" stroke="rgba(160,120,220,0.3)" strokeWidth="1.5"/>
          {/* Couche intérieure */}
          <circle cx="55" cy="126" r="40" fill="rgba(180,150,230,0.06)"/>
          {/* Contact boule/coupelle — moitié basse cachée dans la coupelle */}
          <ellipse cx="55" cy="166" rx="20" ry="5" fill="rgba(100,60,160,0.06)"/>

          {/* === MAGIE INTÉRIEURE === */}
          <motion.ellipse fill="url(#cbMagic)"
            animate={{ cx: [44, 66, 48, 62, 44], cy: [118, 134, 124, 130, 118], rx: [14, 20, 12, 18, 14], ry: [10, 16, 18, 12, 10] }}
            transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}/>
          <motion.ellipse fill="rgba(200,160,255,0.18)"
            animate={{ cx: [64, 46, 58, 42, 64], cy: [132, 116, 130, 120, 132], rx: [12, 16, 8, 14, 12], ry: [14, 8, 16, 10, 14] }}
            transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}/>
          <motion.ellipse fill="rgba(240,220,255,0.14)"
            animate={{ cx: [50, 60, 46, 64, 50], cy: [122, 132, 128, 118, 122], rx: [8, 12, 10, 14, 8], ry: [10, 8, 12, 8, 10] }}
            transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}/>

          {/* Filaments magiques */}
          <motion.path fill="none" stroke="rgba(220,180,255,0.2)" strokeWidth="1.2" strokeLinecap="round"
            animate={{ d: [
              'M40 120 Q55 108 65 126 Q58 138 44 130',
              'M44 114 Q60 120 56 136 Q48 132 42 124',
              'M38 130 Q52 114 66 122 Q60 134 46 132',
              'M40 120 Q55 108 65 126 Q58 138 44 130',
            ] }}
            transition={{ duration: 4.5, repeat: Infinity, ease: 'easeInOut' }}/>
          <motion.path fill="none" stroke="rgba(200,160,255,0.12)" strokeWidth="0.8" strokeLinecap="round"
            animate={{ d: [
              'M48 112 Q60 124 50 136',
              'M58 114 Q46 128 56 134',
              'M44 118 Q62 116 52 138',
              'M48 112 Q60 124 50 136',
            ] }}
            transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut' }}/>

          {/* Reflets */}
          <ellipse cx="40" cy="104" rx="14" ry="18" fill="rgba(255,255,255,0.12)" transform="rotate(-25,40,104)"/>
          <ellipse cx="66" cy="144" rx="7" ry="5" fill="rgba(255,255,255,0.06)"/>
          <circle cx="38" cy="98" r="4" fill="rgba(255,255,255,0.22)"/>
          <circle cx="40" cy="100" r="1.5" fill="rgba(255,255,255,0.35)"/>
        </motion.g>
      </svg>
    </div>
  );
}

// BOUGIE — grande, bougeoir doré, flamme ample permanente
export function ScentedCandle({ dvdHovered=false }:{dvdHovered?:boolean}) {
  return (
    <div style={{ width: 45, height: 130, flexShrink: 0, overflow: 'visible' }}>
      <svg viewBox="0 0 70 200" style={{width:'100%',height:'100%',overflow:'visible'}}>
        <defs>
          <linearGradient id="cw" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#E0CDB5"/><stop offset="30%" stopColor="#F0E4D0"/><stop offset="50%" stopColor="#F8F0E0"/><stop offset="70%" stopColor="#F0E4D0"/><stop offset="100%" stopColor="#E0CDB5"/>
          </linearGradient>
          <linearGradient id="bg1" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#8B6914"/><stop offset="25%" stopColor="#D4A944"/><stop offset="50%" stopColor="#E8C76A"/><stop offset="75%" stopColor="#D4A944"/><stop offset="100%" stopColor="#8B6914"/>
          </linearGradient>
          <linearGradient id="bg2" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#D4A944"/><stop offset="100%" stopColor="#8B6914"/>
          </linearGradient>
          <radialGradient id="glow" cx="50%" cy="30%" r="50%">
            <stop offset="0%" stopColor="rgba(255,200,80,0.15)"/><stop offset="100%" stopColor="rgba(255,200,80,0)"/>
          </radialGradient>
        </defs>

        {/* Halo lumineux autour de la flamme */}
        <circle cx="35" cy="40" r="30" fill="url(#glow)"/>

        {/* Ombre au sol */}
        <ellipse cx="35" cy="196" rx="22" ry="4" fill="rgba(0,0,0,0.06)"/>

        {/* === BOUGEOIR DORÉ === */}
        {/* Base large */}
        <ellipse cx="35" cy="190" rx="22" ry="6" fill="#705808"/>
        <ellipse cx="35" cy="188" rx="22" ry="6" fill="url(#bg1)"/>
        <ellipse cx="35" cy="186" rx="20" ry="5" fill="rgba(255,255,255,0.08)"/>
        {/* Tige du bougeoir */}
        <path d="M30 186 L30 170 Q30 166 32 164 L32 156 Q30 152 30 148 L30 142 Q30 138 33 136 L37 136 Q40 138 40 142 L40 148 Q40 152 38 156 L38 164 Q40 166 40 170 L40 186 Z" fill="url(#bg2)"/>
        {/* Reflet tige */}
        <path d="M34 184 L34 168 Q34 164 35 162 L35 154 Q34 150 34 146 L34 140 L36 140 L36 146 Q36 150 35 154 L35 162 Q36 164 36 168 L36 184 Z" fill="rgba(255,255,255,0.12)"/>
        {/* Renflement milieu (noeud décoratif) */}
        <ellipse cx="35" cy="150" rx="7" ry="4" fill="url(#bg1)"/>
        <ellipse cx="35" cy="149" rx="5.5" ry="3" fill="rgba(255,255,255,0.1)"/>
        {/* Coupelle en haut */}
        <ellipse cx="35" cy="136" rx="14" ry="5" fill="#705808"/>
        <ellipse cx="35" cy="134" rx="14" ry="5" fill="url(#bg1)"/>
        <ellipse cx="35" cy="133" rx="12" ry="4" fill="rgba(255,255,255,0.08)"/>

        {/* === CIRE — cylindre blanc crème dans la coupelle === */}
        <rect x="22" y="90" width="26" height="44" rx="4" fill="url(#cw)"/>
        {/* Épaisseur du dessus — cire fondue */}
        <ellipse cx="35" cy="90" rx="13" ry="4.5" fill="#F0E0C8"/>
        <ellipse cx="35" cy="89" rx="11" ry="3.5" fill="#F8F0E0"/>
        {/* Mare de cire fondue autour de la mèche */}
        <ellipse cx="35" cy="89" rx="6" ry="2" fill="#EDE0C8"/>
        {/* Coulures de cire sur le côté */}
        <path d="M24 100 Q22 108 23 118 Q22 124 24 126" fill="none" stroke="#F0E4D0" strokeWidth="2.5" strokeLinecap="round"/>
        <path d="M46 96 Q48 106 47 112" fill="none" stroke="#F0E4D0" strokeWidth="2" strokeLinecap="round"/>
        {/* Ombre bas cire */}
        <ellipse cx="35" cy="134" rx="13.5" ry="3" fill="rgba(0,0,0,0.04)"/>

        {/* === MÈCHE === */}
        <path d="M34 90 Q34.5 78 35 72 Q35.5 78 36 90" fill="#2a2a2a" stroke="#222" strokeWidth="0.5"/>
        {/* Bout carbonisé */}
        <circle cx="35" cy="72" r="1.5" fill="#1a1a1a"/>

        {/* === FLAMME — 3 couches, grande et ample, toujours animée === */}
        {/* Couche externe — orange/rouge, la plus grande */}
        <motion.path fill="#D45010" opacity="0.7"
          animate={{ d: [
            'M26 72 Q30 38 35 28 Q40 38 44 72 Q35 76 26 72',
            'M27 72 Q28 35 35 24 Q42 35 43 72 Q35 76 27 72',
            'M26 72 Q32 40 35 30 Q38 40 44 72 Q35 76 26 72',
            'M28 72 Q30 36 35 26 Q40 36 42 72 Q35 76 28 72',
            'M26 72 Q30 38 35 28 Q40 38 44 72 Q35 76 26 72',
          ] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}/>
        {/* Couche milieu — orange vif */}
        <motion.path fill="#F08020" opacity="0.85"
          animate={{ d: [
            'M28 72 Q31 44 35 34 Q39 44 42 72 Q35 74 28 72',
            'M29 72 Q30 40 35 30 Q40 40 41 72 Q35 74 29 72',
            'M28 72 Q33 46 35 36 Q37 46 42 72 Q35 74 28 72',
            'M30 72 Q31 42 35 32 Q39 42 40 72 Q35 74 30 72',
            'M28 72 Q31 44 35 34 Q39 44 42 72 Q35 74 28 72',
          ] }}
          transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}/>
        {/* Couche interne — jaune brillant */}
        <motion.path fill="#FFD040" opacity="0.9"
          animate={{ d: [
            'M31 72 Q33 52 35 42 Q37 52 39 72 Q35 73 31 72',
            'M32 72 Q32 48 35 38 Q38 48 38 72 Q35 73 32 72',
            'M31 72 Q34 54 35 44 Q36 54 39 72 Q35 73 31 72',
            'M32 72 Q33 50 35 40 Q37 50 38 72 Q35 73 32 72',
            'M31 72 Q33 52 35 42 Q37 52 39 72 Q35 73 31 72',
          ] }}
          transition={{ duration: 1.2, repeat: Infinity, ease: 'easeInOut' }}/>
        {/* Coeur blanc chaud */}
        <motion.ellipse cx="35" cy="68" fill="#FFF8E0" opacity="0.7"
          animate={{ ry: [3, 5, 3.5, 4.5, 3], rx: [2, 3, 2.5, 2.8, 2] }}
          transition={{ duration: 1, repeat: Infinity, ease: 'easeInOut' }}/>
        {/* Point incandescent */}
        <motion.circle cx="35" cy="72" fill="#FFFFFF" opacity="0.5"
          animate={{ r: [1.5, 2.5, 1.8, 2.2, 1.5] }}
          transition={{ duration: 0.8, repeat: Infinity }}/>
      </svg>
    </div>
  );
}

// CHAPEAU INDIANA JONES — fedora avec profondeur, calotte haute, bord large
export function IndianaHat({ dvdHovered=false }:{dvdHovered?:boolean}) {
  return (
    <D w={70} h={60} dvdHovered={dvdHovered} anim={{ rotate: -5, y: -3 }}>
      <svg viewBox="0 0 120 90" style={{width:'100%',height:'100%'}}>
        <defs>
          <linearGradient id="ih1" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#B07848"/><stop offset="40%" stopColor="#987040"/><stop offset="100%" stopColor="#7A5430"/>
          </linearGradient>
          <linearGradient id="ih2" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#A06838"/><stop offset="100%" stopColor="#6A4420"/>
          </linearGradient>
          <linearGradient id="ihB" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#8B5A3C"/><stop offset="100%" stopColor="#6B4226"/>
          </linearGradient>
        </defs>

        {/* Ombre sous le chapeau */}
        <ellipse cx="60" cy="82" rx="50" ry="6" fill="rgba(0,0,0,0.06)"/>

        {/* === BORD — large, légèrement ondulé, avec épaisseur === */}
        {/* Dessous du bord (ombre profonde) */}
        <ellipse cx="60" cy="72" rx="52" ry="14" fill="#4A2E14"/>
        {/* Épaisseur du bord — la tranche visible */}
        <path d="M8 68 Q8 74 60 78 Q112 74 112 68" fill="#5C3A1E"/>
        {/* Surface du bord */}
        <ellipse cx="60" cy="66" rx="52" ry="14" fill="url(#ihB)"/>
        {/* Bord légèrement relevé à droite (ondulation) */}
        <path d="M95 68 Q105 62 112 66" fill="#9B6840"/>
        {/* Reflet sur le bord gauche */}
        <ellipse cx="35" cy="64" rx="20" ry="5" fill="rgba(255,255,255,0.05)" transform="rotate(-5,35,64)"/>
        {/* Contour du bord */}
        <ellipse cx="60" cy="66" rx="52" ry="14" fill="none" stroke="rgba(80,50,25,0.3)" strokeWidth="0.8"/>

        {/* === CALOTTE — haute, avec pinch profond === */}
        {/* Ombre intérieure visible (on voit l'intérieur du chapeau) */}
        <ellipse cx="60" cy="66" rx="28" ry="8" fill="#3E2410"/>

        {/* Paroi arrière de la calotte */}
        <path d="M32 66 Q30 38 38 24 Q48 14 60 12 Q72 14 82 24 Q90 38 88 66 Z" fill="url(#ih2)"/>
        {/* Paroi avant — plus claire (lumière) */}
        <path d="M34 66 Q32 40 40 26 Q50 16 60 14 Q70 16 80 26 Q88 40 86 66 Z" fill="url(#ih1)"/>

        {/* Pinch/crease profond — le creux au sommet */}
        <path d="M42 28 Q50 18 60 15 Q70 18 78 28" fill="none" stroke="rgba(60,30,10,0.4)" strokeWidth="2"/>
        <path d="M44 30 Q52 20 60 17 Q68 20 76 30" fill="none" stroke="rgba(60,30,10,0.25)" strokeWidth="1.5"/>
        {/* Creux central du pinch */}
        <path d="M48 26 Q54 20 60 18 Q66 20 72 26 L70 30 Q64 24 60 22 Q56 24 50 30 Z" fill="rgba(80,45,20,0.2)"/>

        {/* Ombre sous la calotte sur le bord */}
        <path d="M32 66 Q60 60 88 66" fill="none" stroke="rgba(0,0,0,0.12)" strokeWidth="3"/>

        {/* Reflet lumière sur la calotte droite */}
        <path d="M68 30 Q78 40 82 58" fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth="4"/>

        {/* === BANDEAU — cuir foncé autour de la base de la calotte === */}
        <path d="M32 60 Q32 56 60 53 Q88 56 88 60 Q88 64 60 67 Q32 64 32 60 Z" fill="#4A2E14"/>
        {/* Texture bandeau — reflet */}
        <path d="M36 57 Q60 54 84 57" fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="0.8"/>
        {/* Couture */}
        <path d="M36 62 Q60 65 84 62" fill="none" stroke="rgba(255,255,255,0.04)" strokeWidth="0.5" strokeDasharray="3,2"/>
        {/* Noeud/boucle du bandeau */}
        <rect x="78" y="57" width="6" height="7" rx="1.5" fill="#3E2410"/>
        <rect x="79" y="58" width="4" height="5" rx="1" fill="#4A2E14"/>
      </svg>
    </D>
  );
}

// AMBRE MOUSTIQUE — résine dorée avec insecte piégé
export function AmberMosquito({ dvdHovered=false }:{dvdHovered?:boolean}) {
  return (
    <D w={38} h={60} dvdHovered={dvdHovered} anim={{ scale: 1.1, filter: 'brightness(1.15) saturate(1.2)' }}>
      <svg viewBox="0 0 38 60" style={{width:'100%',height:'100%'}}>
        <defs>
          <radialGradient id="ag" cx="40%" cy="35%" r="55%"><stop offset="0%" stopColor="rgba(240,200,80,0.55)"/><stop offset="100%" stopColor="rgba(180,130,30,0.35)"/></radialGradient>
        </defs>
        <ellipse cx="19" cy="30" rx="15" ry="23" fill="url(#ag)"/>
        <ellipse cx="19" cy="30" rx="15" ry="23" fill="none" stroke="#B08820" strokeWidth="1"/>
        {/* Reflet */}
        <ellipse cx="14" cy="22" rx="4" ry="7" fill="rgba(255,255,255,0.12)" transform="rotate(-15,14,22)"/>
        {/* Moustique */}
        <ellipse cx="19" cy="30" rx="2.5" ry="4.5" fill="rgba(40,30,20,0.35)"/>
        <circle cx="19" cy="24" r="1.5" fill="rgba(40,30,20,0.3)"/>
        <line x1="19" y1="22" x2="19" y2="35" stroke="rgba(40,30,20,0.3)" strokeWidth="0.6"/>
        {/* Pattes */}
        <line x1="17" y1="27" x2="12" y2="23" stroke="rgba(40,30,20,0.25)" strokeWidth="0.5"/><line x1="21" y1="27" x2="26" y2="23" stroke="rgba(40,30,20,0.25)" strokeWidth="0.5"/>
        <line x1="17" y1="30" x2="13" y2="30" stroke="rgba(40,30,20,0.25)" strokeWidth="0.5"/><line x1="21" y1="30" x2="25" y2="30" stroke="rgba(40,30,20,0.25)" strokeWidth="0.5"/>
        <line x1="17" y1="33" x2="12" y2="37" stroke="rgba(40,30,20,0.25)" strokeWidth="0.5"/><line x1="21" y1="33" x2="26" y2="37" stroke="rgba(40,30,20,0.25)" strokeWidth="0.5"/>
        {/* Ailes */}
        <ellipse cx="15" cy="26" rx="4" ry="2" fill="rgba(255,255,255,0.12)" transform="rotate(-25,15,26)"/>
        <ellipse cx="23" cy="26" rx="4" ry="2" fill="rgba(255,255,255,0.12)" transform="rotate(25,23,26)"/>
      </svg>
    </D>
  );
}

// MAIN LA CHOSE (Mercredi Addams) — main coupée debout sur ses doigts
export function ThingHand({ dvdHovered=false }:{dvdHovered?:boolean}) {
  return (
    <D w={70} h={120} dvdHovered={dvdHovered} anim={{ y: [0, -6, 0, -4, 0] }}>
      <svg viewBox="0 0 130 210" style={{width:'100%',height:'100%'}}>
        <defs>
          <linearGradient id="sk" x1="0.2" y1="0" x2="0.8" y2="1">
            <stop offset="0%" stopColor="#CDBAA8"/><stop offset="30%" stopColor="#C0AE98"/><stop offset="60%" stopColor="#B8A48E"/><stop offset="100%" stopColor="#A89478"/>
          </linearGradient>
          <linearGradient id="skS" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#B09880"/><stop offset="40%" stopColor="#CDBAA8"/><stop offset="60%" stopColor="#CDBAA8"/><stop offset="100%" stopColor="#B09880"/>
          </linearGradient>
          <radialGradient id="fl" cx="50%" cy="40%" r="50%">
            <stop offset="0%" stopColor="#D0A090"/><stop offset="100%" stopColor="#B08070"/>
          </radialGradient>
        </defs>

        <ellipse cx="65" cy="205" rx="42" ry="5" fill="rgba(0,0,0,0.07)"/>

        {/* === POIGNET === */}
        <path d="M34 25 Q32 40 32 55 Q32 68 38 74 L92 74 Q98 68 98 55 Q98 40 96 25 Z" fill="url(#skS)"/>
        <path d="M36 28 Q34 42 34 55 Q34 66 38 72" fill="none" stroke="rgba(0,0,0,0.05)" strokeWidth="3"/>
        <path d="M94 28 Q96 42 96 55 Q96 66 92 72" fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="3"/>
        <ellipse cx="65" cy="25" rx="30" ry="11" fill="#C0A090"/>
        <ellipse cx="65" cy="25" rx="24" ry="8" fill="url(#fl)"/>
        <ellipse cx="65" cy="25" rx="16" ry="4.5" fill="#D0A898"/>

        {/* Coutures */}
        <path d="M40 48 Q65 45 90 48" fill="none" stroke="#3E3028" strokeWidth="1.2"/>
        {[44,52,60,68,76,84].map((x,i)=>(<g key={i}><line x1={x-2} y1={44} x2={x+2} y2={52} stroke="#3E3028" strokeWidth="0.8"/><line x1={x+2} y1={44} x2={x-2} y2={52} stroke="#3E3028" strokeWidth="0.8"/></g>))}
        <path d="M65 25 Q64 48 62 74" fill="none" stroke="#3E3028" strokeWidth="0.8"/>
        {[30,37,44,51,58,65].map((y,i)=>(<line key={`v${i}`} x1="61" y1={y} x2="67" y2={y} stroke="#3E3028" strokeWidth="0.6"/>))}
        <path d="M42 58 Q65 62 88 60" fill="none" stroke="#3E3028" strokeWidth="0.7"/>
        <line x1="50" y1="54" x2="52" y2="62" stroke="rgba(160,50,50,0.2)" strokeWidth="1" strokeLinecap="round"/>

        {/* === PAUME — forme organique volumineuse === */}
        <path d="M30 74 Q22 86 20 104 Q20 120 30 128 Q34 132 40 134 L90 134 Q96 132 100 128 Q110 120 110 104 Q108 86 100 74 Z" fill="url(#sk)"/>
        {/* Ombre gauche (profondeur) */}
        <path d="M24 84 Q22 96 22 108 Q22 120 30 128" fill="none" stroke="rgba(0,0,0,0.06)" strokeWidth="4"/>
        {/* Lumière droite */}
        <path d="M106 84 Q108 96 108 108 Q108 120 100 128" fill="none" stroke="rgba(255,255,255,0.07)" strokeWidth="4"/>
        {/* Bosses des jointures — cercles charnus */}
        <ellipse cx="40" cy="130" rx="7" ry="5" fill="rgba(190,170,150,0.3)"/>
        <ellipse cx="56" cy="132" rx="7" ry="5" fill="rgba(190,170,150,0.3)"/>
        <ellipse cx="72" cy="132" rx="7" ry="5" fill="rgba(190,170,150,0.3)"/>
        <ellipse cx="88" cy="130" rx="7" ry="5" fill="rgba(190,170,150,0.3)"/>
        {/* Tendons subtils */}
        <path d="M44 80 Q42 100 40 125" fill="none" stroke="rgba(0,0,0,0.03)" strokeWidth="2"/>
        <path d="M60 78 Q58 100 56 125" fill="none" stroke="rgba(0,0,0,0.03)" strokeWidth="2"/>
        <path d="M75 78 Q74 100 72 125" fill="none" stroke="rgba(0,0,0,0.03)" strokeWidth="2"/>
        <path d="M88 80 Q87 100 86 125" fill="none" stroke="rgba(0,0,0,0.03)" strokeWidth="2"/>
        {/* Veines */}
        <path d="M50 60 Q48 82 46 105" fill="none" stroke="rgba(70,85,110,0.06)" strokeWidth="1.2"/>
        <path d="M76 58 Q78 80 80 102" fill="none" stroke="rgba(70,85,110,0.05)" strokeWidth="1"/>

        {/* === INDEX — doigt charnu, forme fermée, courbé === */}
        <path d="M32 130 Q24 140 18 154 Q12 168 14 180 Q16 190 22 196 Q26 198 28 196 Q32 190 30 178 Q30 166 34 152 Q38 140 40 132 Z" fill="url(#sk)" stroke="#A89478" strokeWidth="0.6"/>
        {/* Phalanges */}
        <path d="M20 155 Q26 152 32 155" fill="none" stroke="rgba(80,60,40,0.12)" strokeWidth="1"/>
        <path d="M16 174 Q22 171 28 174" fill="none" stroke="rgba(80,60,40,0.1)" strokeWidth="0.8"/>
        {/* Ongle */}
        <path d="M18 190 Q20 184 26 184 Q28 190 24 198 Q20 198 18 190 Z" fill="#C0B0A0" stroke="#A09080" strokeWidth="0.6"/>
        <path d="M20 186 Q22 185 24 186" fill="rgba(255,255,255,0.2)"/>

        {/* === MAJEUR — le plus long === */}
        <path d="M46 132 Q38 146 34 164 Q32 180 34 192 Q36 200 40 204 Q44 206 46 204 Q50 198 48 186 Q48 172 50 156 Q54 142 56 134 Z" fill="url(#sk)" stroke="#A89478" strokeWidth="0.6"/>
        <path d="M38 156 Q44 153 50 156" fill="none" stroke="rgba(80,60,40,0.12)" strokeWidth="1"/>
        <path d="M36 178 Q42 175 48 178" fill="none" stroke="rgba(80,60,40,0.1)" strokeWidth="0.8"/>
        <path d="M36 196 Q39 190 45 190 Q47 196 43 204 Q38 204 36 196 Z" fill="#C0B0A0" stroke="#A09080" strokeWidth="0.6"/>
        <path d="M38 192 Q41 191 44 192" fill="rgba(255,255,255,0.2)"/>

        {/* === ANNULAIRE === */}
        <path d="M64 134 Q70 146 76 164 Q80 180 78 192 Q76 200 72 204 Q68 206 66 204 Q62 198 64 186 Q64 172 62 156 Q58 142 56 134 Z" fill="url(#sk)" stroke="#A89478" strokeWidth="0.6"/>
        <path d="M68 156 Q74 153 80 156" fill="none" stroke="rgba(80,60,40,0.12)" strokeWidth="1"/>
        <path d="M70 178 Q76 175 82 178" fill="none" stroke="rgba(80,60,40,0.1)" strokeWidth="0.8"/>
        <path d="M70 196 Q73 190 79 190 Q81 196 77 204 Q72 204 70 196 Z" fill="#C0B0A0" stroke="#A09080" strokeWidth="0.6"/>
        <path d="M72 192 Q75 191 78 192" fill="rgba(255,255,255,0.2)"/>

        {/* === AURICULAIRE === */}
        <path d="M88 130 Q96 140 102 152 Q108 164 106 176 Q104 184 100 188 Q96 190 94 188 Q90 182 92 172 Q94 160 90 148 Q86 138 84 132 Z" fill="url(#sk)" stroke="#A89478" strokeWidth="0.6"/>
        <path d="M96 150 Q102 148 106 151" fill="none" stroke="rgba(80,60,40,0.1)" strokeWidth="0.8"/>
        <path d="M98 168 Q104 166 108 169" fill="none" stroke="rgba(80,60,40,0.08)" strokeWidth="0.7"/>
        <path d="M98 182 Q101 178 106 178 Q108 182 104 190 Q100 190 98 182 Z" fill="#C0B0A0" stroke="#A09080" strokeWidth="0.6"/>

        {/* === POUCE — charnu, écarté === */}
        <path d="M30 98 Q18 106 10 122 Q4 138 6 150 Q8 158 14 162 Q18 164 20 162 Q24 156 20 144 Q18 132 22 118 Q26 108 32 100 Z" fill="url(#sk)" stroke="#A89478" strokeWidth="0.8"/>
        {/* Volume pouce */}
        <path d="M16 118 Q14 130 14 142" fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth="2.5"/>
        <path d="M24 112 Q22 124 20 136" fill="none" stroke="rgba(0,0,0,0.04)" strokeWidth="2"/>
        {/* Pli pouce */}
        <path d="M14 132 Q18 130 22 132" fill="none" stroke="rgba(80,60,40,0.1)" strokeWidth="0.8"/>
        {/* Ongle pouce */}
        <path d="M10 154 Q13 148 19 148 Q21 154 17 162 Q12 162 10 154 Z" fill="#C0B0A0" stroke="#A09080" strokeWidth="0.6"/>
        <path d="M12 150 Q15 149 18 150" fill="rgba(255,255,255,0.2)"/>
      </svg>
    </D>
  );
}

// TASSE CAFÉ — porcelaine avec vapeur
export function CoffeeMug({ dvdHovered=false }:{dvdHovered?:boolean}) {
  return (
    <div style={{ width: 38, height: 60, flexShrink: 0, overflow: 'visible' }}>
      <svg viewBox="0 0 38 60" style={{width:'100%',height:'100%',overflow:'visible'}}>
        <defs>
          <linearGradient id="mg" x1="0" y1="0" x2="1" y2="0"><stop offset="0%" stopColor="#E8E4DE"/><stop offset="50%" stopColor="#F8F5F0"/><stop offset="100%" stopColor="#E8E4DE"/></linearGradient>
        </defs>
        {/* Ombre */}
        <ellipse cx="16" cy="54" rx="14" ry="2.5" fill="rgba(0,0,0,0.04)"/>
        {/* Corps mug */}
        <rect x="4" y="20" width="24" height="32" rx="4" fill="url(#mg)"/>
        <rect x="4" y="20" width="24" height="5" rx="3" fill="#EDE8E0"/>
        {/* Anse */}
        <path d="M28 28 Q36 28 36 36 Q36 44 28 44" fill="none" stroke="#E0DAD0" strokeWidth="3.5"/>
        <path d="M28 28 Q36 28 36 36 Q36 44 28 44" fill="none" stroke="#EDE8E0" strokeWidth="2"/>
        {/* Café visible */}
        <ellipse cx="16" cy="22" rx="10" ry="3" fill="#3C2415"/>
        <ellipse cx="16" cy="22" rx="8" ry="2" fill="#4A3020"/>
        {/* Coeur */}
        <path d="M14 34 Q14 30 16 32 Q18 30 18 34 L16 38 Z" fill="#c41e3a" opacity="0.15"/>
        {/* Vapeur — animée au hover */}
        <motion.path d="M10 18 Q11.5 10 13 18" stroke="rgba(160,155,145,0.3)" strokeWidth="1.2" fill="none" strokeLinecap="round"
          animate={dvdHovered ? { y: [0, -8, 0], opacity: [0.2, 0.5, 0.2] } : { y: 0, opacity: 0.15 }}
          transition={{ duration: 2, repeat: dvdHovered ? Infinity : 0 }}/>
        <motion.path d="M17 18 Q18.5 8 20 18" stroke="rgba(160,155,145,0.25)" strokeWidth="1.2" fill="none" strokeLinecap="round"
          animate={dvdHovered ? { y: [0, -10, 0], opacity: [0.15, 0.4, 0.15] } : { y: 0, opacity: 0.1 }}
          transition={{ duration: 2.5, repeat: dvdHovered ? Infinity : 0, delay: 0.3 }}/>
      </svg>
    </div>
  );
}

// ORIGAMI LICORNE — papier plié géométrique avec ombres
export function OrigamiUnicorn({ dvdHovered=false }:{dvdHovered?:boolean}) {
  return (
    <D w={42} h={50} dvdHovered={dvdHovered} anim={{ rotateY: 20, scale: 1.06 }}>
      <svg viewBox="0 0 42 50" style={{width:'100%',height:'100%'}}>
        {/* Face principale */}
        <polygon points="21,3 4,38 21,30 38,38" fill="#F0EBE0" stroke="#C8C0B0" strokeWidth="0.6"/>
        {/* Aile gauche */}
        <polygon points="21,30 4,38 14,47" fill="#E4DDD0" stroke="#C8C0B0" strokeWidth="0.5"/>
        {/* Aile droite */}
        <polygon points="21,30 38,38 30,47" fill="#D8D0C2" stroke="#C8C0B0" strokeWidth="0.5"/>
        {/* Plis internes */}
        <line x1="21" y1="3" x2="21" y2="30" stroke="#C8C0B0" strokeWidth="0.4"/>
        <line x1="13" y1="20" x2="21" y2="30" stroke="#D0C8B8" strokeWidth="0.3"/>
        <line x1="29" y1="20" x2="21" y2="30" stroke="#D0C8B8" strokeWidth="0.3"/>
        <line x1="4" y1="38" x2="21" y2="30" stroke="#C8C0B0" strokeWidth="0.3"/>
        <line x1="38" y1="38" x2="21" y2="30" stroke="#C8C0B0" strokeWidth="0.3"/>
        {/* Corne */}
        <polygon points="21,3 18,10 24,10" fill="#E4DDD0" stroke="#B8B0A0" strokeWidth="0.5"/>
        {/* Ombre portée */}
        <polygon points="21,30 13,38 21,42 29,38" fill="rgba(0,0,0,0.04)"/>
      </svg>
    </D>
  );
}

export const SHELF_OBJECTS = [
  MiniOscar, BookStack, Popcorn, Hourglass, InceptionTop,
  CrystalBall, ScentedCandle, IndianaHat, AmberMosquito,
  CoffeeMug, OrigamiUnicorn,
];
