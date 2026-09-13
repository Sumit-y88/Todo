export async function loginUser(email: string,password:string){
    const response  = await fetch("api/auth/login",{
        method:"POST",
        headers:{
            "Content-Type":"application/json"
        },
        body:JSON.stringify({email,password})
    })
    const data  = await response.json();
    if(!response.ok){
        throw new Error(data.error || "Something went wrong");
    }
    return data;
}

export async function registerUser(name: string,email:string, password:string){
    const response = await fetch("api/auth/register",{
        method: "POST",
        headers:{
            "Content-Type":"application/json"
        },
        body:JSON.stringify({name,email,password})
    })
    const data = await response.json();
    if(!response.ok){
        throw new Error(data.error || "Something went wrong");
    }
    return data;
}