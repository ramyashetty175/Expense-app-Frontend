import { useDispatch, useSelector } from "react-redux"
import { removeCategory ,assignEditId, resetEditId } from "../slices/category-slice";
import { useEffect } from "react";

export default function CategoryList() {
    const dispatch = useDispatch();
    const { data: categoryData, editId } = useSelector((state)=> {
        return state.category;
    })
 
    // useEffect(() => {
    //     console.log('component mounted');
    //     return () => { // callback will  be called when a component unmounts
    //             console.log("component unmounted");
    //         }
    // }, [])

    // call function when components unmount
    // set editId to null ,when the user navigates from the page
    useEffect(() => {
            return () => {
                console.log("component unmounted")
                // dispatch(assignEditId(null))  //cleanup code
                dispatch(resetEditId());
            }
    }, []) 

    const handleRemove = (id) => {
        const userConfirm = window.confirm("Are you sure?");
        if(userConfirm) {
            // dispatch(removeUser(id));
            console.log("dispatch remove user")
            dispatch(removeCategory(id));
        }
    }

    const handleCancel = () => {
        dispatch(resetEditId());
    }

    return(
        <div>
            <ul>
            { categoryData.map((ele) => {
                return(
                   <li key={ele._id}>{ele.name}<button onClick={() => {
                       dispatch(assignEditId(ele._id))
                    }}>edit</button><button onClick={() => {
                       handleRemove(ele._id)
                    }}>remove</button>
                    { ele._id == editId && <button onClick={() => {
                        handleCancel(ele._id)
                    }}>cancel</button> }
                   </li>
                )
            })}
            </ul>
        </div>
    )
}