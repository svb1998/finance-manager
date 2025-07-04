import { Temporal } from "@js-temporal/polyfill";
import {
    createColumnHelper,
    flexRender,
    getCoreRowModel,
    useReactTable,
} from "@tanstack/react-table";
import { CircleX } from "lucide-react";
import { AnimatePresence } from "motion/react";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Dialog from "../../../../components/Layout/Dialog/Dialog";
import EditTransaction from "../../../../components/Layout/Transactions/EditTransaction/EditTransaction";
import Modal from "../../../../Modal";
import { Transaction } from "../../../../models";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { capitalizeString } from "../../../../utilities/capitalizeString.utility";
import { setTextColor } from "../../../../utilities/setTextColor.utility";
import { removeTransaction } from "../../services/Transactions.service";
import "./TransactionDetails.css";

const columnHelper = createColumnHelper<Transaction>();

interface Props {
    type: string;
}

export default function TransactionDetails({ type }: Props) {
    const queryClient = useQueryClient();

    const transactions: Transaction[] = useSelector((store) => {
        return store.transaction;
    });

    const [data, setData] = useState<Transaction[]>([]);

    const { mutate: handleRemoveTx } = useMutation({
        mutationFn: async (row: Transaction) => {
            return deleteTransaction(row);
        },
        onSuccess: () => {
            queryClient.invalidateQueries(["transactions"]);
            closeDeleteRowDialog();
        },
    });

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
        columnHelper.accessor("txDate", {
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
                const categoryData = info.cell.row.original.category;

                const label = categoryData.label;
                const backgroundColor = categoryData.backgroundColor;

                const capitalizedCategory = capitalizeString(label ?? "");
                return (
                    <span
                        style={{
                            backgroundColor: backgroundColor,
                            color: setTextColor(backgroundColor),
                        }}
                        className="tx-table-cell category-chip"
                    >
                        {capitalizedCategory ?? "Sin categoría"}
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
            (transaction) => transaction.type === type
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

    const deleteTransaction = async (row: Transaction) => {
        if (row.transactionId) {
            const transactionId = row.transactionId;
            console.log("tx", transactionId);
            // dispatch(removeTransaction(row.transactionId));
            const result = await removeTransaction(transactionId);
            return result;
        }
    };

    return (
        <div className="tx-table-container">
            <AnimatePresence>
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
                            handleRemoveTx(rowToDelete);
                        }}
                    />
                )}
            </AnimatePresence>
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
