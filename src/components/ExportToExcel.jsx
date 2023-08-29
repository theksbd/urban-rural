import { Button } from '@mui/material';
import FileSaver from 'file-saver';
import PropTypes from 'prop-types';
import * as xlsx from 'xlsx';
import '../styles/ExportToExcel.css';

const ExportToExcel = ({ data, fileName }) => {
  const fileType =
    'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
  const fileExtension = '.xlsx';

  const exportToCSV = (data, fileName) => {
    const ws = xlsx.utils.json_to_sheet(data);
    const wb = { Sheets: { data: ws }, SheetNames: ['data'] };
    const excelBuffer = xlsx.write(wb, { bookType: 'xlsx', type: 'array' });
    const dataToSave = new Blob([excelBuffer], { type: fileType });
    FileSaver.saveAs(dataToSave, fileName + fileExtension);
  };

  return (
    <Button
      variant='outlined'
      className='btn-export-excel'
      onClick={() => exportToCSV(data, fileName)}
    >
      Export
    </Button>
  );
};

ExportToExcel.propTypes = {
  data: PropTypes.array.isRequired,
  fileName: PropTypes.string.isRequired
};

export default ExportToExcel;
