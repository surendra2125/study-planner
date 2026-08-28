export default function SaiPage({ setPage }) {
  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#0a0f1c",
        color: "white",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: "20px",
      }}
    >
      <div
        style={{
          maxWidth: "600px",
          textAlign: "center",
          background: "rgba(255,255,255,0.05)",
          padding: "30px",
          borderRadius: "20px",
          border: "1px solid rgba(0,255,255,0.3)",
        }}
      >
        <h1>Welcome!</h1>

        <p style={{ lineHeight: "1.8" }}>
          Hi 👋
          <br /><br />
          saieeeeeeeeeeeeeeeeeeeeeeee
          <br /><br />
        ela vundhi server down lo vuntundhi kani login signup seervers vunayi le
          <br />
          vurike seperate page cheyalanpichi chesa ventene thesethale
          <br />
          emo ela kuda matladachu anipichi
          <br />
        thank you
          <br />
         dha app chusdhuvu press continue 
          <br /><br />
         
        </p>

        <button
          onClick={() => setPage("landing")}
          style={{
            marginTop: "20px",
            padding: "12px 30px",
            borderRadius: "10px",
            border: "none",
            cursor: "pointer",
            fontSize: "16px",
          }}
        >
          Continue
        </button>
      </div>
    </div>
  );
}