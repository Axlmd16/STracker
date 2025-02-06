import {
    AlertCircle,
    Brain,
    CheckCircle,
    ExternalLink,
    Link,
} from "lucide-react";
import React, { useEffect, useState } from "react";

const TestsCard = ({ actions, store }) => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await actions.getUltimosTests();
                setData(response);
            } catch (err) {
                setError(err);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    if (loading)
        return (
            <span>
                <div className="flex justify-center items-center min-h-[400px]">
                    <span className="loading loading-spinner loading-lg text-primary"></span>
                </div>
            </span>
        );
    if (error) return <p>Error al cargar los test: {error.message}</p>;

    const truncateUrl = (url) => {
        return url.length > 40 ? url.substring(0, 40) + "..." : url;
    };

    return (
        <div className="bg-white rounded-lg shadow-sm">
            <div className="divide-y">
                {data.map((test) => (
                    <div
                        key={test.id}
                        className="p-4 hover:bg-gray-50 transition-colors duration-150"
                    >
                        <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-4">
                                <div className="w-12 h-12 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center">
                                    <Brain className="w-6 h-6" />
                                </div>
                                <div className="space-y-2">
                                    <div className="flex items-center space-x-2">
                                        <h4 className="font-medium text-gray-900">
                                            Test #{test.id}
                                        </h4>
                                        <span
                                            className={`px-2 py-1 rounded-full text-xs font-medium ${
                                                test.estado
                                                    ? "bg-green-100 text-green-800"
                                                    : "bg-red-100 text-red-800"
                                            }`}
                                        >
                                            {test.estado
                                                ? "Activo"
                                                : "Inactivo"}
                                        </span>
                                    </div>
                                    <div className="space-y-1">
                                        <div className="flex items-center space-x-2 text-sm text-gray-500">
                                            <Link className="w-4 h-4" />
                                            <a
                                                href={test.url}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="hover:text-primary"
                                            >
                                                {truncateUrl(test.url)}
                                                <ExternalLink className="w-3 h-3 inline ml-1" />
                                            </a>
                                        </div>
                                        <p className="text-sm text-gray-600">
                                            {test.descripcion}
                                        </p>
                                    </div>
                                </div>
                            </div>
                            <div className="flex space-x-2">
                                <button
                                    className={`p-2 rounded-full ${
                                        test.estado
                                            ? "text-green-600 hover:bg-green-50"
                                            : "text-red-600 hover:bg-red-50"
                                    }`}
                                >
                                    {test.estado ? (
                                        <CheckCircle className="w-5 h-5" />
                                    ) : (
                                        <AlertCircle className="w-5 h-5" />
                                    )}
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            <div className="p-4 border-t bg-gray-50">
                <span className="text-gray-600 text-sm font-medium float-end">
                    Mostrando {data.length} tests
                </span>
            </div>
        </div>
    );
};

export default TestsCard;
