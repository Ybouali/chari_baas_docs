import Cards from './Cards';
import Header from './Header';

export default function Home() {
    return (
        <div className="flex flex-col items-center justify-center">
            <Header />
            <Cards />
        </div>
    );
}
