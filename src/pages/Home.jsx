import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { assignEditId } from "../slices/category-slice";

export default function Home(props) {
    //const dispatch = useDispatch();

    // useEffect(() => {
    //    dispatch(assignEditId(null));
    // }, [])
    
    return(
        <div>
            <h2>Home page component</h2>
        </div>
    )
}