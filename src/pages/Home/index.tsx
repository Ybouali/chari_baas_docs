import Cards from './Cards';
import Header from './Header';
import QuickActions from './QuickActions';

export default function Home() {
    return (
        <div className="flex flex-col items-center justify-center">
            <Header />
            <Cards />
            <QuickActions />
        </div>
    );
}
