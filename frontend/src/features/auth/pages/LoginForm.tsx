import { FaRegEnvelope } from 'react-icons/fa'
import { LuLockKeyhole } from 'react-icons/lu'
import { Button } from '../../../shared/ui/Button';
import { Checkbox } from '../../../shared/ui/Checkbox';
import GoogleIcon from "../../../assets/google-icon.svg"
import { Input } from '../../../shared/ui/Input';

export const LoginForm = () => {
    const inputStyles = ` pl-11 py-3 w-full border-2 border-stroke-subtle 
    rounded-xl outline-primary/50 
    focus:outline-3 transition-all duration-100
    `;
    const iconStyles = `absolute left-4 text-stroke-strong`;

  return (
    <div>
        <form action="" className="flex flex-col gap-5 w-full pb-5">

            <Input 
                type="text"
                placeholder="Enter username or email"
                className={`${inputStyles}`}
                icon={<FaRegEnvelope className={`${iconStyles}`} />}
            />

            <Input 
                type="password"
                placeholder="Enter your password"
                className={`${inputStyles}`}
                icon={<LuLockKeyhole className={`${iconStyles}`} />}
            />

            <div className='flex gap-3'>
                <Checkbox value='remember'/>
                Remember me
            </div>

            <Button variant="primary" type="submit" >Sign In</Button>
            <div className='relative flex justify-center items-center w-full h-[0.08rem] my-2 bg-gray-300'>
                <p className='absolute px-2 bg-ui-card'>Or sign in with</p>
            </div>
            <div className='w-full'>
                <Button icon={<img className='size-6' src={GoogleIcon}/>} className='w-full border border-stroke-strong/50'>Google</Button>
            </div>

        </form>
    </div>
  )
}
