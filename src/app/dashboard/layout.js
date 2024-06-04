import DashboardScreen from "@/components/dashboard-screen"

export const metadata={
    title:"Dashboard | ArielForm",
    description: "Explore your ArielForm Dashboard"
}

export default function DashboardLayout({children})
{
    return(
        <main>
            <DashboardScreen children={children}/>
        </main>
    )
}