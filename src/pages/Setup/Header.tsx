import { motion } from 'framer-motion';

function Header() {
    return (
        <motion.header
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            className="relative overflow-hidden bg-linear-to-br from-chari-blue-900 via-chari-blue-800 to-chari-blue-950 text-white w-full py-10 px-8 rounded-3xl shadow-xl shadow-chari-blue-900/20 border border-white/5"
        >
            <div className="absolute inset-0 opacity-20 pointer-events-none">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_30%,rgba(59,130,246,0.3)_0%,transparent_50%)]" />
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_70%,rgba(249,115,22,0.15)_0%,transparent_50%)]" />
            </div>

            <div className="relative text-center z-10">
                <h1 className="text-3xl md:text-5xl font-black tracking-tighter mb-3 
                     bg-clip-text text-transparent bg-linear-to-r from-chari-blue-200 via-white to-chari-blue-100">
                    Authentication & Setup
                </h1>

                <p className="text-lg md:text-xl font-medium text-chari-blue-100 opacity-90 max-w-2xl mx-auto italic">
                    Configure your{' '}
                    <span className="text-chari-orange-400 font-bold">API access</span> to start
                    building with ChariBaas
                </p>
            </div>
        </motion.header>
    );
}

export default Header;
