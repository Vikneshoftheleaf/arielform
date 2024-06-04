import { NextResponse } from "next/server";
import { headers } from "next/headers";
import { auth, db } from "@/firebase";
import { addDoc, collection, doc, increment, serverTimestamp, updateDoc, getDoc } from "firebase/firestore";
import { Resend } from 'resend';
import { EmailTemplate } from "@/components/EmailTemp";
import { redirect } from "next/navigation";
//import { EmailTemplate } from "@/components/EmailTemp";

export async function POST(request, { params }) {


  //const resend = new Resend(process.env.NEXT_PUBLIC_RESEND_KEY);


  const id = await params.slug
  //fetch email to notify
  const resEmail = doc(db, "endpoints", id);
  const docSnap = await getDoc(resEmail);
  const isEndpointActive = docSnap.data().active
  if (isEndpointActive) {
    const formData = await request.formData()
    const fields = Object.fromEntries(formData)
    const orderedData = Object.entries(fields).map(([key, value]) => ({ key, value }));
    //add response
    await addDoc(collection(db, "responses"), {
       for: id,
       resText: orderedData,
       createdAt: serverTimestamp()
   //increment response count
   
     })
     
    await updateDoc(doc(db, "endpoints", id), {
      Responses: increment(1)
    })

    redirect('/thanks')

  }
  else {

    redirect('/inactive')

  }

}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
