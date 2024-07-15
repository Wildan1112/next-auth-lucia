import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { RegisterForm } from "@/components/ui/forms/RegisterForm"
import { validateRequest } from "@/lib/auth"
import { redirect } from "next/navigation"


export default async function Register() {
    const { user } = await validateRequest()
    if (user) {
        return redirect("/dashboard")
    }
    return (
        <main className="flex min-h-screen flex-col items-center justify-center">
            <Card className="mx-auto max-w-sm w-full">
                <CardHeader>
                    <CardTitle className="text-xl">Sign Up</CardTitle>
                    <CardDescription>
                        Enter your information to create an account
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <RegisterForm />
                </CardContent>
            </Card>
        </main>
    )
}
