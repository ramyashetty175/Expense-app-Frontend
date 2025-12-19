import CategoryForm from "./CategoryForm";
import CategoryList from "./CategoryList";
import { useSelector } from "react-redux";

export default function CategoryContainer(props) {
    const { data } = useSelector((state) => {
        return state.category;
    })

    return(
        <div>
            <h3>Listing Categories - {data.length} </h3>
            <CategoryList/>
            <CategoryForm/>
        </div>
    )
}
