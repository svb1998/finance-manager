import { Temporal } from "@js-temporal/polyfill";
import "./TransactionDetails.css";
import {
    createColumnHelper,
    flexRender,
    getCoreRowModel,
    useReactTable,
} from "@tanstack/react-table";
import { Category, Transaction } from "../../../../models";
import { ReactNode, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { capitalizeString } from "../../../../utilities/capitalizeString.utility";
import { CircleX } from "lucide-react";
import { removeTransaction } from "../../../../redux/states/transaction";
import Dialog from "../../../../components/Layout/Dialog/Dialog";
import Modal from "../../../../Modal";
import OutlineButton from "../../../../components/Button/OutlineButton/OutlineButton";
import MainButton from "../../../../components/Button/MainButton/MainButton";
import EditTransaction from "../../../../components/Layout/Transactions/EditTransaction/EditTransaction";

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

    /**DELETE ROW DIALOG */

    const [rowToDelete, setRowToDelete] = useState<Transaction | null>(null);

    /**
     * Function that opens the Dialog to confirm delete
     */
    const openDeleteRowDialog = (row: Transaction, e: React.MouseEvent) => {
        e.stopPropagation();
        setRowToDelete(row);
    };

    /**
     * Function that closes the Dialog to confirm delete
     */
    const closeDeleteRowDialog = () => {
        setRowToDelete(null);
    };

    /**EDIT ROW MODAL */

    const [rowToEdit, setRowToEdit] = useState<Transaction | null>(null);

    const openEditRowModal = (row: Transaction) => {
        setRowToEdit(row);
    };

    const closeEditRowModal = () => {
        setRowToEdit(null);
    };

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
                    <>
                        <span
                            className="tx-table-cell delete-icon"
                            onClick={(e: React.MouseEvent<HTMLDivElement>) => {
                                openDeleteRowDialog(row, e);
                            }}
                        >
                            <CircleX color="currentColor" size={"1.2em"} />
                        </span>
                    </>
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

        closeDeleteRowDialog();
    };

    return (
        <div>
            {rowToEdit && (
                <Modal
                    onClose={closeEditRowModal}
                    onOverlayClose
                    title="Editar transacción"
                >
                    <div style={{ color: "white" }}>
                        <EditTransaction
                            onCloseModal={closeEditRowModal}
                            transaction={rowToEdit}
                        />
                    </div>
                </Modal>
            )}
            {rowToDelete && (
                <Dialog
                    onOverlayClose
                    onClose={closeDeleteRowDialog}
                    title="¿Desea eliminar la transacción?"
                    subtitle="¡Cuidado! Esta acción no se puede deshacer."
                    message=""
                    cancelButton="Cancelar"
                    actionButton="Eliminar"
                    mainAction={() => {
                        deleteTransaction(rowToDelete);
                    }}
                />
            )}
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
                        <tr
                            key={row.id}
                            onClick={(e: React.MouseEvent) => {
                                const target = e.target as HTMLElement;
                                if (target.closest(".delete-icon")) {
                                    return;
                                }

                                const selectedRow = row.original;
                                openEditRowModal(selectedRow);
                            }}
                        >
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
