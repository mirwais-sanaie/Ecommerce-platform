import Container from "./Container";
import Navbar from "./Navbar";

function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <Navbar />
      <Container>{children}</Container>
    </div>
  );
}

export default Layout;
