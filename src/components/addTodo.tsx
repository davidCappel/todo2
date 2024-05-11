"use client"
import React from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

import { Button } from "@/components/ui/button"
import { CiSquarePlus } from "react-icons/ci";
import { Checkbox } from "./ui/checkbox"


import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"


import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
//import { prisma } from "@/app/db"

import {v4 as uuidv4} from 'uuid'

const FormSchema = z.object({
  input: z.string().min(1, {
    message: "Todo must be at least 1 characters.",
  }),
})

const FormSchema2 = z.object({
  id:z.string()
})

export function InputForm() {

  const [todos, setTodos] = React.useState<{id: string; label:string}[]>([]);
  const selectedTodos = new Array();
  let count = 0
  
  
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      input: "",
    },
  })

  // const check = useForm<z.infer<typeof FormSchema2>>({
  //   resolver:zodResolver(FormSchema2),
  //   defaultValues:{
  //     id:""
  //   }
  // })

  function onSubmit(data: z.infer<typeof FormSchema>) {
    console.log(data.input)
    setTodos([...todos,{id:uuidv4(), label:data.input}])
  }

  // function trackTodos(data: z.infer<typeof FormSchema2>){
  //   console.log(data.id)
  //   selectedTodos.push(data.id)
  //   console.log(selectedTodos)

  // }

  function handleDelte(){
    //const updatedTodos = todos.filter(todo => !values.selectedTodos.includes(todo.id));
  }

  

  return (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="w-2/3 space-y-[12%] flex justify-between">
          <FormField
            control={form.control}
            name="input"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Add Todos here</FormLabel>
                <FormControl className=" shadow-xl ring-1 ring-slate-500 ">
                  <Input placeholder="...new task" {...field} />
                </FormControl>
                
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" className=" shadow-xl ring-1 ring-slate-600 hover:scale-105 "><CiSquarePlus className=" scale-[230%] "></CiSquarePlus></Button>
        </form>
      </Form>
      <Card className=" w-full rounded-md">
        <CardHeader>
          <CardTitle>Your Todo-List</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className=" ring-1 ring-slate-700 m-2 p-2 rounded-md ">
            {todos.map(todo=>(
              <li key={todo.id} className=" ring-1 ring-gray-700  p-2 my-3 rounded-lg shadow-lg bg-slate-300 font-semibold font-mono ">
                <Checkbox className="mx-2 shadow-xl peer" onCheckedChange={()=>{
                  console.log("checked")

                  // check
                   count++
                   if(count<2){
                  //   trackTodos(todo)
                  console.log("checked")
                   }
                   else{
                    console.log("unchecked")
                    count= 0

                   }

                  
                  
                }}></Checkbox>
                {todo.label}
                </li>
            ))}
          </ul>
        </CardContent>
        <CardFooter className="bg-slate-300">
          <div className="flex justify-between items-center">
            <div className=" text-sm font-mono " >
               task:{todos.length}
            </div>
            <div className=" px-[40px]">
              <button id="del-butt" className=" underline text-red-600 text-sm" onClick={()=>(
                handleDelte()
              )}>Delete</button>
            </div>
            
          </div>
        </CardFooter>
      </Card>
    </>




  )
}
