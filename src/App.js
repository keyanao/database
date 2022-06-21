import React, { useEffect, useState } from "react";
import './index.css';
import { db } from './firebase';
import {getDocs, getDoc} from "firebase/firestore";
import { doc, addDoc, deleteDoc, onSnapshot, collection, query } from "firebase/firestore";
import { async } from "@firebase/util";

// // TODO: Replace the following with your app's Firebase project configuration
// const firebaseConfig = {
//     //...
//   };
  

function InputInfo(props){ //入力
    const [name, setName] = useState("");
    const [age, setAge] = useState("");
   

    function CreateUser(name, age, setName, setAge){ //送る
        addDoc(collection(db, "userInfo"),{//オブジェクトにしてデータベースに送る
            name: name,
            age: age,
        })
        SemiVeiw(props.setData);
        setName("")
        setAge("")
    }

    return(
        <>
        <p>個人情報</p>
        <input type="text" id="name" value={name} requiredminlength="2" size="20" placeholder='名前' onChange={(e)=> setName(e.target.value)}/> {/* //onChange以降でvalueの値変更 */}
        <input type="text" id="age" value={age} requiredminlength="2" size="10" placeholder='年齢' onChange={(e)=> setAge(e.target.value)}/>
        <button onClick={() => CreateUser(name, age, setName, setAge)}>new</button>
        </>
    )
}


async function DeleteUser(index, data, setdata){
    await deleteDoc(doc(db, "userInfo", data[index][2]))
    setdata(data.filter((_,i) => i !== index))
    // console.log(data[index][2])
}

async function SemiVeiw(setData){//データ受け取り
    const querySnapshot = await getDocs(collection(db, "userInfo"));
    const n =[]
    querySnapshot.forEach((doc)=>{
        n.push(
            [doc.data().name, doc.data().age, doc.id]//オブジェクト
        );
    });
    // console.log(n)
    setData(n)
}

function VeiwUserAccount(props){ //データ表示
    console.log(props)
    return (
        <>
            <p>情報一覧</p>
            <table border="1" width="500">
                <tr>
                    <td>名前</td>
                    <td>年齢</td>
                </tr>
                <DataUpdate data = {props.data} setData= {props.setData}/>
            </table>
        </>
    )
}


function DataUpdate(props){
    return(
        <>
            {props.data.map((d, i)=>
                    <tr key={`account_${i}`}>
                        <td>{props.data[i][0]}</td>
                        <td>{props.data[i][1]}</td>
                        <td><button onClick={()=> DeleteUser(i, props.data, props.setData)}>delete</button></td>
                    </tr>
            )}
        </>
    )
}



export default function Personal(){
    const [data, setData] = useState([])
    useEffect(() => {SemiVeiw(setData)} ,[]);
    return(
        <div>
            <InputInfo setData={setData} data={data}/>
            <VeiwUserAccount setData={setData} data={data}/>    
        </div>
    )
}
