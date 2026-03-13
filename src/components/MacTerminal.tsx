import { useState } from "react"

type Props = {
  text: string
}

export default function MacTerminal({ text }: Props) {
  const [copied, setCopied] = useState(false)

  const handleCopy = () => {
    navigator.clipboard.writeText(text)
    setCopied(true)
    setTimeout(() => setCopied(false), 1800)
  }

  return (
    <div style={{
      background: "#1e1e1e",
      borderRadius: "12px",
      boxShadow: "0 8px 32px rgba(0,0,0,0.18)",
      fontFamily: "SF Mono, Menlo, Monaco, monospace",
      overflow: "hidden",
      maxWidth: "640px",
      width: "100%",
    }}>
      {/* Title bar */}
      <div style={{
        background: "#2d2d2d",
        padding: "10px 16px",
        display: "flex",
        alignItems: "center",
        gap: "8px",
        borderBottom: "1px solid #3a3a3a",
      }}>
        <span style={{ width: 12, height: 12, borderRadius: "50%", background: "#ff5f57", display: "inline-block" }} />
        <span style={{ width: 12, height: 12, borderRadius: "50%", background: "#febc2e", display: "inline-block" }} />
        <span style={{ width: 12, height: 12, borderRadius: "50%", background: "#28c840", display: "inline-block" }} />
        <span style={{
          flex: 1,
          textAlign: "center",
          fontSize: "12px",
          color: "#888",
          marginLeft: "-36px",
          letterSpacing: "0.01em",
        }}>
          Terminal
        </span>
      </div>

      {/* Command row */}
      <div style={{
        padding: "16px 20px",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        gap: "12px",
      }}>
        <code style={{
          color: "#e8e8e8",
          fontSize: "13px",
          lineHeight: 1.5,
          letterSpacing: "0.01em",
          whiteSpace: "nowrap",
          overflow: "hidden",
          textOverflow: "ellipsis",
        }}>
          {text}
        </code>
        <button
          onClick={handleCopy}
          style={{
            background: copied ? "#28c840" : "#3a3a3a",
            border: "none",
            borderRadius: "6px",
            color: copied ? "#fff" : "#aaa",
            fontSize: "12px",
            padding: "4px 12px",
            cursor: "pointer",
            whiteSpace: "nowrap",
            fontFamily: "inherit",
            transition: "background 0.2s, color 0.2s",
          }}
        >
          {copied ? "Copied!" : "Copy"}
        </button>
      </div>
    </div>
  )
}
