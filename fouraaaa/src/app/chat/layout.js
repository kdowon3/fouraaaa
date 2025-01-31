export default function ChatLayout({ children }) {
    return (
      <div style={{ margin: "20px", padding: "10px", border: "1px solid #ccc" }}>
        <h1>Chat Application</h1>
        {children}
      </div>
    );
  }
  