import { useEffect, useState } from "react";
import axios from 'axios'

export default function SearchAutoComplete(){
    const [users,setUsers] = useState([]);
    const [error, setError] = useState(false)
    const [input, setInput] = useState("");
    const [searchedUsers, setSearchedUsers] = useState([]);

    async function fetchUsers(){
        try{
            let users = await axios.get('https://dummyjson.com/users?limit=100');
            setUsers(users.data.users);
        }
        catch(err){
            console.log("Internal Server error");
            setError(true);
        }
    }

    function findUsers(){
        let usersFound = users.map(item=>{
            if((item.firstName.toLowerCase()).includes(input.toLowerCase()))
                return item.firstName;
        })
        setSearchedUsers(usersFound);
    }

    useEffect(()=>{
        fetchUsers();
    }, [])

    useEffect(()=>{
        findUsers();
    }, [input])

    if(error){
        return <div>Internal Server Error</div>
    }
    if(users.length===0){
        return<div>Loading....</div>
    }

    return(
        <div>
            <input type="text" value={input} onChange={(e)=>{setInput(e.target.value)}} placeholder="Search Users..."></input>
            {input && <div>{searchedUsers.map(item=>(<div>{item}</div>))}</div>}
        </div>
    )
}