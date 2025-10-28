import Container from "./Container";
import Navbar from "./Navbar";

function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen relative pt-20">
      <Navbar />
      <Container>{children}</Container>
    </div>
  );
}

export default Layout;
