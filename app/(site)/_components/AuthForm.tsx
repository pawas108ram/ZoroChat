'use client'
import React,{useState,useCallback, useEffect} from 'react'
import {FieldValues, SubmitHandler, useForm} from 'react-hook-form'
import Input from '@/components/inputs/Input'
import Button from '@/components/Button'
import AuthSocialButton from './AuthSocialButton'
import {BsGithub,BsGoogle} from 'react-icons/bs'
import axios from 'axios'
import toast from 'react-hot-toast'
import { signIn, useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'

type Variant='REGISTER'|'LOGIN';


const AuthForm = () => {
    const session=useSession();
    const router=useRouter();
    useEffect(()=>{
        if(session.status==='authenticated'){
            router.push('/users');
        }
    },[session?.status,router ])  
    const [variant,setVariant]=useState<Variant>('LOGIN');
    const [isLoading,setLoading]=useState<boolean>(false)
    const toggleVariant=useCallback(()=>{
        if(variant==='LOGIN'){
            setVariant('REGISTER')
        }
        else{
            setVariant('LOGIN')
        }
    },[variant])

    const {register,handleSubmit,formState:{errors} }=useForm<FieldValues>({
        defaultValues:{
            name:'',
            email:'',
            password:'',
        }
    })

    const onSubmit:SubmitHandler<FieldValues>=(data)=>{
        setLoading(true);
        if(variant==='REGISTER'){
            axios.post('/api/register',data).then(()=>signIn('credentials',data)).catch((err)=>toast.error(err.message)).finally(()=>setLoading(false));
        }
        else{
            signIn('credentials',{
                ...data,redirect:false
            }).then((callback)=>{
                if(callback?.error){
                    toast.error("Invalid credentials");
                }
                if(callback?.ok && !callback.error){
                    toast.success("Succesful Login")
                }
            }).finally(()=>setLoading(false));
        }
    }

    const socialAction=(action:string)=>{
        setLoading(true);
        signIn(action,{redirect:false}).then((callback)=>{
            if(callback?.error){
                toast.error("Invalid Credentisals");
            }
            if(callback?.ok && !callback.error){
                toast.success("Logged IN !!!!");
                router.push('/users');
            }
        }).finally(()=>setLoading(false));

    }

  return (
   <div className='mt-6 sm:mx-auto sm:w-full sm:max-w-md '>
    <div className='bg-white px-4 py-8 shadow sm:rounded-lg sm:px-10'>
        <form className='space-y-6' onSubmit={handleSubmit(onSubmit)}>
        {variant==='REGISTER' &&     <Input label='Name' register={register} id='name' errors={errors} disabled={isLoading}  />}
        <Input label='Email' register={register} id='email' errors={errors} disabled={isLoading} />
        <Input label='Password' register={register} id='password' errors={errors} disabled={isLoading} />
        <div>
            <Button disabled={isLoading} fullWidth type='submit'>{variant==='LOGIN'?'Sign In':'Sign Up'}</Button>
        </div>
        </form>
        <div className='mt-6'>
            <div className='relative'>
                <div className='absolute inset-0 flex items-center'>
                    <div className='w-full border-t border-gray-300'></div>
                </div>
                <div className='relative flex justify-center text-sm'>
                    <span className='bg-white px-2 text-gray-500'>Or Continue With</span>
                    
                </div>
            </div>
            <div className='mt-6 flex gap-2'>
                
                <AuthSocialButton icon={BsGoogle} onClick={()=>socialAction('google')}/>
            </div>

        </div>
        <div className='flex gap-2 justify-center text-sm mt-6 px-2  text-gray-500 '>
            <div>{variant==='LOGIN'?'New to ZoroChat?':'Already Registered?'}</div>
            <div onClick={toggleVariant} className='underline cursor-pointer'>
                {variant==='LOGIN'?'Create an Account':'Login'}
            </div>
        </div>
    </div>
   </div>
  )
}

export default AuthForm
