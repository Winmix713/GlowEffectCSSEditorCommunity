function Frame() {
  return (
    <div className="absolute h-[505px] left-0 top-0 w-[330px]">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 330 505">
        <g clipPath="url(#clip0_1_237)" id="Frame 1">
          <rect fill="#050505" height="505" style={{ fill: "color(display-p3 0.0196 0.0196 0.0196)", fillOpacity: "1" }} width="330" />
          <g filter="url(#filter0_f_1_237)" id="Ellipse 3">
            <ellipse cx="165" cy="197" fill="var(--fill-0, #F41A1A)" rx="165" ry="158" style={{ fill: "color(display-p3 0.9563 0.1033 0.1033)", fillOpacity: "1" }} />
          </g>
          <g filter="url(#filter1_f_1_237)" id="Ellipse 1">
            <ellipse cx="165" cy="88.5" fill="var(--fill-0, #FFF5BC)" rx="83" ry="49.5" style={{ fill: "color(display-p3 1.0000 0.9609 0.7391)", fillOpacity: "1" }} />
          </g>
          <g filter="url(#filter2_f_1_237)" id="Ellipse 2">
            <ellipse cx="165" cy="138" fill="var(--fill-0, #DCEE56)" rx="138" ry="93" style={{ fill: "color(display-p3 0.8641 0.9317 0.3367)", fillOpacity: "1" }} />
          </g>
        </g>
        <defs>
          <filter colorInterpolationFilters="sRGB" filterUnits="userSpaceOnUse" height="516" id="filter0_f_1_237" width="530" x="-100" y="-61">
            <feFlood floodOpacity="0" result="BackgroundImageFix" />
            <feBlend in="SourceGraphic" in2="BackgroundImageFix" mode="normal" result="shape" />
            <feGaussianBlur result="effect1_foregroundBlur_1_237" stdDeviation="50" />
          </filter>
          <filter colorInterpolationFilters="sRGB" filterUnits="userSpaceOnUse" height="245.6" id="filter1_f_1_237" width="312.6" x="8.7" y="-34.3">
            <feFlood floodOpacity="0" result="BackgroundImageFix" />
            <feBlend in="SourceGraphic" in2="BackgroundImageFix" mode="normal" result="shape" />
            <feGaussianBlur result="effect1_foregroundBlur_1_237" stdDeviation="36.65" />
          </filter>
          <filter colorInterpolationFilters="sRGB" filterUnits="userSpaceOnUse" height="416.2" id="filter2_f_1_237" width="506.2" x="-88.1" y="-70.1">
            <feFlood floodOpacity="0" result="BackgroundImageFix" />
            <feBlend in="SourceGraphic" in2="BackgroundImageFix" mode="normal" result="shape" />
            <feGaussianBlur result="effect1_foregroundBlur_1_237" stdDeviation="57.55" />
          </filter>
          <clipPath id="clip0_1_237">
            <rect fill="white" height="505" style={{ fill: "white", fillOpacity: "1" }} width="330" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function Frame1() {
  return (
    <div className="absolute h-[505px] left-[362px] top-0 w-[330px]">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 330 505">
        <g clipPath="url(#clip0_1_232)" id="Frame 2">
          <rect fill="#F5F5F5" height="505" style={{ fill: "color(display-p3 0.9608 0.9608 0.9608)", fillOpacity: "1" }} width="330" />
          <g filter="url(#filter0_f_1_232)" id="Ellipse 3" opacity="0.7">
            <ellipse cx="165" cy="197" fill="var(--fill-0, white)" rx="165" ry="158" style={{ fill: "white", fillOpacity: "1" }} />
          </g>
          <g filter="url(#filter1_f_1_232)" id="Ellipse 1">
            <ellipse cx="165" cy="88.5" fill="var(--fill-0, #FFF5BC)" rx="83" ry="49.5" style={{ fill: "color(display-p3 1.0000 0.9609 0.7391)", fillOpacity: "1" }} />
          </g>
          <g filter="url(#filter2_f_1_232)" id="Ellipse 2">
            <ellipse cx="165" cy="138" fill="var(--fill-0, #DCEE56)" rx="138" ry="93" style={{ fill: "color(display-p3 0.8641 0.9317 0.3367)", fillOpacity: "1" }} />
          </g>
        </g>
        <defs>
          <filter colorInterpolationFilters="sRGB" filterUnits="userSpaceOnUse" height="516" id="filter0_f_1_232" width="530" x="-100" y="-61">
            <feFlood floodOpacity="0" result="BackgroundImageFix" />
            <feBlend in="SourceGraphic" in2="BackgroundImageFix" mode="normal" result="shape" />
            <feGaussianBlur result="effect1_foregroundBlur_1_232" stdDeviation="50" />
          </filter>
          <filter colorInterpolationFilters="sRGB" filterUnits="userSpaceOnUse" height="245.6" id="filter1_f_1_232" width="312.6" x="8.7" y="-34.3">
            <feFlood floodOpacity="0" result="BackgroundImageFix" />
            <feBlend in="SourceGraphic" in2="BackgroundImageFix" mode="normal" result="shape" />
            <feGaussianBlur result="effect1_foregroundBlur_1_232" stdDeviation="36.65" />
          </filter>
          <filter colorInterpolationFilters="sRGB" filterUnits="userSpaceOnUse" height="416.2" id="filter2_f_1_232" width="506.2" x="-88.1" y="-70.1">
            <feFlood floodOpacity="0" result="BackgroundImageFix" />
            <feBlend in="SourceGraphic" in2="BackgroundImageFix" mode="normal" result="shape" />
            <feGaussianBlur result="effect1_foregroundBlur_1_232" stdDeviation="57.55" />
          </filter>
          <clipPath id="clip0_1_232">
            <rect fill="white" height="505" style={{ fill: "white", fillOpacity: "1" }} width="330" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

export default function Frame2() {
  return (
    <div className="relative size-full">
      <Frame />
      <Frame1 />
    </div>
  );
}