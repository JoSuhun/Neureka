import { useEffect, useState } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import GlobalStyle from './GlobalStyle'
import MainPage from './pages/MainPage'
import NewsPage from './pages/NewsPage'
import Navbar from './common/Navbar'
import StocksPage from './pages/StocksPage'
import NewsDetailPage from './pages/NewsDetailPage'
import LoginPage from './pages/LoginPage'
import Footer from './common/Footer'

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
