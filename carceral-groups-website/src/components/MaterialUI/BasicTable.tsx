import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { useState } from 'react';

type tableHeader = {
    name: string;
    props?: {
        align?: "right" | "left" | "center" | "inherit" | "justify" | undefined;
    }

}

type BasicTableProps = {
    tableHeaderInfo: tableHeader[];
    primaryKeyName?: string;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    rows: any[];
    handleTableRowClick: (rowId: string) => void;
}

export default function BasicTable(props: BasicTableProps) {
    const { tableHeaderInfo, primaryKeyName = "id", rows, handleTableRowClick } = props;

    const [selectedRow, setSelectedRow] = useState<string>('');

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const handleClick = (_event: any, rowId: string) => {
        setSelectedRow(rowId);
        handleTableRowClick(rowId)
    }

    const isSelected = (rowId: string) => {
        return selectedRow === rowId;
    }

    return (
        <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                    <TableRow>
                        {tableHeaderInfo.map((headerInfo) => (
                            <TableCell key={headerInfo.name} {...headerInfo.props}>{headerInfo.name}</TableCell>
                        ))}
                    </TableRow>
                </TableHead>
                <TableBody>
                    {rows.map((row, index) => (
                        <TableRow
                            key={index}
                            onClick={(event) => handleClick(event, row[primaryKeyName].toString())}
                            selected={isSelected(row[primaryKeyName].toString())}
                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            hover
                        >
                            {Object.keys(row).map((key) => {
                                return (
                                    <TableCell key={key}>{row[key]}</TableCell>
                                )
                            })}
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}
