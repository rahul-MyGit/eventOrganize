
interface AuthLayoutProps{
    children: React.ReactNode;
}

export default function AuthLayout({children} : AuthLayoutProps) {
    return (
        <>
        <div>
            {/* <Navbar /> */}
            hehe
        {children}
        </div>
        </>
    )
}