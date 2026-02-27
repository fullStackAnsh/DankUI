export default function Loading() {
  const text = "dankURLs".split("");

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-[#0F0F14] px-6">
      <div className="text-center">
        <h1 className="flex items-center justify-center gap-1 text-4xl sm:text-5xl font-extrabold tracking-tight">
          {text.map((char, index) => (
            <span
              key={index}
              className="inline-block text-[#F5F5F7]"
              style={{
                animation: "bounceLetter 0.8s ease-in-out infinite",
                animationDelay: `${index * 0.1}s`,
              }}
            >
              {char}
            </span>
          ))}
        </h1>

        <p className="mt-4 text-sm text-[#9CA3AF] font-medium tracking-wide">
          Chaos deploying...
        </p>
      </div>

      {/* Custom Animation Styles */}
      <style>
        {`
          @keyframes bounceLetter {
            0%, 100% {
              transform: translateY(0px);
              text-shadow: 0 0 0px #39FF14;
            }
            50% {
              transform: translateY(-10px);
              text-shadow: 0 0 12px #39FF14;
            }
          }
        `}
      </style>
    </div>
  );
}