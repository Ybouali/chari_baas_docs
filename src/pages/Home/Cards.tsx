// components/Cards.tsx
import { motion } from 'framer-motion';
import {
    Rocket,
    Key,
    FileText,
    ArrowRight,
    Eye,
    CheckCircle2,
    Save,
} from 'lucide-react';
import Card from '../../components/Card';

export default function Cards() {
    return (
        <div className="w-full max-w-7xl mx-auto px-2 md:px-8 py-8">
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
                {/* Get Started Card */}
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

                {/* API Key Card */}
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
                        <div className="flex items-center gap-2 bg-neutral-50 rounded-lg p-3 border border-neutral-200">
                            <span className="text-neutral-400 text-sm font-mono">
                                •••••••••
                            </span>
                            <button className="ml-auto flex items-center gap-1 text-xs bg-white border border-neutral-200 rounded-md px-3 py-1 text-chari-blue-600 hover:bg-chari-blue-50 transition-colors">
                                <Eye className="w-3 h-3" />
                                Show
                            </button>
                        </div>
                    </div>

                    <div className="flex items-center justify-between">
                        <button className="flex items-center gap-2 text-chari-orange-500 font-medium hover:text-chari-orange-600 transition-colors">
                            <Save className="w-4 h-4" />
                            Save Key
                        </button>

                        <div className="flex items-center gap-1 text-xs text-neutral-500">
                            <CheckCircle2 className="w-3 h-3 text-chari-green" />
                            <span>Active</span>
                        </div>
                    </div>
                </Card>

                {/* Swagger Docs Card */}
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
