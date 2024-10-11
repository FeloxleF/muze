import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { SongsProvider } from './services/SongContext'; // Importer le SongsProvider
import PlaylistPage from './pages/PlaylistPage'; // Importer les pages nécessaires
import CreatorPage from './pages/CreatorPage';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<PlaylistPage />} />
        <Route
          path="/creator"
          element={
            <SongsProvider> {/* Envelopper seulement CreatorPage avec SongsProvider */}
              <CreatorPage />
            </SongsProvider>
          }
        />
      </Routes>
    </Router>
  );
};

export default App;
