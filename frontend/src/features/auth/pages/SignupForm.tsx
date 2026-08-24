import { Mail, Lock } from "iconoir-react"
import { Input } from "../../../shared/ui/Input"
import { Checkbox } from "../../../shared/ui/Checkbox"
import { Button } from "../../../shared/ui/Button"
import GoogleIcon from "../../../assets/google-icon.svg"
import { useNavigate } from "react-router-dom"
import Illustration from "@/assets/illust2.svg"


export const SignupForm = () => {

  const navigate = useNavigate();

  const inputStyles = `px-5 py-3 w-full border-2 border-stroke-subtle 
    rounded-xl outline-primary/50 outline-0
    focus:outline-3 transition-all duration-100
    `;
  const iconStyles = `absolute left-4 text-stroke-strong`;

  const handleSignUp = () => {
    navigate("/home");
  }

  return (
    <div className='md:grid md:grid-cols-2 gap-x-10 items-center'>
      <img className='hidden md:block' src={Illustration} />

      <form onSubmit={handleSignUp} action="" className="relative flex flex-col gap-5 w-full pb-5 my-5">

        <div className={`
          flex flex-col gap-3
        `}>
          <Input
            type="text"
            placeholder="First Name"
            className={`${inputStyles}`}
          />
          <Input
            type="text"
            placeholder="Last Name"
            className={`${inputStyles}`}
          />
        </div>
        <Input
          type="text"
          placeholder="Enter username or email"
          className={`${inputStyles} pl-11`}
          icon={<Mail className={`${iconStyles}`} />}
        />

        <Input
          type="password"
          placeholder="Enter your password"
          className={`${inputStyles} pl-11`}
          icon={<Lock className={`${iconStyles}`} />}
        />
        <Input
          type="password"
          placeholder="Confirm your password"
          className={`${inputStyles} pl-11`}
          icon={<Lock className={`${iconStyles}`} />}
        />

        <div className='flex gap-3'>
          <Checkbox value='remember' />
          Remember me
        </div>

        <Button variant="primary" type="submit" >Sign Up</Button>
        <div className='relative flex justify-center items-center w-full h-[0.08rem] my-2 bg-gray-300'>
          <p className='absolute px-2 bg-ui-card'>Or sign up with</p>
        </div>
        <div className='w-full'>
          <Button icon={<img className='size-6' src={GoogleIcon} />} className='w-full border border-stroke-strong/50'>Google</Button>
        </div>

      </form>

    </div>
  )
}
