import { Button } from '@mui/material';
import FileSaver from 'file-saver';
import PropTypes from 'prop-types';
import * as xlsx from 'xlsx';
import '../styles/ExportToExcel.css';

const ExportToExcel = ({ dataToExport, fileName }) => {
  const fileType =
    'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
  const fileExtension = '.xlsx';

  const exportToCSV = (dataToExport, fileName) => {
    const ws = xlsx.utils.json_to_sheet(dataToExport);
    const wb = { Sheets: { data: ws }, SheetNames: ['data'] };
    const excelBuffer = xlsx.write(wb, { bookType: 'xlsx', type: 'array' });
    const data = new Blob([excelBuffer], { type: fileType });
    FileSaver.saveAs(data, fileName + fileExtension);
  };

  return (
    <Button
      variant='outlined'
      className='btn-export-excel'
      onClick={() => exportToCSV(dataToExport, fileName)}
    >
      Export
    </Button>
  );
};

ExportToExcel.propTypes = {
  dataToExport: PropTypes.array.isRequired,
  fileName: PropTypes.string.isRequired
};

export default ExportToExcel;
