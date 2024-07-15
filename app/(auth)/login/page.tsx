
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { LoginForm } from "@/components/ui/forms/LoginForm"
import { validateRequest } from "@/lib/auth"
import { redirect } from "next/navigation"


export default async function Login() {
    const { user } = await validateRequest()
    if (user) {
        return redirect("/dashboard")
    }
    return (
        <main className="flex min-h-screen flex-col items-center justify-center">
            <Card className="mx-auto max-w-sm w-full">
                <CardHeader>
                    <CardTitle className="text-xl">Sign In</CardTitle>
                    <CardDescription>
                        Login to continue
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <LoginForm />
                </CardContent>
            </Card>
        </main>
    )
}
