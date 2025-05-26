import NonDashboardNavbar from "@/components/NonDashboardNavbar";

import Footer from "@/components/Footer";


export default function Layout({children} : {children: React.ReactNode}) {
  return (
    <div className="nondashboard-layout">
      {/* Create nav bar start*/}
      <NonDashboardNavbar />
      {/* Create nav bar end */}
      <main className="nondashboard-layout__main">
        {children}
      </main>
      {/* <Footer/> */}
    </div>
  );
}
