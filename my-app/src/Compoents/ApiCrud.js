import React,{useEffect, useState} from "react";
import '../Compoents/ApiCrud.css';

// icons

// import { TbGridDots } from "react-icons/tb";
// import { AiFillCloseCircle } from "react-icons/ai";


function ApiCrud(){

//     const [active,setActive] = useState('coolinput')

//     ////// function to show navbar
//   const showNav = () =>{
//     setActive(' ')
//   }
//   ///function to close navbar
//   const removeNavbar =() =>{
//     setActive('  ')
//   }

   
    const [data,setdata] = useState([]);

    //////

    const [name,setName] = useState('');
    const [email,setEmail] = useState('');
    const [address,setAddress] = useState('');

    const [editUser,setEditUser] = useState(null);


    useEffect(()=>{
        fetch("https://jsonplaceholder.typicode.com/users")
        .then((response)=> response.json())
        .then((userdata)=> setdata(userdata))
        .catch((err)=>console.log(err)) 
    },[])

        
        function handleUserDate(){

            const userName = name.trim();
            const userEmail = email.trim();
            const userAddress = address.trim();
                if(userName && userEmail && userAddress){
                     if(editUser){
                        ///add user 
                        fetch(`https://jsonplaceholder.typicode.com/users/${editUser.id}`,{
                            method : "PUT",
                            headers:{
                                "Content-Type":"application/json;charset=UTF-8",
                            },
                            body:JSON.stringify({
                                name:userName,
                                email:userEmail,
                                address:{
                                    city:userAddress,
                                },
                            })  
                        })
                        .then((res) => res.json())
                        .then((updatedUser) => setdata(data.map((user) => user.id === updatedUser.id ? updatedUser : user)))

                        setEditUser(null);
                        setName(" ");
                        setEmail("");
                        setAddress(" ");
                    }
                        else{
                            fetch(`https://jsonplaceholder.typicode.com/users`,{
                               method : "POST",
                               headers:{
                                "Content-Type":"application/json;charset=UTF-8"},
                                body:JSON.stringify({
                                    name:userName,
                                    email:userEmail,
                                    address:{
                                        city:userAddress,
                                    },

                                })
                                
                            })
                            .then((res) => res.json())
                            .then((newUser) => setdata([...data,newUser]))
                             
                            setEditUser(null);
                            setName(" ");
                            setEmail("");
                            setAddress(" ");
                        }
                        
                      
                }
                
        
        }
        function handleEdit(user){
            setName(user.name);
            setEmail(user.email);
            setAddress(user.address.city);
            setEditUser(user);
       }

       function handleDelete(id){
        fetch(`https://jsonplaceholder.typicode.com/users/${id}`,{
             method:"DELETE",

        })
        .then(() => setdata(data.filter(predate => predate.id !== id)))
       }
    return(
        <div className="curddiv">
         
           
           

            {/* <div onClick={removeNavbar} className="closeNavbar">
            <AiFillCloseCircle  className='icon'/>
            
            </div>
            
            <div onClick={showNav} className="toggleNavbar">
            <TbGridDots className='icon' />
            </div> */}


            
          <h1> CURD PAGE </h1>
              <div className="coolinput">
            <label className="text">Enter User Name</label>
                <input type="text" placeholder="Enter Your Name" className="input" value={name} 
                onChange={(e)=> setName(e.target.value)} />
                 
                <br></br>

                <label className="text" >Enter User Email</label>
                   <input type="text" placeholder="Enter Your Email" className="input" value={email} 
                   onChange={(e) => setEmail(e.target.value)} />

                   <br></br>

                    <label className="text" >Enter Your Address</label> 
                       <input type="text" placeholder="Enter Your Address" className="input" value={address}
                       onChange={(e) => setAddress(e.target.value)} /> 
                          
                       <br></br>

                       <button className="button" onClick={handleUserDate}> {editUser ? "Edit User Date" : "Add New Date" }
                       </button>
                      </div>

          <table  className="tableapi"border={1}>
            <tbody>

                <tr>
                    <th>USER ID</th>
                    <th>USER NAME</th>
                    <th>USER EMAIL</th>
                    <th>USER ADDRESS</th>
                    {/* <th>USER ZIPCODE</th> */}
                    
                    {/* <th>Suite</th> */}
                    <th>Update</th>
                    
                    

                </tr>
            </tbody>
                   <tbody>

                         {data.map((user,index)=>{
                            return(
                                <tr key={index}>
                                    <td>{index +1 }</td>
                                    <td>{user.name}</td>
                                    <td>{user.email}</td>
                                    <td>{user.address.city}</td>
                                    {/* <td>{user.address.zipcode}</td>
                                    <td>{user.address.suite}</td> */}

                                    <td>
                                        <button className="edit-button" onClick={() => handleEdit(user)}>
                                             <svg class="edit-svgIcon" viewBox="0 0 512 512">
                                                 <path d="M410.3 231l11.3-11.3-33.9-33.9-62.1-62.1L291.7 89.8l-11.3 11.3-22.6 22.6L58.6 322.9c-10.4 10.4-18 23.3-22.2 37.4L1 480.7c-2.5 8.4-.2 17.5 6.1 23.7s15.3 8.5 23.7 6.1l120.3-35.4c14.1-4.2 27-11.8 37.4-22.2L387.7 253.7 410.3 231zM160 399.4l-9.1 22.7c-4 3.1-8.5 5.4-13.3 6.9L59.4 452l23-78.1c1.4-4.9 3.8-9.4 6.9-13.3l22.7-9.1v32c0 8.8 7.2 16 16 16h32zM362.7 18.7L348.3 33.2 325.7 55.8 314.3 67.1l33.9 33.9 62.1 62.1 33.9 33.9 11.3-11.3 22.6-22.6 14.5-14.5c25-25 25-65.5 0-90.5L453.3 18.7c-25-25-65.5-25-90.5 0zm-47.4 168l-144 144c-6.2 6.2-16.4 6.2-22.6 0s-6.2-16.4 0-22.6l144-144c6.2-6.2 16.4-6.2 22.6 0s6.2 16.4 0 22.6z"></path>
                                            </svg> 
                                            </button>



                                        <button className="delete-button" onClick={()=> handleDelete(user.id)}>
                                        <svg class="delete-svgIcon" viewBox="0 0 448 512">
                                            <path d="M135.2 17.7L128 32H32C14.3 32 0 46.3 0 64S14.3 96 32 96H416c17.7 0 32-14.3 32-32s-14.3-32-32-32H320l-7.2-14.3C307.4 6.8 296.3 0 284.2 0H163.8c-12.1 0-23.2 6.8-28.6 17.7zM416 128H32L53.2 467c1.6 25.3 22.6 45 47.9 45H346.9c25.3 0 46.3-19.7 47.9-45L416 128z"></path>
                                                  </svg>
                                            

                                            </button>
                                    </td>
                                </tr>
                            )
                         })}
                   </tbody>


            
          </table>

        </div>
    )
        }

export default ApiCrud;
