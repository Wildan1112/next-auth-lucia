import Image from "next/image";
import { redirect } from "next/navigation";

import { validateRequest } from "@/lib/lucia/auth";
import { logout } from "@/actions/logout.action";
import { Button } from "@/components/ui/button";

const Dashboard = async () => {
    const { user } = await validateRequest()
    if (!user) {
        return redirect('/login')
    }

    return (
        <main className="min-h-screen flex flex-wrap justify-center items-center">
            <div className="bg-white border p-4 rounded flex items-center gap-2">

                <Image src={user.avatar ?? '/robot.svg'} alt="Next.js Logo" width={48} height={48} className="rounded-full mr-2 border border-slate-500" />

                <div className="flex flex-col">
                    {user.name && <p className="text-base font-semibold">{user.name}</p>}
                    {user.username && <p className="text-base font-semibold">{user.username}</p>}
                    {user.githubId && <p className="text-base text-slate-400 ">{user.githubId}</p>}
                    {user.email && <p className="text-sm text-slate-400">{user.email}</p>}
                    {/* {JSON.stringify(user)} */}
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