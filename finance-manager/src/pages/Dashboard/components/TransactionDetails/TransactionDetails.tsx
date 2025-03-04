import {
    createColumnHelper,
    flexRender,
    getCoreRowModel,
    useReactTable,
} from "@tanstack/react-table";
import { Transaction } from "models";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import "./TransactionDetails.css";

const columnHelper = createColumnHelper<Transaction>();

const columns = [
    columnHelper.accessor("date", {
        header: () => <span>Fecha</span>,
        cell: (info) => <span>{info.getValue()}</span>,
        footer: (info) => info.column.id,
    }),
    columnHelper.accessor("category", {
        header: () => <span>Categoría</span>,
        cell: (info) => info.getValue(),
        footer: (info) => info.column.id,
    }),
    columnHelper.accessor("amount", {
        header: () => <span>Cantidad</span>,
        cell: (info) => <span>{info.getValue()}</span>,
        footer: (info) => info.column.id,
    }),
    columnHelper.accessor("description", {
        header: () => <span>Descripción</span>,
        cell: (info) => info.getValue(),
        footer: (info) => info.column.id,
    }),
    columnHelper.accessor("notes", {
        header: () => <span>Notas</span>,
        cell: (info) => <span>{info.getValue()}</span>,
        footer: (info) => info.column.id,
    }),
];

interface Props {
    type: string;
}

export default function TransactionDetails({ type }: Props) {
    const transactions: Transaction[] = useSelector(
        (store) => store.transaction
    );

    const [data, setData] = useState<Transaction[]>([]);

    const getTransactionsByType = (type: string) => {
        const filteredTransactions = transactions.filter(
            (transaction) => transaction.transactionType === type
        );

        setData(filteredTransactions);
    };

    useEffect(() => {
        getTransactionsByType(type);
    }, [transactions]);

    const table = useReactTable({
        data,
        columns,
        getCoreRowModel: getCoreRowModel(),
        enableColumnResizing: true,
        columnResizeMode: "onChange",
        debugTable: true,
        debugHeaders: true,
        debugColumns: true,
    });

    return (
        <div>
            <table className="tx-details-table">
                <thead>
                    {table.getHeaderGroups().map((headerGroup) => (
                        <tr key={headerGroup.id}>
                            {headerGroup.headers.map((header) => (
                                <th
                                    key={header.id}
                                    colSpan={header.colSpan}
                                    style={{
                                        position: "relative",
                                        width: header.getSize(),
                                    }}
                                >
                                    {header.isPlaceholder
                                        ? null
                                        : flexRender(
                                              header.column.columnDef.header,
                                              header.getContext()
                                          )}
                                    {header.column.getCanResize() && (
                                        <div
                                            onMouseDown={header.getResizeHandler()}
                                            onTouchStart={header.getResizeHandler()}
                                            className={`resizer ${
                                                header.column.getIsResizing()
                                                    ? "isResizing"
                                                    : ""
                                            }`}
                                        ></div>
                                    )}
                                </th>
                            ))}
                        </tr>
                    ))}
                </thead>
                <tbody>
                    {table.getRowModel().rows.map((row) => (
                        <tr key={row.id}>
                            {row.getVisibleCells().map((cell) => (
                                <td
                                    key={cell.id}
                                    style={{ width: cell.column.getSize() }}
                                >
                                    {flexRender(
                                        cell.column.columnDef.cell,
                                        cell.getContext()
                                    )}
                                </td>
                            ))}
                        </tr>
                    ))}
                </tbody>
                <tfoot></tfoot>
            </table>
        </div>
    );
}
