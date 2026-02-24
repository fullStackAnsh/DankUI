import { useEffect, useState } from "react";
import { Toaster } from "react-hot-toast";
import toast from "react-hot-toast";

export default function DankURLs() {
  const [inputUrl, setInputUrl] = useState("");
  const [outputUrl, setOutputUrl] = useState("");
  const [finalUrl, setFinalUrl] = useState("");
  const [saved, setSaved] = useState(false);

  const BASE_URL = import.meta.env.VITE_BACKEND_URL;

  const generateDankUrl = () => {
    if (!inputUrl) return;
   // const chaos = Math.random().toString(36).substring(2, 8);
    setFinalUrl(`${BASE_URL}/${outputUrl}`);
    setSaved(false);
  };

  const saveToDB = async () => {
    // Replace with real API call
    try{
    const response = await fetch(
        `${BASE_URL}/shorten`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            originalUrl: inputUrl,
            shortUrl: outputUrl
          }),
        }
      );

      const data = await response.json();
      if (!response.ok) {
      // Backend returned error (like URL exists)
      toast.error(data.message || "Something went wrong");
      return;
    }

    toast.success(data.message || "URL created successfully");
    setSaved(true);
    console.log(data)
    } catch (err) {
      setError("Failed to create url");
    } 
  };

  return (
    <>
     <Toaster position="top-center" />
    <div className="min-h-screen bg-[#0F0F14] text-[#F5F5F7] flex items-center justify-center px-6 py-12">
      <div className="w-full max-w-3xl">
        
        {/* Heading */}
        <h1 className="text-3xl sm:text-4xl font-extrabold mb-10 text-center tracking-tight">
          DankURLs —
          <span className="text-[#39FF14]"> Turn boring urls into chaos</span>
        </h1>

        {/* Card */}
        <div className="bg-[#18181F] rounded-[20px] p-6 sm:p-10 border border-[#2A2A33] shadow-[0_0_30px_rgba(57,255,20,0.05)] transition-all duration-300">

          {/* Input */}
          <div className="mb-6">
            <label className="block text-sm mb-2 text-[#9CA3AF]">
              Paste your boring URL
            </label>
            <input
              type="text"
              value={inputUrl}
              onChange={(e) => setInputUrl(e.target.value)}
              placeholder="https://example.com/very-long-corporate-link"
              className="w-full bg-[#111118] border border-[#2A2A33] rounded-xl px-4 py-3 text-sm font-mono focus:outline-none focus:ring-2 focus:ring-[#39FF14] transition-all duration-300"
            />
          </div>

           {/* Input */}
          <div className="mb-6">
            <label className="block text-sm mb-2 text-[#9CA3AF]">
              Your Dank URL
            </label>
            <input
              type="text"
              value={outputUrl}
              onChange={(e) => setOutputUrl(e.target.value)}
              placeholder="New Short URL"
              className="w-full bg-[#111118] border border-[#2A2A33] rounded-xl px-4 py-3 text-sm font-mono focus:outline-none focus:ring-2 focus:ring-[#39FF14] transition-all duration-300"
            />
          </div>

          {/* Generate Button */}
          <button
            onClick={generateDankUrl}
            className="w-full mb-8 py-3 rounded-xl font-semibold text-black bg-gradient-to-r from-[#39FF14] to-[#2fff00] hover:scale-[1.02] transition-all duration-300"
          >
            Generate Chaos
          </button>

          {/* Output */}
          {finalUrl && (
            <div className="mb-6">
              <label className="block text-sm mb-2 text-[#9CA3AF]">
                Your chaotic URL (editable)
              </label>
              <input
                type="text"
                value={finalUrl}
                onChange={(e) => setFinalUrl(e.target.value)}
                className="w-full bg-[#111118] border border-[#2A2A33] rounded-xl px-4 py-3 text-sm font-mono focus:outline-none focus:ring-2 focus:ring-[#8B5CF6] transition-all duration-300"
              />
            </div>
          )}

          {/* Save Button */}
          {finalUrl && (
            <button
              onClick={saveToDB}
              className="w-full py-3 rounded-xl font-semibold border border-[#8B5CF6] text-[#8B5CF6] hover:bg-[#8B5CF6]/10 hover:scale-[1.02] transition-all duration-300"
            >
              Save to DB
            </button>
          )}

          {/* Success Feedback */}
          {saved && (
            <p className="text-center mt-6 text-[#39FF14] text-sm font-medium">
              Chaos deployed.
            </p>
          )}
        </div>
      </div>
    </div>
    </>
  );
}