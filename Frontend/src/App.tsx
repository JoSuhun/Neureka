import { BrowserRouter, Routes, Route } from 'react-router-dom'
import GlobalStyle from '@src/GlobalStyle'
import MainPage from '@src/pages/MainPage'
import Navbar from '@src/common/Navbar'
import LoginPage from '@src/pages/LoginPage'
import NewsPage from '@src/pages/NewsPage'
import NewsDetailPage from '@src/pages/NewsDetailPage'
import StocksPage from '@src/pages/StocksPage'
import Footer from '@src/common/Footer'

function App() {
  return (
    <>
      <GlobalStyle />
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/news" element={<NewsPage />} />
          <Route path="/news/:id" element={<NewsDetailPage />} />
          <Route path="/stocks" element={<StocksPage />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </>
  )
}

export default App
