import { BrowserRouter, Routes, Route } from 'react-router-dom'
import GlobalStyle from '@src/GlobalStyle'
import MainPage from '@src/pages/MainPage'
import Navbar from '@src/common/Navbar'
import NewsPage from '@src/pages/NewsPage'
import NewsDetailPage from '@src/pages/NewsDetailPage'
import StocksPage from '@src/pages/StocksPage'
import Footer from '@src/common/Footer'
import MyPage from './pages/MyPage'
import DictionaryPage from './pages/DictionaryPage'

import { QueryClient, QueryClientProvider } from 'react-query'
import AuthModal from './common/Auth/AuthModal'

const queryClient = new QueryClient()

function App() {
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <GlobalStyle />
        <BrowserRouter>
          <Navbar />
          <AuthModal />
          <Routes>
            <Route path="/" element={<MainPage />} />
            <Route path="/news" element={<NewsPage />} />
            <Route path="/news/detail/:url" element={<NewsDetailPage />} />
            <Route path="/stocks" element={<StocksPage />} />
            <Route path="/mypage" element={<MyPage />} />
            <Route path="/dictionary" element={<DictionaryPage />} />
          </Routes>
          <Footer />
        </BrowserRouter>
      </QueryClientProvider>
    </>
  )
}

export default App
