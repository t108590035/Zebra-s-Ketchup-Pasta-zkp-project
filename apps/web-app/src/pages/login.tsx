import { FormControl, FormLabel, FormErrorMessage, FormHelperText, Input, Button, Divider } from "@chakra-ui/react"
import { Identity } from "@semaphore-protocol/identity"
import React, { useEffect, useState } from "react"

import Stepper from "../components/Stepper"
import { useRouter } from "next/router"
interface Props {
    username: string
    password: string
}

const Login: React.FC<Props> = ({ username, password }) => {
    const router = useRouter()
    const [_identity, setIdentity] = useState<Identity>()
    const [trapDoor, setTrapDoor] = useState<string>("")
    const [nullifier, setNullifier] = useState<string>("")
    useEffect(() => {
        const identityString = localStorage.getItem("identity")

        if (!identityString) {
            router.push("/")
            return
        }

        setIdentity(new Identity(identityString))
    }, [])

    const login = () => {
        const identityString = localStorage.getItem("identity")

        if (!identityString) {
            router.push("/")
            return
        }
        
        const [trapdoor,nullifier]=JSON.parse(identityString)

        if(trapdoor===trapDoor && nullifier===nullifier){
            router.push("/proofs")
        }else{
            console.log("wrong credentials")
        }
    }
    // Your component logic here
    return (
        <>
            <FormControl>
                <FormLabel>TrapDoor</FormLabel>
                <Input
                    onChange={(e) => {
                        setTrapDoor(e.target.value)
                    }}
                    type="text"
                />
                <FormHelperText>We'll never share your TrapDoor.</FormHelperText>
                <FormLabel>Nullifier</FormLabel>
                <Input
                    onChange={(e) => {
                        setNullifier(e.target.value)
                    }}
                    type="text"
                />
                <FormHelperText>We'll never share your Nullifier.</FormHelperText>
                <Button onClick={login} mt={4} colorScheme="teal" size="lg">
                    Login
                </Button>
            </FormControl>
            <Divider pt="5" borderColor="gray.500" />
            <Stepper step={3} onPrevClick={() => router.push("/groups")} />
        </>
    )
}

export default Login
