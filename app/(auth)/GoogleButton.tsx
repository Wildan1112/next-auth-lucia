'use client'

import { oAuthGoogle } from "@/actions/oauth.action"
import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"
import { toast } from "sonner"

export const GoogleButton = () => {
    const router = useRouter()
    return (
        <Button className="w-full mt-2" onClick={async () => {

            const res = await oAuthGoogle()
            if (res.url) {
                console.log(res.url)
                window.location.href = res.url

            } else {
                toast.error(res.error)
            }
        }}>
            {/* <GithubIcon className="w-4 h-4 mr-2" /> */}
            Continue with Google
        </Button>
    )
}