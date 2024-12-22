import React from "react";
import ExcelJS from "exceljs";

function ImportForm({ onNext, onDataLoad, modalRef }) {
    const handleFileChange = async (event) => {
        const file = event.target.files[0];
        if (file) {
            const workbook = new ExcelJS.Workbook();
            const reader = new FileReader();
            reader.onload = async (e) => {
                const buffer = e.target.result;
                await workbook.xlsx.load(buffer);
                const worksheet = workbook.getWorksheet(1);
                const data = [];
                worksheet.eachRow((row, rowNumber) => {
                    if (rowNumber > 1) {
                        const getCellValue = (cell) => {
                            if (
                                cell &&
                                typeof cell.value === "object" &&
                                cell.value !== null
                            ) {
                                return String(cell.value.text || "");
                            }
                            return String(cell?.value || "");
                        };

                        const rowData = {
                            nombres: getCellValue(row.getCell(2)),
                            apellidos: getCellValue(row.getCell(3)),
                            cedula: getCellValue(row.getCell(4)),
                            email: getCellValue(row.getCell(5)),
                            telefono: getCellValue(row.getCell(6)),
                            rol: "DOCENTE",
                        };
                        data.push(rowData);
                    }
                });

                onDataLoad(data);
                onNext();
            };
            reader.readAsArrayBuffer(file);
        }
    };

    return (
        <div>
            <form>
                <div className="container mx-auto p-5 flex justify-center mt-14">
                    <input
                        type="file"
                        accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"
                        className="file-input file-input-bordered file-input-accent file-input-sm w-full max-w-xs"
                        onChange={handleFileChange}
                    />
                </div>
            </form>
            <div className="flex justify-end mt-6">
                <button
                    className="btn btn-warning mt-4"
                    onClick={() => modalRef.current.closeModal()}
                >
                    Cancelar
                </button>
            </div>
        </div>
    );
}

export default ImportForm;
