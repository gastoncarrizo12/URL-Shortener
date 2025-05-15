import { useState } from 'react';
import axios from 'axios';
import './App.css';
import '@fortawesome/fontawesome-free/css/all.min.css'; // Importar Font Awesome

function App() {
  const [url, setUrl] = useState('');
  const [shortUrl, setShortUrl] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await axios.post('http://localhost:3000/create', { url });
      setShortUrl(res.data.shortUrl);
    } catch (err) {
      console.error("Error al acortar URL:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="container">
        <div className="header">
          <h1>Acorta tu URL</h1>
          <p>Genera enlaces cortos para compartir fácilmente</p>
        </div>

        <div className="form-container">
          <form onSubmit={handleSubmit}>
            <input
              type="url"
              value={url}
              placeholder="Pega tu enlace aquí"
              onChange={(e) => setUrl(e.target.value)}
              required
              className="url-input"
            />
            <button type="submit" className="submit-btn" disabled={loading}>
              {loading ? 'Generando...' : 'Acortar'}
            </button>
          </form>
        </div>

        {shortUrl && (
          <div className="result">
            <p><strong>Tu enlace corto:</strong></p>
            <a href={shortUrl} target="_blank" rel="noreferrer" className="short-url">
              {shortUrl}
            </a>
          </div>
        )}
      </div>

      <footer className="footer">
        <p>Acortador creado por Gaston Carrizo Chaio</p>
        <div className="social-icons">
          <a href="https://www.linkedin.com/in/gastoncarrizochaio" target="_blank" rel="noreferrer">
            <i className="fab fa-linkedin"></i>
          </a>
          <a href="https://github.com/tu-usuario" target="_blank" rel="noreferrer">
            <i className="fab fa-github"></i>
          </a>
        </div>
      </footer>
    </>
  );
}

export default App;
