import { ChevronLeft, ChevronRight } from 'lucide-react';
import React, { type Component, useState } from 'react';
import { ToggleButton } from 'react-aria-components';
// import GuideButton from '~/components/GuidanceButton';

export const Sidebar: React.FC<any> = ({ children }) => {
  const [isPanelOpen, setIsPanelOpen] = useState(false);
  const [activeTab, setActiveTab] = useState(0);

  const togglePanel = () => setIsPanelOpen(!isPanelOpen);

  const tabs = React.Children.map(
    children as Component<SidebarTabProps>,
    (child) => ({
      icon: child.props.icon,
      label: child.props.title,
      content: child.props.children,
      className: child.props.className,
    })
  );

  return (
    <>
      {/* Chevron button */}
      <ToggleButton
        onPress={togglePanel}
        className={` right-side-panel-collapse-button
          absolute z-30
          bg-white text-gray-800 border-gray-300 dark:bg-gray-800 dark:text-white dark:border-gray-600
          py-8 px-1 rounded-l-md transition-all duration-300 ease-in-out ${
            isPanelOpen ? ` right-[23rem] ` : 'right-12'
          } border border-r-0 hover:text-pink-500 flex items-center justify-center`}
        style={{ top: 'calc(50% - 4rem)', height: '1rem' }}
      >
        {isPanelOpen ? (
          <ChevronRight size={20} />
        ) : (
          <ChevronLeft size={20} />
        )}
      </ToggleButton>

      {/* Right Panel */}
      <div
        className={`
          fixed top-0 right-12 h-full w-80 ${
            tabs[activeTab]?.className || ''
          }
          bg-white text-gray-800 dark:bg-gray-900 dark:text-white
          transition-all duration-300 ease-in-out
          ${
            isPanelOpen ? 'translate-x-0' : 'translate-x-full'
          } border-l
          border-gray-300 dark:border-gray-700 z-20 shadow-lg
        `}
      >
        <div
          className={`
            flex justify-between items-center p-2
          bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-white
            border-b border-gray-300 dark:border-gray-700
          `}
        >
          <h3 className="text-sm font-semibold">
            {tabs[activeTab].label}
          </h3>
        </div>

        {/* Active tab content */}
        <div className="p-4 h-full overflow-auto">
          {tabs[activeTab].content}
        </div>

        {/* Bottom section */}
        {/* <div
          className={`
            absolute bottom-0 w-full p-4 border-t
            border-gray-300 bg-gray-100 dark:border-gray-700 dark:bg-gray-800
          `}
        >
          <div className={`flex items-center ${isDarkMode ? 'text-gray-600' : 'text-pink-400'}`}>
            <ChevronRight size={16} className="mr-2" />
            <span className="text-xs">DIAGRAM INFO</span>
          </div>
        </div> */}
      </div>

      {/* Vertical tabs - now on the far right */}
      <div
        className={`
          fixed top-0 right-0 w-12 h-full
          bg-gray-100 dark:bg-gray-800
          border-l border-gray-300 dark:border-gray-700
          flex flex-col items-center py-4 z-30
        `}
      >
        {tabs.map((tab: any, index: any) => (
          <button
            key={index}
            className={`p-2 mb-2 w-full
              text-gray-600 hover:text-pink-500 dark:text-gray-400 dark:hover:text-pink-400
              ${
                activeTab === index
                  ? `border-l-2 bg-white border-pink-500 dark:border-l-2 dark:bg-gray-900 dark:border-pink-400`
                  : ''
              }`}
            onClick={() => {
              setActiveTab(index);
              setIsPanelOpen(true);
            }}
          >
            {tab.icon}
          </button>
        ))}
        <div className="flex-grow" />
        <div
          className={`p-2 text-gray-600 hover:text-pink-500 dark:text-gray-400 dark:hover:text-pink-400`}
        >
          {/* <GuideButton /> */}
        </div>

        {/* <button
          className={`p-2 text-gray-600 hover:text-pink-500 dark:text-gray-400 dark:hover:text-pink-400`}
          onClick={() => {}}
        >
          <Settings size={24} />
        </button> */}
      </div>
    </>
  );
};

interface SidebarTabProps {
  title: string;
  icon: React.ReactNode;
  children?: React.ReactNode;
  className?: string;
}
export const SidebarTab = ({}: SidebarTabProps) => null;
