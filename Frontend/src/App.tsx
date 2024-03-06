import { useState } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import GlobalStyle from './GlobalStyle'
import MainPage from './pages/MainPage'
import NewsPage from './pages/NewsPage'
import Navbar from './common/Navbar'
import StockPage from './pages/StockPage'
import NewsDatailPage from './pages/NewsDatailPage'

function App() {
  return (
    <>
      <GlobalStyle />
      <BrowserRouter>
      <Navbar />
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/news" element={<NewsPage />} />
          <Route path="/news/:id" element={<NewsDatailPage />} />
          <Route path="/stocks" element={<StockPage />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
