import { NextResponse } from "next/server";
import { headers } from "next/headers";
import { auth, db } from "@/firebase";
import { addDoc, collection, doc, increment, serverTimestamp, updateDoc, getDoc } from "firebase/firestore";
import { Resend } from 'resend';
import { EmailTemplate } from "@/components/EmailTemp";
//import { EmailTemplate } from "@/components/EmailTemp";

export async function POST(request, { params }) {


  const resend = new Resend(process.env.NEXT_PUBLIC_RESEND_KEY);


  const id = await params.slug

  const resEmail = doc(db, "endpoints", id);
  const docSnap = await getDoc(resEmail);
  const sendEmailTo = docSnap.data().ToEmail

  const formData = await request.formData()
  const fields = Object.fromEntries(formData)
  const orderedData = Object.entries(fields).map(([key, value]) => ({ key, value }));

 await addDoc(collection(db, "responses"), {
    for: id,
    resText: orderedData,
    createdAt: serverTimestamp()

  })
  await updateDoc(doc(db, "endpoints", id), {
    Responses: increment()
  })


  const now = new Date()
  resend.emails.send({
    from: 'onboarding@resend.dev',
    to: sendEmailTo,
    subject: 'Hello World',
    react: <EmailTemplate fields={fields} time={now.getTime()} />
  });

  console.log(id, fields)
  return NextResponse.json({ message: "success", id, fields })
}
