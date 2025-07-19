"use client";
import React, { useState } from 'react';
import { TourGuide, useFirstTimeUser } from './index';

const TourDemo: React.FC = () => {
  const [showTour, setShowTour] = useState(false);
  const { isFirstTimeUser, isLoading } = useFirstTimeUser();

  const handleStartTour = () => {
    localStorage.removeItem('hasSeenTour');
    setShowTour(true);
  };

  const handleTourComplete = () => {
    setShowTour(false);
    console.log('Tour completed!');
  };

  return (
    <div className="p-8 bg-gray-900 min-h-screen text-white">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">SnipSavvy Tour Guide Demo</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Workspace Creation Section */}
          <div className="bg-gray-800 p-6 rounded-lg">
            <h2 className="text-xl font-semibold mb-4">Workspace Creation</h2>
            <button className="tour-workspace-creation bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded">
              Create Workspace
            </button>
          </div>

          {/* Collection Creation Section */}
          <div className="bg-gray-800 p-6 rounded-lg">
            <h2 className="text-xl font-semibold mb-4">Collection Creation</h2>
            <button className="tour-collection-creation bg-green-600 hover:bg-green-700 px-4 py-2 rounded">
              Create Collection
            </button>
          </div>

          {/* Snippet Creation Section */}
          <div className="bg-gray-800 p-6 rounded-lg">
            <h2 className="text-xl font-semibold mb-4">Snippet Creation</h2>
            <button className="tour-snippet-creation bg-purple-600 hover:bg-purple-700 px-4 py-2 rounded">
              Create Snippet
            </button>
          </div>

          {/* Snippet Actions Section */}
          <div className="bg-gray-800 p-6 rounded-lg">
            <h2 className="text-xl font-semibold mb-4">Snippet Actions</h2>
            <div className="tour-snippet-actions bg-gray-700 p-4 rounded cursor-pointer">
              <h3 className="font-semibold">Sample Snippet</h3>
              <p className="text-sm text-gray-300">Click to see actions</p>
            </div>
          </div>

          {/* Workspace Actions Section */}
          <div className="bg-gray-800 p-6 rounded-lg">
            <h2 className="text-xl font-semibold mb-4">Workspace Management</h2>
            <div className="tour-workspace-actions bg-gray-700 p-4 rounded cursor-pointer">
              <h3 className="font-semibold">Sample Workspace</h3>
              <p className="text-sm text-gray-300">Right-click for options</p>
            </div>
          </div>

          {/* Settings Section */}
          <div className="bg-gray-800 p-6 rounded-lg">
            <h2 className="text-xl font-semibold mb-4">Settings</h2>
            <button className="tour-settings bg-orange-600 hover:bg-orange-700 px-4 py-2 rounded">
              ⚙️ Settings
            </button>
          </div>
        </div>

        {/* Tour Controls */}
        <div className="mt-8 p-6 bg-gray-800 rounded-lg">
          <h2 className="text-xl font-semibold mb-4">Tour Controls</h2>
          <div className="flex gap-4">
            <button
              onClick={handleStartTour}
              className="bg-blue-600 hover:bg-blue-700 px-6 py-2 rounded font-semibold"
            >
              Start Tour
            </button>
            <button
              onClick={() => localStorage.removeItem('hasSeenTour')}
              className="bg-gray-600 hover:bg-gray-700 px-6 py-2 rounded font-semibold"
            >
              Reset Tour State
            </button>
          </div>
          <div className="mt-4 text-sm text-gray-300">
            <p>Is First Time User: {isFirstTimeUser ? 'Yes' : 'No'}</p>
            <p>Is Loading: {isLoading ? 'Yes' : 'No'}</p>
            <p>Show Tour: {showTour ? 'Yes' : 'No'}</p>
          </div>
        </div>
      </div>

      {/* Tour Guide Component */}
      {showTour && (
        <TourGuide
          isFirstTimeUser={true}
          onTourComplete={handleTourComplete}
        />
      )}
    </div>
  );
};

export default TourDemo; 