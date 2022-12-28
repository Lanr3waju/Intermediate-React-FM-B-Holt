import { useState, createElement } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import Details from './Details'
import AdoptedPetContext from './AdoptedPetContext'
import SearchParams from './SearchParams'

const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            staleTime: Infinity,
            cacheTime: Infinity
        }

    }
})

const App = () => {
    const adoptedPet = useState(null);
    return (
        <div className='p-0 m-0' style={{ background: "url(http://pets-images.dev-apis.com/pets/wallpaperA.jpg)" }}>
            <BrowserRouter>
                <AdoptedPetContext.Provider value={adoptedPet}>
                    <QueryClientProvider client={queryClient}>
                        <header>
                            <Link to="/">Adopt Me!</Link>
                        </header>
                        <Routes>
                            <Route path="/details/:id" element={<Details />} />
                            <Route path="/" element={<SearchParams />} />
                        </Routes>
                    </QueryClientProvider>
                </AdoptedPetContext.Provider>
            </BrowserRouter>
        </div>
    )
}

const container = document.getElementById('root');
const root = createRoot(container);
root.render(createElement(App));