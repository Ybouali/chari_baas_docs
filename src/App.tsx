import { Routes, Route } from 'react-router-dom';
import { useState } from 'react';
import LeftSidebar from './components/LeftSidebar';
import Home from './pages/Home';
import Setup from './pages/Setup';
import Customer from './pages/Customer';
import KYC from './pages/Kyc';
import Operations from './pages/Operations';
import Beneficiaries from './pages/Beneficiaries';
import Cards from './pages/Cards';
import Agents from './pages/Agents';
import Tools from './pages/Tools';

function App() {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className="min-h-screen bg-neutral-50 dark:bg-neutral-900 flex">
            <LeftSidebar isOpen={isOpen} setIsOpen={setIsOpen} />

            <main
                className={`flex-1 transition-all duration-300 lg:ml-70 ${
                    isOpen ? 'ml-70' : 'ml-16'
                }`}
            >
                <div className="p-8">
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/setup" element={<Setup />} />
                        <Route path="/customer" element={<Customer />} />
                        <Route path="/kyc" element={<KYC />} />
                        <Route path="/operations" element={<Operations />} />
                        <Route
                            path="/beneficiaries"
                            element={<Beneficiaries />}
                        />
                        <Route path="/cards" element={<Cards />} />
                        <Route path="/agents" element={<Agents />} />
                        <Route path="/tools" element={<Tools />} />
                    </Routes>
                </div>
            </main>
        </div>
    );
}

export default App;
