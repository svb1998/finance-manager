import { useMemo } from "react";
import { useSelector } from "react-redux";
import { Transaction } from "../models";

/**
 * Custom hook to calculate balance
 * @returns the current balance
 */
const useBalance = () => {
    const transactions: Transaction[] = useSelector(
        (state) => state.transaction
    );

    // Variant with useEffect + useState
    // const [balance, setBalance] = useState(0);

    // const getBalance = () => {
    //     setBalance(
    //         transactions.reduce(
    //             (prev, curr) =>
    //                 curr.transactionType === "income"
    //                     ? prev + curr.amount
    //                     : prev - curr.amount,
    //             0
    //         )
    //     );
    // };

    // useEffect(() => {
    //     getBalance();
    // }, [transactions]);

    //Variant with useMemo
    const balance = useMemo(() => {
        return transactions.reduce(
            (prev, curr) =>
                curr.transactionType === "income"
                    ? prev + curr.amount
                    : prev - curr.amount,
            0
        );
    }, [transactions]);

    return balance;
};

export default useBalance;
