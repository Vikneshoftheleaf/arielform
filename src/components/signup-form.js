"use client"
import Link from "next/link";
import { useAuthContext } from "../context/auth-context"
import { useRouter } from "next/navigation";
import { useState } from "react";
import {auth, db} from "@/firebase"
import { signInWithPopup, GoogleAuthProvider, createUserWithEmailAndPassword, } from "firebase/auth";
import { doc, setDoc, getDoc } from "firebase/firestore";

const SignupForm = () => {
    const provider = new GoogleAuthProvider();

    const { user } = useAuthContext();
    const router = useRouter();
    const [email, setemail] = useState();
    const [password, setpassword] = useState();
    const [confirmPassword, setconfirmPassword] = useState();
    const [terms, setterms] = useState();
    const [errorMsg, setErrorMsg] = useState(null);

    function generateRandomString(length) {
        const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        let randomString = '';

        for (let i = 0; i < length; i++) {
            const randomIndex = Math.floor(Math.random() * characters.length);
            randomString += characters.charAt(randomIndex);
        }

        return randomString;
    }

    function emailSignup(email, password) {
        //e.preventDefault();
        createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                // Signed up 
                const user = userCredential.user;
                const displayName = user.email.split('@')
                setDoc(doc(db, "user", user.uid), {
                    uid: user.uid,
                    displayName: user.displayName ? user.displayName : displayName[0],
                    email: user.email,
                    photoURL: user.photoURL ? user.photoURL : null,
                    verified: false,
                })
                console.log('siggned in with email!')
                // ...
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                console.log(errorMessage)
                const errMsg = errorCode.split('/')
                // ..
            });

    }


    function googleSignup() {
        signInWithPopup(auth, provider)
            .then(async (result) => {
                // This gives you a Google Access Token. You can use it to access the Google API.
                const credential = GoogleAuthProvider.credentialFromResult(result);
                const token = credential.accessToken;
                // The signed-in user info.
                const user = result.user;
                
                console.log(user.uid)

                const docRef = doc(db, "user", user.uid);
                const docSnap = await getDoc(docRef);

                if (docSnap.exists()) {
                    console.log("Document data:", docSnap.data());
                } else {
                    // docSnap.data() will be undefined in this case
                    const displayName = user.email.split('@')
                    setDoc(doc(db, "user", user.uid), {
                        uid: user.uid,
                        displayName: user.displayName ? user.displayName : displayName[0],
                        email: user.email,
                        photoURL: user.photoURL ? user.photoURL : null,
                        verified: false,
                    })

                    console.log("account created on force")
                }
                // IdP data available using getAdditionalUserInfo(result)
                console.log("signned up with google!")

                // ...
            }).catch((error) => {
                // Handle Errors here.
                const errorCode = error.code;
                const errorMessage = error.message;
                // The email of the user's account used.
                const email = error.customData.email;
                // The AuthCredential type that was used.
                const credential = GoogleAuthProvider.credentialFromError(error);

                console.log(errorMessage)
                // ...
            });
    }

    function handleSubmit() {

        if (!terms) {

            setErrorMsg("Accept the terms to continue")
        }
        else if (password != confirmPassword) {
            setErrorMsg("Check your passwords.")
        }
        else {
            emailSignup(email, password);
        }



    }

    if (user) {
        router.push('dashboard')
    }
    else
        return (
            <div>
                <section class="bg-gray-50 dark:bg-gray-900">
                    <div class="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
                        <a href="#" class="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white">
                            <img class="w-8 h-8 mr-2" src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/logo.svg" alt="logo" />
                            Flowbite
                        </a>
                        <div className="text-center text-red-600">{errorMsg}</div>
                        <div class="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
                            <div class="p-6 space-y-4 md:space-y-6 sm:p-8">
                                <h1 class="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                                    Create an account
                                </h1>
                                <div class="space-y-4 md:space-y-6">
                                    <div>
                                        <label for="email" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your email</label>
                                        <input onChange={(e) => setemail(e.target.value)} type="email" name="email" id="email" class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="name@company.com" required="" />
                                    </div>
                                    <div>
                                        <label for="password" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
                                        <input onChange={(e) => setpassword(e.target.value)} type="password" name="password" id="password" placeholder="••••••••" class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required="" />
                                    </div>
                                    <div>
                                        <label for="confirm-password" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Confirm password</label>
                                        <input onChange={(e) => setconfirmPassword(e.target.value)} type="confirm-password" name="confirm-password" id="confirm-password" placeholder="••••••••" class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required="" />
                                    </div>
                                    <div class="flex items-start">
                                        <div class="flex items-center h-5">
                                            <input onChange={(e) => setterms(true)} id="terms" aria-describedby="terms" type="checkbox" class="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-emerald-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-emerald-600 dark:ring-offset-gray-800" required="" />
                                        </div>
                                        <div class="ml-3 text-sm">
                                            <label for="terms" class="font-light text-gray-500 dark:text-gray-300">I accept the <a class="font-medium text-primary-600 hover:underline dark:text-primary-500" href="#">Terms and Conditions</a></label>
                                        </div>
                                    </div>
                                    <button onClick={() => handleSubmit()} class="w-full text-white bg-emerald-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-emerald-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">Create an account</button>
                                    <button onClick={() => googleSignup()} class="w-full text-emerald-950 bg-emerald-50 border hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-emerald-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">Continue with Google</button>

                                    <p class="text-sm font-light text-gray-500 dark:text-gray-400">
                                        Already have an account? <Link href={'login'} class="font-medium text-primary-600 hover:underline dark:text-primary-500">Login here</Link>
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

            </div>
        );

    const SignupForm = () => {
        return (
            <div>
                <section class="bg-gray-50 dark:bg-gray-900">
                    <div class="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
                        <a href="#" class="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white">
                            <img class="w-8 h-8 mr-2" src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/logo.svg" alt="logo" />
                            Flowbite
                        </a>
                        <div class="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
                            <div class="p-6 space-y-4 md:space-y-6 sm:p-8">
                                <h1 class="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                                    Create an account
                                </h1>
                                <div class="space-y-4 md:space-y-6">
                                    <div>
                                        <label for="email" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your email</label>
                                        <input type="email" name="email" id="email" class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="name@company.com" required="" />
                                    </div>
                                    <div>
                                        <label for="password" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
                                        <input type="password" name="password" id="password" placeholder="••••••••" class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required="" />
                                    </div>
                                    <div>
                                        <label for="confirm-password" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Confirm password</label>
                                        <input type="confirm-password" name="confirm-password" id="confirm-password" placeholder="••••••••" class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required="" />
                                    </div>
                                    <div class="flex items-start">
                                        <div class="flex items-center h-5">
                                            <input id="terms" aria-describedby="terms" type="checkbox" class="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-emerald-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-emerald-600 dark:ring-offset-gray-800" required="" />
                                        </div>
                                        <div class="ml-3 text-sm">
                                            <label for="terms" class="font-light text-gray-500 dark:text-gray-300">I accept the <a class="font-medium text-primary-600 hover:underline dark:text-primary-500" href="#">Terms and Conditions</a></label>
                                        </div>
                                    </div>
                                    <button class="w-full text-white bg-emerald-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-emerald-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">Create an account</button>
                                    <p class="text-sm font-light text-gray-500 dark:text-gray-400">
                                        Already have an account? <Link href={'login'} class="font-medium text-primary-600 hover:underline dark:text-primary-500">Login here</Link>
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

            </div>
        );
    }
}
    export default SignupForm;
