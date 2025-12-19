import { useContext, useEffect } from "react";
import { fetchUserCategories } from "../slices/category-slice";
import { fetchUserExpenses } from "../slices/expense-slice";
import UserContext from "../context/UserContext";
import { useDispatch, useSelector } from 'react-redux';

export default function Dashboard(props) {
    const dispatch = useDispatch();
    // const categoryData = useSelect((state) => { return state.category.data })
    const { data: categoryData } = useSelector((state) => {
        return state.category
    })
   
    const { data: expenseData } = useSelector((state) => {
        return state.expense
    })
    
    // const [category, expenses] = useSelector((state) => {
    //     return [state.category, state.expenses]
    // })

    const { user } = useContext(UserContext);

    // useEffect(() => {
    //     if(localStorage.getItem('token')) {
    //         // make api call to get the categories data  and expense data of that user
    //         dispatch(fetchUserCategories());
    //         dispatch(fetchUserExpenses());
    //     }
    // }, [dispatch])

    if(!user) {
        return <p>loading...</p>
    }

    return(
        <div>
            <h2>Dashboard page component</h2>
            <p>welcome, { user.username }</p>
            <p>Total Categories - {categoryData.length}</p>
            <p>Total Expenses - {expenseData.length}</p>
        </div>
    )
}