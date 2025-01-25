import { Routes, Route } from 'react-router-dom'
import Layout from './components/Layout'
import Home from './pages/Home'
import NotFound from './pages/NotFound'

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        {/* Boshqa routelarni shu yerga qo'shing */}
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  )
}

export default App
