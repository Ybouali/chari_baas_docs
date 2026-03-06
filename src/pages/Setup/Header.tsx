function Header() {
    return (
        <div className="py-8 md:py-10 bg-slate-950 border-b border-chari-blue-900/40">
            <div className="container mx-auto px-5 sm:px-6 text-center">
                <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight">
                    <span className="text-chari-blue-400 animate-fade-in-left inline-block">
                        Authentication
                    </span>
                    <span className="text-chari-blue-700 mx-3"> & </span>
                    <span className="text-chari-blue-400 animate-fade-in-right inline-block">
                        Setup
                    </span>
                </h1>

                <p className="mt-3 text-base sm:text-lg text-chari-blue-200/80 font-medium animate-fade-in-up">
                    Follow these steps to configure your{' '}
                    <span className="text-chari-orange-400 font-semibold">
                        API access
                    </span>
                </p>
            </div>
        </div>
    );
}

export default Header;
