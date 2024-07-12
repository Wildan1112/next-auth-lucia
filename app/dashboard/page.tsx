import Image from "next/image";
import { redirect } from "next/navigation";

import { validateRequest } from "@/lib/auth";
import { logout } from "@/actions/logout.action";
import { Button } from "@/components/ui/button";

const Dashboard = async () => {
    const { user } = await validateRequest()
    if (!user) {
        return redirect('/login')
    }
    return (
        <main className="min-h-screen flex justify-center items-center">
            <div className="bg-white border p-4 rounded flex items-center gap-2">
                {/* show image base on database */}
                <Image src="/robot.svg" alt="Next.js Logo" width={48} height={48} className="rounded-full border border-slate-500" />
                <div className="flex flex-col">
                    <p className="text-base font-bold">{user.name}</p>
                    <p className="text-sm text-slate-500">{user.email}</p>
                </div>
            </div>

            <div className="absolute right-0 top-0 m-4 text-white">
                {/* Btn logout */}
                <form action={logout}>
                    <Button type='submit'>Logout</Button>
                </form>
            </div>
        </main>
    )
};

export default Dashboard