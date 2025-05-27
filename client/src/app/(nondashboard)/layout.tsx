import NonDashboardNavbar from "@/components/NonDashboardNavbar";



export default function Layout({children} : {children: React.ReactNode}) {
  return (
    <div>
      <NonDashboardNavbar />
      <main>
        {children}
      </main>
    </div>
  );
}
