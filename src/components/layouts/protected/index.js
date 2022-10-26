import ProtectedHeader from "./header";
import Sidebar from "./sidebar";

const Dashboard = () => (
  <main className="dashboard-page">
    <ProtectedHeader />
    <Sidebar />
  </main>
);

export default Dashboard;
