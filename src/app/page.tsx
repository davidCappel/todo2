import NavBar from "@/components/NavBar";
import { InputForm } from "@/components/addTodo";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { CiSquarePlus } from "react-icons/ci";
import { zodResolver } from "@hookform/resolvers/zod";

import{ v4 as uuidv4 } from 'uuid';

import { useState } from "react";
import React from "react";


export default function Home() {
  //const [todos, setTodos] = React.useState<{id: string; label:string}[]>([]);



  return (
    <>
      <div className=" py-[180px] w-[75%] mx-7 " >
        <div className="flex w-full gap-20 justify-center items-center space-x-2">
          {/* <Input type="email" placeholder="...todos here " className=" shadow-xl ring-1 ring-slate-600 "/>
          <Button className=" shadow-lg "><CiSquarePlus className=" scale-[200%] "/></Button> */}
          <InputForm 
          />
        

        </div>
      </div>
    </>
  );
}
