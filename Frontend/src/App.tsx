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
import { CookiesProvider } from 'react-cookie'
import JSConfetti from 'js-confetti'

const queryClient = new QueryClient()
export const confetti = new JSConfetti()

function App() {
  return (
    <>
      <CookiesProvider>
        <QueryClientProvider client={queryClient}>
          <GlobalStyle />
          <BrowserRouter>
            <Navbar />
            <AuthModal />
            <Routes>
              <Route path="/" element={<MainPage />} />
              <Route path="/news" element={<NewsPage />} />
              <Route path="/news/newsdetail/:id" element={<NewsDetailPage />} />
              <Route path="/stocks" element={<StocksPage />} />
              <Route path="/mypage" element={<MyPage />} />
              <Route path="/dictionary" element={<DictionaryPage />} />
            </Routes>
            <Footer />
          </BrowserRouter>
        </QueryClientProvider>
      </CookiesProvider>
    </>
  )
}

export default App
