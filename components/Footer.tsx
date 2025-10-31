export default function Footer() {
  return (
    <footer style={{
      background: "#222",
      color: "white",
      textAlign: "center",
      padding: "1rem",
      marginTop: "2rem"
    }}>
      © {new Date().getFullYear()} MyShop — All rights reserved
    </footer>
  );
}
