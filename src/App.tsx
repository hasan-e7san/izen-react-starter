import React from 'react';
import { LayoutProvider, useLayout } from './contexts/LayoutContext';
import { Button } from './components/Button';
import { Card } from './components/Card';
import './App.css';

const AppContent: React.FC = () => {
  const { sidebarOpen, toggleSidebar, theme, toggleTheme } = useLayout();

  return (
    <div className={`app app--${theme}`}>
      <div className="app__header">
        <h1>React Starter Library - Demo</h1>
        <div className="app__controls">
          <Button onClick={toggleTheme} variant="outline" size="small">
            Toggle Theme ({theme})
          </Button>
          <Button onClick={toggleSidebar} variant="secondary" size="small">
            Toggle Sidebar
          </Button>
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
              <Button variant="primary" size="small">
                Primary Small
              </Button>
              <Button variant="secondary" size="medium">
                Secondary Medium
              </Button>
              <Button variant="outline" size="large">
                Outline Large
              </Button>
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
