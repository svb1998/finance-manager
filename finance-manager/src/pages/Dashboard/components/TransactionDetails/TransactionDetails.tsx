import { Temporal } from "@js-temporal/polyfill";
import "./TransactionDetails.css";
import {
    createColumnHelper,
    flexRender,
    getCoreRowModel,
    useReactTable,
} from "@tanstack/react-table";
import { Category, Transaction } from "models";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { capitalizeString } from "utilities";
import { CircleX } from "lucide-react";
import { removeTransaction } from "../../../../redux/states/transaction";

const columnHelper = createColumnHelper<Transaction>();

interface Props {
    type: string;
}

export default function TransactionDetails({ type }: Props) {
    const dispatch = useDispatch();

    const transactions: Transaction[] = useSelector(
        (store) => store.transaction
    );

    const categories: Category[] = useSelector((state) => state.category);

    const [data, setData] = useState<Transaction[]>([]);

    const columns = [
        columnHelper.accessor("date", {
            header: () => <span>Fecha</span>,
            cell: (info) => {
                let formattedDate = "";

                const date = info.getValue();

                if (date) {
                    formattedDate = Temporal.Instant.from(date)
                        .toZonedDateTimeISO("UTC")
                        .toLocaleString("es-ES", {
                            day: "2-digit",
                            month: "2-digit",
                            year: "numeric",
                        });
                }

                return <span>{formattedDate}</span>;
            },
            footer: (info) => info.column.id,
        }),
        columnHelper.accessor("category", {
            header: () => <span>Categoría</span>,
            cell: (info) => {
                const category = info.cell.row.original.category;
                const capitalizedCategory = capitalizeString(category);
                return (
                    <span
                        style={{
                            backgroundColor: categories.find(
                                (cat) => cat.value === category
                            )?.backgroundColor,
                        }}
                        className="tx-table-cell category-chip"
                    >
                        {capitalizedCategory}
                    </span>
                );
            },
            footer: (info) => info.column.id,
        }),
        columnHelper.accessor("amount", {
            header: () => <span>Cantidad</span>,
            cell: (info) => (
                <span className="tx-table-cell">{info.getValue()}€</span>
            ),
            footer: (info) => info.column.id,
        }),
        columnHelper.accessor("description", {
            header: () => <span>Descripción</span>,
            cell: (info) => (
                <span className="tx-table-cell">{info.getValue()}</span>
            ),
            footer: (info) => info.column.id,
        }),
        columnHelper.accessor("notes", {
            header: () => <span>Notas</span>,
            cell: (info) => (
                <span className="tx-table-cell">{info.getValue()}</span>
            ),
            footer: (info) => info.column.id,
        }),
        columnHelper.display({
            id: "delete",
            header: () => <span></span>,
            cell: (info) => {
                const row = info.cell.row.original;

                return (
                    <span
                        className="tx-table-cell delete-icon"
                        onClick={() => {
                            console.log("delete", row);
                            deleteTransaction(row);
                        }}
                    >
                        <CircleX color="currentColor" size={"1.2em"} />
                    </span>
                );
            },
            footer: (info) => info.column.id,
        }),
    ];

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
        // debugTable: true,
        // debugHeaders: true,
        // debugColumns: true,
    });

    const deleteTransaction = (row: Transaction) => {
        if (row.id) {
            dispatch(removeTransaction(row.id));
        }
    };

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
