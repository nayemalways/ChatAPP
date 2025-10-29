import toast from "react-hot-toast";

export const globalErrorHelper = (err: any) => {
 
    if(err.response.data.message === "Zod Validation Error") {
        err.response.data.errorSources.map((zodFiled: {path: string, message: string}) => {
            toast.error(zodFiled.message)
        } )
    } else {
        toast.error(err.response.data.message)
    }


}