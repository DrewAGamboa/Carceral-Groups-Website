import React, { useState } from 'react';
import Papa from 'papaparse';
import DataRow from '../../models/DataRow';

export interface CsvUploadProps {
  handleUpload: (data: any[]) => void;
}

const CsvUpload: React.FC<CsvUploadProps> = ({handleUpload}) => {
  const [data, setData] = useState<DataRow[]>([]);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files && files[0]) {
      Papa.parse(files[0], {
        complete: (result) => {
          console.log('Parsed Result:', result);
          setData(result.data as DataRow[]);
          handleUpload(result.data);
        },
        header: true,
      });
    }
  };

  return (
    <div>
      <input type="file" accept=".csv" onChange={handleFileChange} />
      {data.length > 0 && (
        <p className="">Successfully imported files</p>
        // <table>
        //   <thead>
        //     <tr>
        //       {Object.keys(data[0]).map((header, index) => (
        //         <th key={index}>{header}</th>
        //       ))}
        //     </tr>
        //   </thead>
        //   <tbody>
        //     {data.map((row, index) => (
        //       <tr key={index}>
        //         {Object.values(row).map((value, i) => (
        //           <td key={i}>{value}</td>
        //         ))}
        //       </tr>
        //     ))}
        //   </tbody>
        // </table>
      )}
    </div>
  );
};

export default CsvUpload;
