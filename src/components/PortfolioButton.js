import { themes } from '../themes/themes';

export function generateButtonSvg(data) {
  const { text = 'ACCESS PORTFOLIO', themeName = 'royal' } = data;
  const theme = themes[themeName] || themes.royal;
  
  const width = 340;
  const height = 80;
  const accent = theme.accent;
  const textMain = theme.textMain;

  // Angled geometric cyber-frame
  const btnPath = "M 20 5 L 320 5 L 335 20 L 335 60 L 320 75 L 20 75 L 5 60 L 5 20 Z";
  const innerPath = "M 22 8 L 318 8 L 332 22 L 332 58 L 318 72 L 22 72 L 8 58 L 8 22 Z";

  return `
    <svg width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="btn-grad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="${theme.bgStart}"/>
          <stop offset="100%" stop-color="${theme.bgEnd}"/>
        </linearGradient>
        
        <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="4" result="blur" />
          <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
        </filter>
        
        <linearGradient id="sweep" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stop-color="transparent" />
          <stop offset="50%" stop-color="${accent}" stop-opacity="0.4" />
          <stop offset="100%" stop-color="transparent" />
        </linearGradient>
        
        <clipPath id="btn-clip">
          <path d="${innerPath}" />
        </clipPath>
      </defs>

      <style>
        .btn-text { font-family: "Courier New", Courier, monospace; font-weight: bold; font-size: 18px; fill: ${textMain}; letter-spacing: 4px; text-anchor: middle; alignment-baseline: middle; }
        .accent-text { fill: ${accent}; font-weight: 900; }
        
        /* The Animations */
        @keyframes pulse { 0%, 100% { opacity: 0.5; } 50% { opacity: 1; stroke-width: 2.5px; } }
        @keyframes sweep-anim { 0% { transform: translateX(-350px) skewX(-20deg); } 100% { transform: translateX(350px) skewX(-20deg); } }
        @keyframes blink { 0%, 100% { opacity: 1; } 50% { opacity: 0; } }
      </style>

      <path d="${btnPath}" fill="none" stroke="${accent}" stroke-width="2" filter="url(#glow)" style="animation: pulse 2.5s infinite;" />
      <path d="${btnPath}" fill="none" stroke="${accent}" stroke-width="1" />
      
      <path d="${innerPath}" fill="url(#btn-grad)" />
      
      <g clip-path="url(#btn-clip)">
        <g style="animation: sweep-anim 4s linear infinite;">
          <rect x="0" y="-10" width="80" height="100" fill="url(#sweep)" />
        </g>
      </g>

      <text x="170" y="44" class="btn-text">
        <tspan class="accent-text">&gt; </tspan>${text}<tspan class="accent-text"> _</tspan>
      </text>

      <rect x="25" y="5" width="40" height="2" fill="${accent}" />
      <rect x="275" y="73" width="40" height="2" fill="${accent}" />
      
      <circle cx="30" cy="40" r="3.5" fill="${accent}" style="animation: blink 1s infinite;" filter="url(#glow)"/>
    </svg>
  `;
}