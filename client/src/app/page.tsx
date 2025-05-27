import NonDashboardNavbar from "@/components/NonDashboardNavbar";
import Landing from "@/app/(nondashboard)/landing/page";
import Navbar from "@/components/NonDashboardNavbar";

export default function Home() {
  return (
    <div>
      <NonDashboardNavbar /> 
      <main>
        <Landing />
      </main>
    </div>
  );
}