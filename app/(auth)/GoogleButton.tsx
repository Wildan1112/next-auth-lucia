'use client'

import Image from "next/image"

import { Button } from "@/components/ui/button"
import { toast } from "sonner"
import { oAuthGoogle } from "@/actions/oauth.action"

export const GoogleButton = () => {
    return (
        <Button variant={"outline"} className="w-full mb-2 font-semibold" onClick={async () => {

            const res = await oAuthGoogle()
            if (res.url) {
                window.location.href = res.url
            } else {
                toast.error(res.error)
            }
        }}>
            <Image src={"/google.svg"} className="w-4 h-4 mr-2" alt="google" width={48} height={48} />
            Continue with Google
        </Button>
    )
}