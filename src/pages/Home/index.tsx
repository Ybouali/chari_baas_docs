import Cards from './Cards';
import Header from './Header';
import QuickActions from './QuickActions';

export default function Home() {
    return (
        <div className="flex flex-col items-center gap-8 w-full max-w-7xl mx-auto pb-12">
            <Header />
            <Cards />
            <QuickActions />
        </div>
    );
}
