import { useSelector } from "react-redux"
import { format } from "date-fns";

export default function ExpenseTable() {
    const { data } = useSelector((state) => {
        return state.expense;
    })

    const { data: categoryData } = useSelector((state) => {
        return state.category;
    })

    return(
        <table>
            <thead>
                <tr>
                    <th>#</th>
                    <th>Title</th>
                    <th>Expense Date</th>
                    <th>Amount</th>
                    <th>Category</th>
                </tr>
            </thead>
            <tbody>
                { data.map((ele, i) => {
                    return(
                        <tr key={ele._id}>
                            <td>{ i+1 }</td>
                            <td>{ ele.title }</td>
                            <td>{ format(new Date(ele.expenseDate), "dd/mm/yyyy")}</td>
                            <td>{ ele.amount }</td>
                            <td>{ categoryData.find(cat => cat._id == ele.category) ?.name }</td>
                        </tr>
                    )
                })}
            </tbody>
        </table>
    )
}