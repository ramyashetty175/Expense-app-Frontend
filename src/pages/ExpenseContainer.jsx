import { useSelector } from "react-redux";
import ExpenseForm from "./ExpenseForm";
import ExpenseList from "./ExpenseList";
import ExpenseTable from "./ExpenseTable";

export default function ExpenseContainer() {
    const { data } = useSelector((state) => {
        return state.expense;
    })
    return(
        <div>
            <h2>Listing Expenses - {data.length} </h2>
            <ExpenseTable />
            <ExpenseForm />
            <ExpenseList />
        </div>
    )
}