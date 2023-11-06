import { FormControl, FormLabel, Input, Button, Divider } from "@chakra-ui/react"
import React, { useEffect, useState } from "react"
import { useRouter } from "next/router"
import Stepper from "../components/Stepper"

interface Props {
    username: string
    password: string
}

const Login: React.FC<Props> = () => {
    const router = useRouter()
    const [trapDoor, setTrapDoor] = useState<string>("")
    const [nullifier, setNullifier] = useState<string>("")
    useEffect(() => {
        const identityString = localStorage.getItem("identity")

        if (!identityString) {
            router.push("/")
        }


    }, [])

    const login = () => {
        const identityString = localStorage.getItem("identity")

        if (!identityString) {
            router.push("/")
            return
        }
        
        const [trapdoor,_nullifier]=JSON.parse(identityString)

        if(trapdoor===trapDoor && _nullifier===nullifier){
            router.push("/proofs")
        }else{
            console.log("wrong credentials")
        }
    }
    // Your component logic here
    return (
        <>
            <FormControl>
                <FormLabel m="2">TrapDoor</FormLabel>
                <Input
                    onChange={(e) => {
                        setTrapDoor(e.target.value)
                    }}
                    type="text"
                />
                <FormLabel m="2">Nullifier</FormLabel>
                <Input
                    onChange={(e) => {
                        setNullifier(e.target.value)
                    }}
                    type="text"
                />
                <Button onClick={login} mt={4} colorScheme="teal" size="lg">
                    登入
                </Button>
            </FormControl>
            <Divider pt="5" borderColor="gray.500" />
            <Stepper step={3} onPrevClick={() => router.push("/groups")} />
        </>
    )
}

export default Login
