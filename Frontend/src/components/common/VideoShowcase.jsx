import { useRef, useState } from "react";
import useInView from "../../hooks/useInView";

const TEAL = "#20b2aa";
const CARD_SHADOW = "0px 1px 8px 0px rgba(102,102,102,0.24)";

export default function VideoShowcase({ title, src, poster, fullWidth = false, heightClass = "h-[320px] md:h-[480px]", autoPlay = false }) {
  const [playing, setPlaying] = useState(autoPlay);
  const [ref, inView] = useInView(0.1);
  const videoRef = useRef(null);

  const handlePlay = () => {
    setPlaying(true);
    videoRef.current?.play();
  };

  const player = (
    <div
      className={`relative overflow-hidden transition-all duration-700 ${fullWidth ? "" : "rounded-lg"}`}
      style={{ boxShadow: fullWidth ? "none" : CARD_SHADOW, opacity: inView ? 1 : 0, transform: inView ? "translateY(0)" : "translateY(16px)" }}
    >
      <video
        ref={videoRef}
        src={src}
        poster={poster}
        controls={!autoPlay && playing}
        autoPlay={autoPlay}
        muted={autoPlay}
        loop={autoPlay}
        playsInline
        className={`w-full ${heightClass} object-cover bg-black`}
      />
      {!autoPlay && !playing && (
        <button
          type="button"
          onClick={handlePlay}
          aria-label="Play video"
          className="absolute inset-0 flex items-center justify-center bg-black/30 hover:bg-black/40 transition-colors"
        >
          <div className="w-16 h-16 md:w-20 md:h-20 rounded-full bg-white flex items-center justify-center">
            <svg className="w-6 h-6 md:w-8 md:h-8 ml-1" fill={TEAL} viewBox="0 0 24 24">
              <path d="M8 5v14l11-7z" />
            </svg>
          </div>
        </button>
      )}
    </div>
  );

  if (fullWidth) {
    return (
      <section className="bg-[#f1f1f1] py-14">
        {title && (
          <h2
            ref={ref}
            className="text-[28px] leading-[36px] md:text-[36px] md:leading-[44px] font-bold text-gray-900 text-center mb-10 px-4 transition-all duration-700"
            style={{ opacity: inView ? 1 : 0, transform: inView ? "translateY(0)" : "translateY(16px)" }}
          >
            {title}
          </h2>
        )}
        {player}
      </section>
    );
  }

  return (
    <section className="bg-[#f1f1f1] py-14">
      <div ref={ref} className="max-w-[1220px] mx-auto px-4 sm:px-6">
        <h2
          className="text-[28px] leading-[36px] md:text-[36px] md:leading-[44px] font-bold text-gray-900 text-center mb-10 transition-all duration-700"
          style={{ opacity: inView ? 1 : 0, transform: inView ? "translateY(0)" : "translateY(16px)" }}
        >
          {title}
        </h2>
        {player}
      </div>
    </section>
  );
}
