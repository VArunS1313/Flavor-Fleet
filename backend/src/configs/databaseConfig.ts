import {connect,ConnectOptions} from 'mongoose'

export const dbConnect=()=>{
    connect(process.env.Mongo_URI!,{
        useNewUrlParser: true,
        
    } as ConnectOptions).then(
        () => console.log("connect successfully with data base"),
        (error) => console.log(error))
}