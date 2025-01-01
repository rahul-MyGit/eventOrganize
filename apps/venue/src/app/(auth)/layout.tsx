import { Navbar } from "@repo/custom-component";

interface AuthLayoutProps {
    children: React.ReactNode;
}

export default function AuthLayout({ children }: AuthLayoutProps) {
    return (
        <>
            <Navbar />
            <div className="min-h-screen pt-20 flex flex-col">
                {children}
            </div>
        </>
    )
}