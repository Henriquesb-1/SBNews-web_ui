import SignIn from "@/components/auth/SignIn";
import SignUp from "@/components/auth/SignUp";
import Layout from "@/components/layout/Layout";

interface ParamsProps {
    params: { operation: string };
}


export default function Page({ params }: ParamsProps) {
    const { operation } = params;

    return <Layout>
        {operation === "signIn" ? <SignIn /> : <SignUp />}
    </Layout>
}