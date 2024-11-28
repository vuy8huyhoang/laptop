import React from 'react';

interface ProfileLayoutProps {
    children: React.ReactNode;
}

export default function ProfileLayout({ children }: ProfileLayoutProps) {
    return (
        <div className="max-w flex mx-auto min-h-screen">
            <div className="w-[1/4] min-h-screen">
            </div>

            <div className="flex-1">
                {children}
            </div>
        </div>
    );
}
