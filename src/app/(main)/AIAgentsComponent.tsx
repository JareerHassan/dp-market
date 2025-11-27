'use client';
// Placeholder URL for the visual workflow screenshot on the right
const WORKFLOW_IMAGE_URL = "https://placehold.co/1000x800/281A3A/FFFFFF/png?text=Visual+Workflow+Canvas+Placeholder";

/**
 * Renders the Agent Control Feature Section based on the provided design.
 * Uses a dark, rich purple background and a distinct orange accent color.
 */
const AgentControlSection: React.FC = () => {
  return (
    // Main container with deep purple background, setting padding and text color
    <div className="min-h-screen py-16 md:py-24 font-inter">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">

        {/* -------------------- 1. HEADER SECTION -------------------- */}
        <header className="text-center mb-20 md:mb-32">
          {/* Accent Question */}
          <h2 className="text-lg font-semibold text-orange-400 mb-4">
            Why build AI Agents with n8n?
          </h2>

          {/* Main Statement */}
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight mb-8 max-w-4xl mx-auto">
            Because the ability to control your agents is more than a 'nice to have'
          </h1>

          {/* Sub-description */}
          <p className="text-lg text-gray-400 max-w-3xl mx-auto">
            n8n's predefined logic, guardrails, monitoring, and hundreds of integrations let you build AI agents that work
            in production as you'd expect.
          </p>
        </header>

        {/* -------------------- 2. FEATURE DETAIL SECTION -------------------- */}
        <div className="flex flex-col lg:flex-row items-center justify-between gap-12 lg:gap-20">
          
          {/* Left Column: Text Content */}
          <div className="lg:w-1/2 text-left space-y-6">
            <h2 className="text-4xl sm:text-5xl font-bold tracking-tight">
              Anchor AI in predictable logic
            </h2>
            <p className="text-gray-300 text-lg leading-relaxed">
              Mix deterministic automation steps with AI to increase reliability. Add human-in-the-loop approval steps when your
              agent's decisions need oversight. Implement error handling and fallback logic in case AI actions don't go as planned.
            </p>
            <p className="text-gray-300 text-lg leading-relaxed">
              Because you'll sleep better knowing your AI will stay within its bounds, and you have a plan B for every unexpected output.
            </p>
          </div>

          {/* Right Column: Visual Screenshot/Image */}
          <div className="lg:w-1/2 w-full mt-8 lg:mt-0 relative">
            {/* Container mimicking the dark, slightly glowing box around the image.
              It uses a deep background with rounded corners and a slight shadow effect.
            */}
            <div className="rounded-2xl p-4  shadow-2xl shadow-orange-900/50 transform transition duration-500 hover:scale-[1.01]">
              <img
                src={WORKFLOW_IMAGE_URL}
                alt="Visual workflow editor showing nodes for OpenAI GPT-4o, Conversation Memory, and routing logic"
                className="w-full h-auto rounded-xl object-cover"
                // Optional: Fallback for when the placeholder image doesn't load
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.onerror = null; // Prevents infinite loop
                  target.src = "https://placehold.co/1000x800/1F172B/AAAAAA?text=Workflow+Visual+Unavailable";
                }}
              />
            </div>
            
            
          </div>

        </div>
      </div>
    </div>
  );
};

export default AgentControlSection;