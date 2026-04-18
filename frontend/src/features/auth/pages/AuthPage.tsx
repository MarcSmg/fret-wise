import { Button } from "../../../shared/ui/Button"
import { SlidingTabs } from "../components/SlidingTabs";
import { useState } from "react";
import { AuthShell } from "../components/AuthShell";
import { LoginForm } from "./LoginForm";
import { SignupForm } from "./SignupForm";
import Heading from "../../../shared/ui/Heading";

const AUTH_OPTIONS = [
  { id: 'login', label: 'Login' },
  { id: 'signup', label: 'Create Account' }
];

export const AuthPage = () => {

  const [activeTab, setActiveTab] = useState('login');

  return (
    <div className=" relative flex min-h-screen w-full bg-linear-to-t from-primary from-80% to-accent-bold">
      <Heading className=" absolute top-30 w-full text-white text-center" >Fretwise</Heading>
      <div
        className={` fixed w-full -mb-1 bg-ui-card bottom-0 left-0 right-0 min-h-[60vh] border border-stroke-subtle rounded-t-3xl shadow-detail-md overflow-hidden`}
      >
        <div
          className=" p-8 h-full"
        >
          <SlidingTabs
            options={AUTH_OPTIONS} 
            activeId={activeTab} 
            onChange={setActiveTab}
          />

          <AuthShell activeKey={activeTab}>
            {activeTab === 'login' ? <LoginForm /> : <SignupForm />}
          </AuthShell>        
        </div>
      </div>
    </div>
  )
}
