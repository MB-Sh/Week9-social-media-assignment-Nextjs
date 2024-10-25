import { SignIn } from "@clerk/nextjs";





export default function SignInPage(){
    return(
        <div className="flex items-center justify-center p-3">
        <h1>Sign in to this page</h1>
        <SignIn/>
        </div>
    );
}