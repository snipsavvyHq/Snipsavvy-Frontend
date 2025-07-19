"use client";
import React, { useState, useEffect } from 'react';
import Joyride, { Step, CallBackProps, STATUS } from 'react-joyride';
import { useSession } from 'next-auth/react';
import { useRouter, useSearchParams } from 'next/navigation';

interface TourGuideProps {
  isFirstTimeUser: boolean;
  onTourComplete: () => void;
  currentStep?: number;
  onStepChange?: (step: number) => void;
}

const TourGuide: React.FC<TourGuideProps> = ({ isFirstTimeUser, onTourComplete }) => {
  const [run, setRun] = useState(false);
  const { data: session } = useSession();
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    // Check if user is new and should see the tour
    if (isFirstTimeUser && session?.user) {
      const hasSeenTour = localStorage.getItem('hasSeenTour');
      if (!hasSeenTour) {
        setRun(true);
      }
    }
  }, [isFirstTimeUser, session]);

  const getSteps = (): Step[] => {
    const baseSteps: Step[] = [
      {
        target: '.tour-workspace-creation',
        content: (
          <div className="text-left">
            <h3 className="text-lg font-semibold mb-2">Welcome to SnipSavvy! 🎉</h3>
            <p className="text-sm text-gray-300">
              Let&apos;s get you started with your first workspace. Workspaces help you organize your code snippets by project or topic.
            </p>
            <p className="text-xs text-gray-400 mt-2">
              Click the &quot;+&quot; button to create your first workspace.
            </p>
          </div>
        ),
        placement: 'bottom',
        disableBeacon: true,
      },
      {
        target: '.tour-collection-creation',
        content: (
          <div className="text-left">
            <h3 className="text-lg font-semibold mb-2">Create Your First Collection 📁</h3>
            <p className="text-sm text-gray-300">
              Collections are like folders that help you organize snippets within a workspace. Click the &quot;+&quot; button to create your first collection.
            </p>
            <p className="text-xs text-gray-400 mt-2">
              Make sure you have a workspace selected first!
            </p>
          </div>
        ),
        placement: 'right',
      },
      {
        target: '.tour-global-search',
        content: (
          <div className="text-left">
            <h3 className="text-lg font-semibold mb-2">Global Search 🔍</h3>
            <p className="text-sm text-gray-300">
              Use the global search to find snippets across all your workspaces and collections. Just type a keyword and see instant results!
            </p>
            <p className="text-xs text-gray-400 mt-2">
              You can also press <b>CTRL+K</b> to open the search quickly.
            </p>
          </div>
        ),
        placement: 'bottom',
      },
      {
        target: '.tour-snippet-creation',
        content: (
          <div className="text-left">
            <h3 className="text-lg font-semibold mb-2">Add Your First Snippet 💻</h3>
            <p className="text-sm text-gray-300">
              Now let&apos;s add a code snippet! Click the &quot;+&quot; button in the top right to create your first snippet in this collection.
            </p>
            <p className="text-xs text-gray-400 mt-2">
              You&apos;ll need both a workspace and collection selected.
            </p>
          </div>
        ),
        placement: 'left',
      },
      {
        target: '.tour-refresh-snippets',
        content: (
          <div className="text-left">
            <h3 className="text-lg font-semibold mb-2">Refresh Snippets 🔄</h3>
            <p className="text-sm text-gray-300">
              Click this button to refresh your snippets and see the latest updates in your workspace.
            </p>
            <p className="text-xs text-gray-400 mt-2">
              Use this after making changes elsewhere or collaborating with others.
            </p>
          </div>
        ),
        placement: 'left',
      },
      {
        target: '.tour-snippet-actions',
        content: (
          <div className="text-left">
            <h3 className="text-lg font-semibold mb-2">Snippet Actions 🔧</h3>
            <p className="text-sm text-gray-300">
              Each snippet has actions like edit, share, and delete. Click on a snippet to see these options in the right panel.
            </p>
            <p className="text-xs text-gray-400 mt-2">
              You can also right-click on snippets for quick actions!
            </p>
          </div>
        ),
        placement: 'left',
      },
      {
        target: '.tour-workspace-actions',
        content: (
          <div className="text-left">
            <h3 className="text-lg font-semibold mb-2">Workspace Management ⚙️</h3>
            <p className="text-sm text-gray-300">
              Right-click on any workspace to see options for editing, sharing, or deleting. You can also share entire workspaces with others!
            </p>
            <p className="text-xs text-gray-400 mt-2">
              Try right-clicking on a workspace to see the context menu.
            </p>
          </div>
        ),
        placement: 'right',
      },
      {
        target: '.tour-settings',
        content: (
          <div className="text-left">
            <h3 className="text-lg font-semibold mb-2">Settings & Access Management 🔐</h3>
            <p className="text-sm text-gray-300">
              Click the settings icon to manage access permissions, view all your workspaces, and customize your experience.
            </p>
            <p className="text-xs text-gray-400 mt-2">
              This is where you can manage who has access to your workspaces.
            </p>
          </div>
        ),
        placement: 'left',
      },
      {
        target: 'body',
        content: (
          <div className="text-center">
            <h3 className="text-lg font-semibold mb-2">You&apos;re All Set! 🚀</h3>
            <p className="text-sm text-gray-300">
              You now know the basics of SnipSavvy! Start creating workspaces, collections, and snippets to organize your code effectively.
            </p>
            <p className="text-xs text-gray-400 mt-2">
              You can always restart this tour from the settings menu.
            </p>
          </div>
        ),
        placement: 'center',
      },
    ];

    return baseSteps;
  };

  const steps = getSteps();

  const handleCallback = (data: CallBackProps) => {
    const { action, index, status, type } = data;

    if (status === STATUS.FINISHED || status === STATUS.SKIPPED) {
      setRun(false);
      localStorage.setItem('hasSeenTour', 'true');
      onTourComplete();
    }

    // Handle specific step actions
    if (type === 'step:after' && action === 'next') {
      switch (index) {
        case 0: // After workspace creation step
          // Wait for workspace to be created
          break;
        case 1: // After collection creation step
          // Wait for collection to be created
          break;
        case 2: // After snippet creation step
          // Wait for snippet to be created
          break;
        default:
          break;
      }
    }
  };

  const styles = {
    options: {
      primaryColor: '#3B82F6',
      backgroundColor: '#1F2937',
      textColor: '#F9FAFB',
      overlayColor: 'rgba(0, 0, 0, 0.8)',
      arrowColor: '#1F2937',
      zIndex: 1000,
    },
    tooltip: {
      backgroundColor: '#1F2937',
      borderRadius: '8px',
      padding: '16px',
      boxShadow: '0 10px 25px rgba(0, 0, 0, 0.5)',
    },
    tooltipTitle: {
      color: '#F9FAFB',
    },
    tooltipContent: {
      color: '#D1D5DB',
    },
    buttonNext: {
      backgroundColor: '#3B82F6',
      color: '#FFFFFF',
      borderRadius: '6px',
      padding: '8px 16px',
      border: 'none',
      fontSize: '14px',
      fontWeight: '500',
    },
    buttonBack: {
      backgroundColor: '#6B7280',
      color: '#FFFFFF',
      borderRadius: '6px',
      padding: '8px 16px',
      border: 'none',
      fontSize: '14px',
      fontWeight: '500',
    },
    buttonSkip: {
      color: '#9CA3AF',
      fontSize: '14px',
      fontWeight: '400',
    },
    buttonClose: {
      color: '#9CA3AF',
    },
  };

  return (
    <Joyride
      steps={steps}
      run={run}
      continuous={true}
      showProgress={true}
      showSkipButton={true}
      callback={handleCallback}
      styles={styles}
      locale={{
        back: 'Back',
        close: 'Close',
        last: 'Finish',
        next: 'Next',
        skip: 'Skip Tour',
      }}
    />
  );
};

export default TourGuide; 