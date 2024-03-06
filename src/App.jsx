import './App.css';
import { ProposalsSection } from './ProposalsSection';
import { SubmitSection } from './SubmitSection';
import { HowSection } from './components/HowSection';

import { Navbar } from './components/Navbar';
import { TopContainer } from './components/TopContainer';
import { Why } from './components/Why';

function App() {
  return (
    <div>
      <Navbar/>
      <TopContainer/>
      <Why/>
      <HowSection/>
      <SubmitSection/>
      <ProposalsSection/>
    </div>
  );
}

export default App;
