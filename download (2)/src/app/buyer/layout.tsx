import DashboardSidebar from '@/components/layout/dashboard-sidebar';
import Header from '@/components/layout/header';

export default function BuyerLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
    <Header />
    <div className="flex min-h-[calc(100vh-4rem)]">
      <DashboardSidebar userType="buyer" />
      <main className="flex-1 p-6 md:p-8 bg-background">
        {children}
      </main>
    </div>
    </>
  );
}
