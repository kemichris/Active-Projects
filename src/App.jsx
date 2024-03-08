import React from 'react';

import './App.css';

import { SnackbarProvider } from 'notistack';

// Components 
import { ProposalsSection } from './components/ProposalsSection';
import { SubmitSection } from './components/SubmitSection';
import { HowSection } from './components/HowSection';

import Navbar from './components/Navbar'
import { TopContainer } from './components/TopContainer';
import { Why } from './components/Why';

function App() {

  return (
    <div>
      <SnackbarProvider>
        <Navbar />
        <TopContainer />
        <Why />
        <HowSection />
        <SubmitSection />
        <ProposalsSection />

      </SnackbarProvider>

    </div>
  );
}

export default App;
