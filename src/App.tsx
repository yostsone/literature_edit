import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ThemeProvider, CssBaseline, Container } from '@mui/material';
import AnalysisPage from './page/AnalysisPage';
import NotesPage from './page/NotesPage';
import UploadPage from './page/UploadPage';
import Header from './component/Header/Header';
import Footer from './component/Footer/Footer';
import theme from './theme/theme';

export default function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <BrowserRouter>
        <Header />
        <Container maxWidth="lg" sx={{ pt: '24px', mt: '64px'}}>
          <Routes>
            <Route path="/literature_edit/upload" element={<UploadPage />} />
            <Route path="/literature_edit/notes" element={<NotesPage />} />
            <Route path="/literature_edit/analysis" element={<AnalysisPage />} />
          </Routes>
        </Container>
      </BrowserRouter>
      <Footer />
    </ThemeProvider>
  )
}