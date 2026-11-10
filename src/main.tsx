import { createRoot } from 'react-dom/client';
import './styles.css';
import './app/(nacional)/nacional.css';
import './app/(nacional)/paginas.css';
import './styles/visual-secoes.css';
import './styles/genericas.css';
import '../design-tokens.css';
import App from './App';
createRoot(document.getElementById('root')!).render(<App />);
