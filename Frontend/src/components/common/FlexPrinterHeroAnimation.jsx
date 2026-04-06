import React from 'react';

function FlexPrinterHeroAnimation() {
  return (
    <div className="w-full" aria-label="Animated flex printing machine" role="img">
      <svg viewBox="0 0 640 360" className="h-auto w-full" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="machineBody" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#dbe3ee" />
            <stop offset="45%" stopColor="#a8b6c7" />
            <stop offset="100%" stopColor="#6f8198" />
          </linearGradient>
          <linearGradient id="machineDark" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#2a3a4c" />
            <stop offset="100%" stopColor="#172231" />
          </linearGradient>
          <linearGradient id="bannerPaper" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#f8fafc" />
            <stop offset="100%" stopColor="#e2e8f0" />
          </linearGradient>
          <linearGradient id="brandStripe" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#0ea5e9" />
            <stop offset="50%" stopColor="#10b981" />
            <stop offset="100%" stopColor="#f59e0b" />
          </linearGradient>
          <pattern id="bannerPattern" width="160" height="90" patternUnits="userSpaceOnUse">
            <rect width="160" height="90" fill="url(#bannerPaper)" />
            <rect x="16" y="12" width="128" height="18" rx="9" fill="#ef4444" opacity="0.92" />
            <rect x="16" y="38" width="102" height="12" rx="6" fill="#06b6d4" opacity="0.9" />
            <rect x="16" y="56" width="136" height="12" rx="6" fill="#22c55e" opacity="0.88" />
            <rect x="16" y="74" width="88" height="8" rx="4" fill="#f59e0b" opacity="0.9" />
            <animateTransform
              attributeName="patternTransform"
              type="translate"
              from="0 0"
              to="0 90"
              dur="2.4s"
              repeatCount="indefinite"
            />
          </pattern>
          <filter id="shadow" x="-25%" y="-25%" width="150%" height="170%">
            <feDropShadow dx="0" dy="8" stdDeviation="8" floodColor="#0f172a" floodOpacity="0.25" />
          </filter>
        </defs>

        <rect x="0" y="0" width="640" height="360" fill="transparent" />
        <ellipse cx="320" cy="320" rx="250" ry="18" fill="#0f172a" opacity="0.14" />

        <g filter="url(#shadow)">
          <rect x="78" y="88" width="484" height="172" rx="26" fill="url(#machineBody)" />
          <rect x="78" y="88" width="484" height="34" rx="26" fill="#ebf1f7" />
          <rect x="102" y="130" width="284" height="76" rx="12" fill="url(#machineDark)" />
          <rect x="116" y="144" width="172" height="18" rx="9" fill="url(#brandStripe)" />
          <rect x="116" y="170" width="126" height="10" rx="5" fill="#9dd7ef" opacity="0.95" />

          <rect x="414" y="130" width="124" height="76" rx="12" fill="#3a4b60" />
          <circle cx="438" cy="152" r="9" fill="#ef4444" />
          <circle cx="468" cy="152" r="9" fill="#f59e0b" />
          <circle cx="498" cy="152" r="9" fill="#22c55e" />
          <rect x="428" y="172" width="92" height="12" rx="6" fill="#9fb1c7" />

          <rect x="100" y="220" width="438" height="24" rx="10" fill="#111827" />
          <circle cx="128" cy="232" r="9" fill="#374151" />
          <circle cx="510" cy="232" r="9" fill="#374151" />

          <rect x="92" y="244" width="454" height="26" rx="12" fill="#4a5c72" />
          <rect x="108" y="252" width="422" height="10" rx="5" fill="#70849d" />

          <rect x="90" y="270" width="54" height="28" rx="8" fill="#2c3d51" />
          <rect x="496" y="270" width="54" height="28" rx="8" fill="#2c3d51" />
        </g>

        <g>
          <rect x="154" y="250" width="332" height="96" rx="8" fill="url(#bannerPattern)" stroke="#cbd5e1" strokeWidth="2" />
          <rect x="152" y="248" width="336" height="7" rx="3.5" fill="#64748b" />

          <g>
            <circle cx="154" cy="247" r="11" fill="#243244" />
            <circle cx="154" cy="247" r="4" fill="#94a3b8" />
            <animateTransform
              attributeName="transform"
              type="rotate"
              from="0 154 247"
              to="360 154 247"
              dur="1.2s"
              repeatCount="indefinite"
            />
          </g>
          <g>
            <circle cx="486" cy="247" r="11" fill="#243244" />
            <circle cx="486" cy="247" r="4" fill="#94a3b8" />
            <animateTransform
              attributeName="transform"
              type="rotate"
              from="0 486 247"
              to="360 486 247"
              dur="1.2s"
              repeatCount="indefinite"
            />
          </g>
        </g>

        <g transform="translate(138 206)">
          <g>
            <rect x="0" y="0" width="140" height="22" rx="8" fill="#0b1220" />
            <rect x="10" y="6" width="120" height="10" rx="5" fill="#3b82f6" opacity="0.9" />
          </g>
          <animateTransform
            attributeName="transform"
            type="translate"
            values="138 206; 350 206; 138 206"
            keyTimes="0;0.5;1"
            dur="3.6s"
            repeatCount="indefinite"
          />
        </g>
      </svg>
    </div>
  );
}

export default FlexPrinterHeroAnimation;
