import React from "react";

const DataTableAssignment = ({ title, buttonLabel, data, onButtonClick }) => {
    const hasData = data && data.headers && data.rows;

    return (
        <div className="card bg-white shadow-lg">
            <div className="card-body">
                <h2 className="card-title flex justify-between items-center">
                    <span>{title}</span>
                    <button
                        className="btn btn-primary btn-sm"
                        onClick={onButtonClick}
                    >
                        {buttonLabel}
                    </button>
                </h2>
                <div className="overflow-x-auto">
                    <table className="table table-zebra">
                        <thead>
                            <tr>
                                {hasData ? (
                                    data.headers.map((header, index) => (
                                        <th key={index}>{header}</th>
                                    ))
                                ) : (
                                    <th>No hay datos</th>
                                )}
                            </tr>
                        </thead>
                        <tbody>
                            {hasData ? (
                                data.rows.map((row, rowIndex) => (
                                    <tr key={rowIndex}>
                                        {row.map((cell, cellIndex) => (
                                            <td key={cellIndex}>{cell}</td>
                                        ))}
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td
                                        colSpan={
                                            data && data.headers
                                                ? data.headers.length
                                                : 1
                                        }
                                    >
                                        No hay datos
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default DataTableAssignment;
