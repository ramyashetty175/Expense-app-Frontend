// import { useContext, useState } from "react";
// import categoryContext from "./context/categoryContext";
// import axios from "./config/axios";

// export default function CategoryForm() {
//     const { serverErrMsg, categoryDispatch } = useContext(categoryContext);
//     const [name, setName] = useState("");
    
//     const handleSubmit = (e) => {
//         e.preventDefault();
//         const formData = {
//            name
//         }
//         //console.log(formData);
//         axios.post('/api/categories', formData, {
//             headers: { Authorization: localStorage.getItem("token") }
//         })
//             .then((response) => {
//                 console.log(response.data);
//                 categoryDispatch({ type: "ADD_CATEGORY", payload: response.data });
//                 setName("");
//             })
//             .catch((err) => {
//                 console.log(err);
//                 categoryDispatch({ type: "SET_SERVER_ERROR", payload: err.message });
//             })  
//     }

//     return(
//         <div>
//             <h3>Add Category</h3>
//             { serverErrMsg && <p style={{ color: 'red' }}>{serverErrMsg}</p> }
//             <form onSubmit={handleSubmit}>
//                <input type="text"
//                       name="name"
//                       value={name}
//                       onChange={(e) => {
//                         setName(e.target.value)
//                       }}
//                 /><br />
//                 <input type="submit" />
//             </form>
//         </div>
//     )
// }

import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createCategory, updateCategory } from '../slices/category-slice';

export default function CategoryForm() {
    const { errors, data, editId } = useSelector((state) => {
        return state.category;
    })
    const dispatch = useDispatch();
    const [name, setName] = useState("");
    
    const handleSubmit = (e) => {
        e.preventDefault();
        //console.log(formData);
        const formData = {
           name: name
        }
    
    const handleReset = () => {
        setName('');
    }
    if(editId) {
        // dispatch(updateCategory())
        dispatch(updateCategory({ editId, formData, handleReset }));
    } else {
        dispatch(createCategory({ formData, handleReset }));
    }
}

    useEffect(() => { // pre filling the form
        if(editId) {
           const category = data.find(ele => ele._id == editId);
           console.log('category to edit', category);
           setName(category.name);
        } else {
            setName('');
        }
    }, [editId])

    return(
        <div>
            <h2>{ editId ? 'Edit' : 'Add' } Category</h2>
            { errors && <p>{ errors }</p>}
            <form onSubmit={handleSubmit}>
               <input type="text"
                      name="name"
                      value={name}
                      onChange={(e) => {
                        setName(e.target.value)
                      }}
                /><br />
                <input type="submit" />
            </form>
        </div>
    )
}
