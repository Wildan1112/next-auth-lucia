'use client'

import { Button } from "@/components/ui/button"
import { GithubIcon } from "lucide-react"

export const GithubButton = () => {
    return (
        <Button variant="outline" className="w-full" onClick={() => { alert('ok') }}>
            <GithubIcon className="w-4 h-4 mr-2" />
            Continue with Github
        </Button>
    )
}