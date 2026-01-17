import React from 'react';
import { LayoutProvider, useLayout } from './contexts/LayoutContext';
import { Button2 } from './components/Button';
import { Card } from './components/Card';
import './App.css';

const AppContent: React.FC = () => {
  const { sidebarOpen, toggleSidebar, theme, toggleTheme } = useLayout();

  return (
    <div className={`app app--${theme}`}>
      <div className="app__header">
        <h1>React Starter Library - Demo</h1>
        <div className="app__controls">
          <Button2 onClick={toggleTheme} variant="outline" size="small">
            Toggle Theme ({theme})
          </Button2>
          <Button2 onClick={toggleSidebar} variant="secondary" size="small">
            Toggle Sidebar
          </Button2>
        </div>
      </div>

      <div className="app__layout">
        {sidebarOpen && (
          <aside className="app__sidebar">
            <Card title="Sidebar" elevation="low">
              <p>This is a collapsible sidebar controlled by Layout Context.</p>
            </Card>
          </aside>
        )}

        <main className="app__main">
          <Card title="Component Library Demo" elevation="medium">
            <p>This is a demonstration of the React component library.</p>
            <div style={{ marginTop: '1rem', display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
              <Button2 variant="primary" size="small">
                Primary Small
              </Button2>
              <Button2 variant="secondary" size="medium">
                Secondary Medium
              </Button2>
              <Button2 variant="outline" size="large">
                Outline Large
              </Button2>
            </div>
          </Card>

          <div style={{ marginTop: '1rem' }}>
            <Card
              title="Features"
              elevation="high"
              footer={<span style={{ fontSize: '0.875rem' }}>Built with Vite + React + TypeScript</span>}
            >
              <ul>
                <li>✅ UI Components (Button, Card)</li>
                <li>✅ Layout Context with theme and sidebar state</li>
                <li>✅ Axios service for API calls</li>
                <li>✅ TypeScript support</li>
                <li>✅ Optimized for tree-shaking</li>
              </ul>
            </Card>
          </div>
        </main>
      </div>
    </div>
  );
};

function App() {
  return (
    <LayoutProvider initialTheme="light" initialSidebarOpen={true}>
      <AppContent />
    </LayoutProvider>
  );
}

export default App;
