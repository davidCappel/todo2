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


import {v4 as uuidv4} from 'uuid'

const FormSchema = z.object({
  input: z.string().min(1, {
    message: "Todo must be at least 1 characters.", 
  }),

})

const DeleteFormSchema = z.object({
  selectedTodos:z.array(z.string())
})

export function InputForm() {

  const [todos, setTodos] = React.useState<{id: string; label:string}[]>([]);


  
  
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      input: "",
    },
  })

  const deleteForm = useForm<z.infer<typeof DeleteFormSchema>>({
    resolver: zodResolver(DeleteFormSchema),
    defaultValues:{
        selectedTodos:[],
    }
  })

 

  

  function onSubmit(data: z.infer<typeof FormSchema>) {
    console.log(data.input)
    setTodos([...todos,{id:uuidv4(), label:data.input}])
    form.reset()
    
  }



  
  function onDeleteSubmit(data: z.infer<typeof DeleteFormSchema>){
    console.log(data)
    setTodos(todos.filter(todo=> !data.selectedTodos.includes(todo.id)))
  }

  

  return (
    <>
      <Form {...form} >
        <form onSubmit={form.handleSubmit(onSubmit)} className="flex  m-20">
          <FormField
            control={form.control}
            name="input"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Add Todos here</FormLabel>
                <FormControl className=" shadow-xl ring-1 ring-slate-500 w-full ">
                  <Input placeholder="...new task" {...field} />
                </FormControl>
                
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" className=" shadow-xl ring-1 ring-slate-600 hover:scale-105 mx-[35px] mt-[30px]"><CiSquarePlus className=" scale-[230%] "></CiSquarePlus></Button>
        </form>
      </Form>
      <Card className=" rounded-md mt-[170px] w-[400px]">
        <CardHeader>
          <CardTitle>Your Todo-List</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className=" ring-1 ring-slate-700 m-2 p-2 rounded-md">
            
            <Form {...deleteForm}>
              <form>
                {todos.map((todo, idx)=>(
                  <React.Fragment key={idx}>
                    <li className=" m-2 bg-slate-400 rounded-lg ring-1 ring-slate-700 shadow-xl flex">
                    <FormField
                        control={deleteForm.control}
                        name="selectedTodos"
                        render={({field})=>(
                          <Checkbox
                              className=" shadow-lg my-2 mx-2"
                              checked={field.value?.includes(todo.id)}
                              onCheckedChange={(checked)=>{
                                const updatedSelectedtodos = checked ? [...field.value, todo.id]: field.value.filter(id=> id !== todo.id);
                                field.onChange(updatedSelectedtodos)
                              }} 
                              />
                        )}
                      />
                      <div className="font-mono font-semibold my-2">
                        {todo.label}
                      </div>
                    </li>
                    </React.Fragment>
                          ))}
              </form>
              
            </Form>
          
          </ul>
        </CardContent>
        <CardFooter className="bg-slate-300">
          <div className="flex justify-between items-center">
            <div className=" text-sm font-mono">
               task:{todos.length}
            </div>
            <div className=" pl-[200px]">
              <button id="del-butt" className=" underline text-red-600 text-sm" onClick={deleteForm.handleSubmit(onDeleteSubmit)}>Delete</button>
            </div>
            
          </div>
        </CardFooter>
      </Card>
    </>




  )
}
