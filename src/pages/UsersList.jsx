import { useState, useEffect, useContext } from "react";
import axios from '../config/axios.js'
import UserContext from "../context/UserContext";

export default function UsersList() {
    const { user } = useContext(UserContext);
    const [users, setUsers] = useState([]);

	useEffect(() => {
		const fetchUsersList = async () => {
			try {
				const response = await axios.get('/users', { headers: { Authorization: localStorage.getItem('token') } })
				setUsers(response.data);
			} catch (err) {
				console.log(err);
			}
		}
		fetchUsersList()
	}, [])

    if(!user) {
        return <p>loading...</p>
    }

    const handleRemove = async (id, email) => {
        const userConfirm = window.confirm("Are you sure?");
        if(userConfirm) {
            const userEmail = window.prompt("Enter email of your user");
            if(userEmail == email) {
               try {
                const response = await axios.delete(`/users/${id}`, { headers: { Authorization: localStorage.getItem('token')}})
                const newArr = users.filter(ele => ele._id != response.data._id);
                setUsers(newArr);
            } catch(err) {
                console.log(err);
            }
            } else {
                alert("Email is incorrect");
            }
        }
    }

	return (
		<div>
			<h2>Users List</h2>
			<table style={{ border: "2px solid white" }}>
				<thead>
					<tr>
						<th>Username</th>
						<th>Email</th>
						<th>Role</th>
                        { user.role == "admin" && <th>Action</th>}
					</tr>
				</thead>

				<tbody>
					{ users.map((ele) => (
						<tr key={ele._id}>
							<td style={{ border: "1px solid white", padding: "8px" }}>{ele.username}</td>
							<td style={{ border: "1px solid white", padding: "8px" }}>{ele.email}</td>
                            <td style={{ border: "1px solid white", padding: "8px" }}>{ele.role}</td>
							{ user.role == "admin" && <td style={{ border: "1px solid white", padding: "8px" }}>{user._id != ele._id && <button onClick={() => {
                                handleRemove(ele._id, ele.email)
                            }}>Remove</button>}</td> }
						</tr>
					))}
				</tbody>
			</table>
		</div>
	)
}