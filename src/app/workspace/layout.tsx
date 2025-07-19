"use client";
import React from "react";
import Collection from "@/components/LeftPanel/Collection";
import Sidebar from "@/components/LeftPanel/Sidebar";
import { TourGuide, useFirstTimeUser } from "@/components/TourGuide";

type LayoutProps = {
  children: React.ReactNode;
};

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const { isFirstTimeUser, isLoading } = useFirstTimeUser();

  const handleTourComplete = () => {
    // Tour completed, you can add any additional logic here
    console.log('Tour completed');
  };

  return (
    <div className="bg-[#18181B] min-h-screen w-screen flex">
      <div className="w-[25vw] flex">
        {/* Sidebar content goes here */}
        <Sidebar />
      </div>

      {children}
      
      {/* Tour Guide */}
      {!isLoading && (
        <TourGuide 
          isFirstTimeUser={isFirstTimeUser} 
          onTourComplete={handleTourComplete}
        />
      )}
    </div>
  );
};

export default Layout;
