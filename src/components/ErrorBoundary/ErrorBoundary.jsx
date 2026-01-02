// ErrorBoundary.jsx
import React from 'react';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null, errorInfo: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.error('🔥 React Hatası:', error);
    console.error('📋 Component Stack:', errorInfo.componentStack);
    this.setState({ error, errorInfo });
    
    // Sentry/LogRocket gibi servislere gönder
    // logErrorToService(error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div style={{ padding: '20px', border: '2px solid red' }}>
          <h2>❌ Bir şeyler yanlış gitti!</h2>
          <details style={{ whiteSpace: 'pre-wrap' }}>
            <summary>Hata Detayları</summary>
            {this.state.error && this.state.error.toString()}
            <br />
            {this.state.errorInfo.componentStack}
          </details>
          <button onClick={() => window.location.reload()}>
            Sayfayı Yenile
          </button>
        </div>
      );
    }
    return this.props.children;
  }
}

// Kullanımı:
function App() {
  return (
    <ErrorBoundary>
      <YourComponent />
    </ErrorBoundary>
  );
}