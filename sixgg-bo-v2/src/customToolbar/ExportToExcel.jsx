import { saveAs } from 'file-saver';
import * as XLSX from 'xlsx';

export const ExportToExcel = ({filename, sheetname, data}) => {
    try {
        const workbook = XLSX.utils.book_new();
        // Define sheet names and data for each table
        const sheets = sheetname;

        sheets.forEach(({ name, tableId }) => {
            // Create a new worksheet
            const worksheet = XLSX.utils.json_to_sheet(data);

            // Add the worksheet to the workbook
            XLSX.utils.book_append_sheet(workbook, worksheet, name);
        });

        // Generate the Excel file
        const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });

        // Save the file
        const excelBlob = new Blob([excelBuffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
        saveAs(excelBlob, `${filename}.xlsx`);

    } catch(error) {
        console.log("🚀 ~ ExportToExcel ~ error:", error)
    }
};

export const MultipleExportToExcel = ({filename, sheetname}) => {
    try {
        const workbook = XLSX.utils.book_new();
        // Define sheet names and data for each table
        const sheets = sheetname;

        sheets.forEach(({ name, tableId }) => {
            // Get the table element
            const table = document.getElementById(tableId);

            // Convert the table to a worksheet
            const worksheet = XLSX.utils.table_to_sheet(table);

            // Add the worksheet to the workbook
            XLSX.utils.book_append_sheet(workbook, worksheet, name);
        });

        // Generate the Excel file
        const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });

        // Save the file
        const excelBlob = new Blob([excelBuffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
        saveAs(excelBlob, `${filename}.xlsx`);

    } catch(error) {
        console.log("🚀 ~ ExportToExcel ~ error:", error)
    }
};