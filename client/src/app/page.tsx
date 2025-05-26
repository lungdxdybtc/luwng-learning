import NonDashboardNavbar from "@/components/NonDashboardNavbar";
import Landing from "@/app/(nondashboard)/landing/page";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <div>
      <NonDashboardNavbar />
      <main>
        <Landing />
      </main>
      {/* <Footer /> */}
    </div>
  );
}