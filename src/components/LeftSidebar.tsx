import { Link, useLocation } from 'react-router-dom';
import {
    ChevronRight,
    ChevronLeft,
    Home,
    Key,
    Users,
    ShieldCheck,
    DollarSign,
    Store,
    Wrench,
} from 'lucide-react';

const navItems = [
    { name: 'Home', icon: Home, href: '/' },
    { name: 'Auth & Setup', icon: Key, href: '/setup' },
    { name: 'Customer Registration', icon: Users, href: '/customer' },
    { name: 'KYC', icon: ShieldCheck, href: '/kyc' },
    { name: 'Operations', icon: DollarSign, href: '/operations' },
    { name: 'Beneficiaries', icon: Users, href: '/beneficiaries' },
    { name: 'Agents', icon: Store, href: '/agents' },
    { name: 'Tools & Webhooks', icon: Wrench, href: '/tools' },
];

interface LeftSidebarProps {
    isOpen: boolean;
    setIsOpen: (isOpen: boolean) => void;
}

export default function LeftSidebar({ isOpen, setIsOpen }: LeftSidebarProps) {
    const location = useLocation();

    return (
        <aside
            className={`fixed top-0 left-0 h-full bg-white dark:bg-neutral-900 
                  border-r border-neutral-200 dark:border-neutral-700 
                  transition-all duration-300 z-50 overflow-y-auto 
                  ${isOpen ? 'w-70' : 'w-16'} lg:w-70`}
        >
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="absolute -right-3 top-6 bg-white dark:bg-neutral-800 
                   border border-neutral-300 dark:border-neutral-600 
                   rounded-full p-1.5 shadow-md hover:bg-neutral-100 
                   dark:hover:bg-neutral-700 transition-colors lg:hidden"
                aria-label={isOpen ? 'Collapse sidebar' : 'Expand sidebar'}
            >
                {isOpen ? (
                    <ChevronLeft size={18} />
                ) : (
                    <ChevronRight size={18} />
                )}
            </button>

            <div className="p-5 border-b border-neutral-200 dark:border-neutral-700 flex items-center gap-3">
                <span
                    className={`font-bold text-xl text-chari-green-700 dark:text-chari-blue-300 ${
                        isOpen ? 'block' : 'hidden'
                    } lg:block`}
                >
                    ChariBaas
                </span>
                {!isOpen && (
                    <span className="font-bold text-xl text-chari-blue-700 dark:text-chari-blue-300 mx-auto lg:hidden">
                        CB
                    </span>
                )}
            </div>

            <nav className="mt-4 px-3">
                <ul className="space-y-1">
                    {navItems.map((item) => {
                        const isActive = location.pathname === item.href;
                        return (
                            <li key={item.name}>
                                <Link
                                    to={item.href}
                                    className={`group flex items-center gap-3 px-4 py-3 rounded-xl transition-colors relative ${
                                        !isOpen &&
                                        'justify-center lg:justify-start'
                                    } ${
                                        isActive
                                            ? 'text-chari-blue-700 dark:text-chari-blue-300 font-semibold after:content-[""] after:absolute after:bottom-0 after:left-4 after:right-4 after:h-0.5 after:bg-white after:rounded-full'
                                            : 'text-neutral-700 dark:text-neutral-300'
                                    }`}
                                >
                                    <item.icon
                                        size={22}
                                        strokeWidth={2}
                                        className="shrink-0"
                                    />

                                    <span
                                        className={`font-medium text-sm ${
                                            isOpen ? 'block' : 'hidden'
                                        } lg:block`}
                                    >
                                        {item.name}
                                    </span>
                                    {!isActive && (
                                        <span className=" absolute bottom-0 left-4 right-4 h-0.5 bg-chari-blue-500 dark:bg-chari-blue-400 scale-x-0 group-hover:scale-x-100 transition-transform duration-300 ease-out origin-left rounded-full " />
                                    )}
                                </Link>
                            </li>
                        );
                    })}
                </ul>
            </nav>

            <div
                className={`absolute bottom-6 left-5 right-5 text-xs text-neutral-500 dark:text-neutral-400 text-center ${
                    isOpen ? 'block' : 'hidden'
                } lg:block`}
            >
                <div>Version 1.8</div>
                <div className="mt-1">November 2025</div>
            </div>

            {!isOpen && (
                <div className="absolute bottom-6 left-0 right-0 lg:hidden flex justify-center text-[10px] text-neutral-500">
                    v1.8
                </div>
            )}
        </aside>
    );
}
