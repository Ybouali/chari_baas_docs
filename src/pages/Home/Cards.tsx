import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import {
    Rocket,
    Key,
    FileText,
    ArrowRight,
    Eye,
    EyeOff,
    CheckCircle2,
    Save,
} from 'lucide-react';
import Card from '../../components/Card';

export default function Cards() {
    const [apiKey, setApiKey] = useState('');
    const [showKey, setShowKey] = useState(false);
    const [isSaved, setIsSaved] = useState(false);

    useEffect(() => {
        const savedKey = localStorage.getItem('chari_api_key');
        if (savedKey) {
            setApiKey(savedKey);
            setIsSaved(true);
        }
    }, []);

    const handleSave = () => {
        localStorage.setItem('chari_api_key', apiKey);
        setIsSaved(true);
        setTimeout(() => setIsSaved(false), 2000);
    };

    return (
        <div className="w-full">
            <motion.div
                initial="hidden"
                animate="visible"
                variants={{
                    visible: {
                        transition: {
                            staggerChildren: 0.15,
                            delayChildren: 0.2,
                        },
                    },
                }}
                className="grid grid-cols-1 md:grid-cols-3 gap-6"
            >
                <Card>
                    <div className="flex items-center justify-between mb-4">
                        <div className="p-3 bg-chari-blue-50 rounded-xl">
                            <Rocket className="w-6 h-6 text-chari-blue-600" />
                        </div>
                        <span className="text-xs font-medium text-chari-blue-600 bg-chari-blue-50 px-3 py-1 rounded-full">
                            New
                        </span>
                    </div>

                    <h3 className="text-xl font-bold text-chari-blue-900 mb-2">
                        Get Started
                    </h3>

                    <p className="text-neutral-600 mb-4 text-sm leading-relaxed">
                        New to ChariBaas? Follow our quick setup guide to get
                        your first API call working in minutes.
                    </p>

                    <div className="flex items-center justify-between">
                        <button className="flex items-center gap-2 text-chari-blue-600 font-medium hover:text-chari-blue-700 transition-colors group">
                            Setup Guide
                            <ArrowRight className="w-4 h-4 transform transition-transform group-hover:translate-x-1" />
                        </button>

                        <div className="flex items-center gap-1 text-xs text-neutral-500">
                            <Key className="w-3 h-3" />
                            <span>API access</span>
                        </div>
                    </div>
                </Card>

                <Card>
                    <div className="flex items-center justify-between mb-4">
                        <div className="p-3 bg-chari-orange-50 rounded-xl">
                            <Key className="w-6 h-6 text-chari-orange-500" />
                        </div>
                        <span className="text-xs font-medium text-chari-orange-500 bg-chari-orange-50 px-3 py-1 rounded-full">
                            Credentials
                        </span>
                    </div>

                    <h3 className="text-xl font-bold text-chari-blue-900 mb-2">
                        API Key
                    </h3>

                    <div className="mb-4">
                        <div className="relative flex items-center bg-neutral-50 rounded-lg border border-neutral-200 overflow-hidden focus-within:ring-2 focus-within:ring-chari-blue-500/20 transition-all">
                            <input
                                type={showKey ? 'text' : 'password'}
                                value={apiKey}
                                onChange={(e) => setApiKey(e.target.value)}
                                placeholder="sk_test_••••••••"
                                className="w-full bg-transparent px-4 py-3 text-sm font-mono text-neutral-700 outline-none"
                            />
                            <button
                                onClick={() => setShowKey(!showKey)}
                                className="px-3 text-neutral-400 hover:text-chari-blue-600 transition-colors"
                            >
                                {showKey ? (
                                    <EyeOff className="w-4 h-4" />
                                ) : (
                                    <Eye className="w-4 h-4" />
                                )}
                            </button>
                        </div>
                    </div>

                    <div className="flex items-center justify-between">
                        <button
                            onClick={handleSave}
                            disabled={!apiKey}
                            className={`flex items-center gap-2 font-bold text-sm transition-all duration-300 ${
                                isSaved
                                    ? 'text-chari-green scale-105'
                                    : 'text-chari-orange-500 hover:text-chari-orange-600'
                            }`}
                        >
                            {isSaved ? (
                                <>
                                    <CheckCircle2 className="w-4 h-4" />
                                    Saved!
                                </>
                            ) : (
                                <>
                                    <Save className="w-4 h-4" />
                                    Save Key
                                </>
                            )}
                        </button>

                        <div className="flex items-center gap-1 text-[10px] font-black uppercase tracking-widest text-neutral-400">
                            <div
                                className={`w-1.5 h-1.5 rounded-full ${
                                    apiKey
                                        ? 'bg-chari-green animate-pulse'
                                        : 'bg-neutral-300'
                                }`}
                            />
                            <span>{apiKey ? 'Configured' : 'Missing'}</span>
                        </div>
                    </div>
                </Card>

                <Card>
                    <div className="flex items-center justify-between mb-4">
                        <div className="p-3 bg-chari-green-600/10 rounded-xl">
                            <FileText className="w-6 h-6 text-chari-green-600" />
                        </div>
                        <span className="text-xs font-medium text-chari-green-600 bg-chari-green-600/10 px-3 py-1 rounded-full">
                            OpenAPI
                        </span>
                    </div>

                    <h3 className="text-xl font-bold text-chari-blue-900 mb-2">
                        Swagger Docs
                    </h3>

                    <p className="text-neutral-600 mb-6 text-sm leading-relaxed">
                        View the complete OpenAPI specification and
                        auto-generated documentation.
                    </p>

                    <div className="flex items-center justify-between">
                        <button className="flex items-center gap-2 text-chari-green-600 font-medium hover:text-chari-green-700 transition-colors group">
                            Open Swagger
                            <ArrowRight className="w-4 h-4 transform transition-transform group-hover:translate-x-1" />
                        </button>

                        <div className="flex items-center gap-1 text-xs text-neutral-500">
                            <span className="text-xs">v1.8</span>
                            <span className="w-1 h-1 bg-neutral-300 rounded-full"></span>
                            <span className="text-xs">120+ endpoints</span>
                        </div>
                    </div>
                </Card>
            </motion.div>
        </div>
    );
}
