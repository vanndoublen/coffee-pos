import { MainHeader } from "@/components/main-header";
import { AuthGaurd } from "@/features/auth/components/auth-gaurd";

export default function ProtectedLayout({
    children,
}: {
    children: React.ReactNode;
}) {

    return (
        <>
            <div className="flex flex-col h-svh overflow-hidden">
                <MainHeader />
                <div className="flex-1 min-h-0 p-2">
                    <AuthGaurd>
                        {children}
                    </AuthGaurd>
                </div>
            </div>
        </>
    );
}
