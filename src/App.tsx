import { useState } from 'react'
import './App.css'
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { TooltipProvider } from '@/components/ui/tooltip'
import { Toaster as Sonner} from '@/components/ui/sonner'
import Index from "./pages/Index";
import CreateGame from './pages/CreateGame';
import ViewGame from './pages/ViewGame';
import NotFound from './pages/NotFound';

const queryClient = new QueryClient();

function App() {
  const [count, setCount] = useState(0)

  return <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/create" element={<CreateGame />} />
          <Route path="/game/:gameId" element={<ViewGame />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
}

export default App
