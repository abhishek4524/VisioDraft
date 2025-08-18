import React from 'react';
import { Pencil, Layers, Lightbulb, Share2 } from 'lucide-react';

const Why = () => {
  return (
    <div className="w-full py-16 bg-white" id="why">
      <h1 className="text-4xl md:text-5xl font-bold text-center text-gray-800 mb-10">
        Why <span className="text-blue-600">VisioDraft</span>?
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 px-6 md:px-20">
        {/* Feature 1 */}
        <div className="bg-gray-100 p-6 rounded-2xl hover:shadow-xl transition-all duration-300 text-center cursor-default">
          <div className="flex justify-center mb-4">
            <Pencil size={40} className="text-blue-500" />
          </div>
          <h3 className="text-xl font-semibold mb-2">Visual Note-Taking</h3>
          <p className="text-gray-600">Organize your thoughts with clarity and creativity.</p>
        </div>

        {/* Feature 2 */}
        <div className="bg-gray-100 p-6 rounded-2xl hover:shadow-xl transition-all duration-300 text-center cursor-default">
          <div className="flex justify-center mb-4">
            <Layers size={40} className="text-green-500" />
          </div>
          <h3 className="text-xl font-semibold mb-2">Layered Organization</h3>
          <p className="text-gray-600">Keep your ideas clean and easily accessible with layers.</p>
        </div>

        {/* Feature 3 */}
        <div className="bg-gray-100 p-6 rounded-2xl hover:shadow-xl transition-all duration-300 text-center cursor-default">
          <div className="flex justify-center mb-4">
            <Lightbulb size={40} className="text-yellow-500" />
          </div>
          <h3 className="text-xl font-semibold mb-2">Creative Mind-Mapping</h3>
          <p className="text-gray-600">Build your ideas like a mind map, visually and intuitively.</p>
        </div>

        {/* Feature 4 */}
        <div className="bg-gray-100 p-6 rounded-2xl hover:shadow-xl transition-all duration-300 text-center cursor-default">
          <div className="flex justify-center mb-4">
            <Share2 size={40} className="text-purple-500" />
          </div>
          <h3 className="text-xl font-semibold mb-2">Easy Sharing</h3>
          <p className="text-gray-600">Share your notes and visuals instantly with your team.</p>
        </div>
      </div>
    </div>
  );
};

export default Why;