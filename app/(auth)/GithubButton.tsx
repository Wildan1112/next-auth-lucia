'use client'

import Image from "next/image"

import { Button } from "@/components/ui/button"
import { toast } from "sonner"
import { githubOauth } from "@/actions/oauth.action"

export const GithubButton = () => {
    return (
        <Button variant="outline" className="w-full font-semibold" onClick={async () => {
            const res = await githubOauth()
            if (res.url) {
                console.log(res.url)
                window.location.href = res.url

            } else {
                toast.error(res.error)
            }
        }}>
            <Image src={"/github.svg"} className="w-4 h-4 mr-2" alt="google" width={48} height={48} />
            Continue with Github
        </Button>
    )
}