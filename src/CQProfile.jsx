export default function CQProfile({ setPage }) {
  const progressData = [
    { month: "Jan", rating: 450 },
    { month: "Feb", rating: 620 },
    { month: "Mar", rating: 880 },
    { month: "Apr", rating: 1100 },
    { month: "May", rating: 1328 },
  ];

  return (
    <div className="min-h-screen bg-black text-white p-6">

      {/* Header */}
      <div className="flex items-center gap-4 mb-8">
        <button
          onClick={() => setPage("app")}
          className="px-4 py-2 bg-gray-800 hover:bg-gray-700 rounded-lg"
        >
          ← Back
        </button>

        <h1 className="text-3xl font-bold text-cyan-400">
          CQ Profile
        </h1>
      </div>

      {/* Main Stats */}
      <div className="grid md:grid-cols-2 gap-6">

        <div className="bg-gray-900 border border-cyan-500/20 rounded-2xl p-6">
          <h2 className="text-cyan-400 text-xl mb-4">
            CQ Overview
          </h2>

          <div className="space-y-3">
            <p><strong>CQ Rating:</strong> 1328</p>
            <p><strong>Rank:</strong> Explorer</p>
            <p><strong>Next Rank:</strong> Investigator (1600)</p>
            <p><strong>Points Needed:</strong> 272</p>
            <p><strong>Current Streak:</strong> 12 Days</p>
            <p><strong>Challenges Solved:</strong> 27</p>
            <p><strong>Questions Asked:</strong> 143</p>
            <p><strong>Subjects Explored:</strong> 6</p>
          </div>
        </div>

        {/* Achievements */}
        <div className="bg-gray-900 border border-cyan-500/20 rounded-2xl p-6">
          <h2 className="text-cyan-400 text-xl mb-4">
            Achievements
          </h2>

          <div className="space-y-4">
            <div className="bg-gray-800 rounded-xl p-3">
              🏅 First Challenge
            </div>

            <div className="bg-gray-800 rounded-xl p-3">
              🔍 Question Explorer
            </div>

            <div className="bg-gray-800 rounded-xl p-3">
              🔥 7 Day Streak
            </div>

            <div className="bg-gray-800 rounded-xl p-3">
              🚀 Multi-Domain Learner
            </div>
          </div>
        </div>
      </div>

      {/* Rating Progress */}
      <div className="mt-8 bg-gray-900 border border-cyan-500/20 rounded-2xl p-6">
        <h2 className="text-cyan-400 text-xl mb-6">
          Rating Progress
        </h2>

        <div className="space-y-4">
          {progressData.map((item, index) => (
            <div key={index}>
              <div className="flex justify-between mb-1">
                <span>{item.month}</span>
                <span>{item.rating}</span>
              </div>

              <div className="w-full bg-gray-800 rounded-full h-3">
                <div
                  className="bg-cyan-400 h-3 rounded-full"
                  style={{
                    width: `${(item.rating / 1600) * 100}%`,
                  }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}