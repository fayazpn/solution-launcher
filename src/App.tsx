import { useState } from 'react';
// import './App.css';
import { Code2Icon, MessageSquare } from 'lucide-react';
import { Chatbot } from './components/Chatbot';
import { CodepenLauncher } from './components/CodepenLauncher';
import { Sidebar, SidebarTab } from './components/Sidebar';

function App() {
  const [loader, setLoader] = useState(false);

  const toggleLoader = (bool: Boolean) => setLoader(!!bool);

  return (
    <div className="">
      <Sidebar>
        <SidebarTab
          icon={<MessageSquare size={24} />}
          title="System Design Chatbot 🤖"
        >
          <Chatbot path={'/'} toggle={toggleLoader} loader={loader} />
        </SidebarTab>

        <SidebarTab
          icon={<MessageSquare size={24} />}
          title="next tab"
        >
          {/* <Chatbot path={'/'} toggle={toggleLoader} loader={loader} /> */}
        </SidebarTab>

        <SidebarTab
          icon={<Code2Icon size={24} />}
          title="My IDE"
        ></SidebarTab>
      </Sidebar>
      <div>
        {/* <CodeEditor /> */}
        <CodepenLauncher />
      </div>
    </div>
  );
}

export default App;
