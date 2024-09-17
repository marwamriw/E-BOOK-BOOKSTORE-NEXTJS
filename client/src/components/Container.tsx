"use client"

interface IContainer{
    children: React.ReactNode
}
export default function Container({children}:IContainer){
    return(
        <div className="flex flex-col gap-6 container mx-auto ">{children}</div>
    )
}