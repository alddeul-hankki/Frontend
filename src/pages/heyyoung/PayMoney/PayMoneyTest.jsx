import React, { useState } from "react";

const API_BASE = "http://localhost:8080";

export default function PayMoneyTest() {
  const [email, setEmail] = useState("solsol2@email.com");
  const [accountNo, setAccountNo] = useState("0010165689222556");
  const [transactionBalance, setTransactionBalance] = useState(1000);
  const [transactionSummary, setTransactionSummary] = useState("테스트 결제");
  const [loading, setLoading] = useState(false);
  const [lastResponse, setLastResponse] = useState(null);
  const [lastError, setLastError] = useState(null);

  const callApi = async (path, body) => {
    setLoading(true);
    setLastError(null);
    setLastResponse(null);
    try {
      const res = await fetch(`${API_BASE}/api/${path}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(data?.message || `HTTP ${res.status}`);
      setLastResponse(data);
    } catch (err) {
      setLastError(err.message || String(err));
    } finally {
      setLoading(false);
    }
  };

  const formatMoney = (n) =>
    typeof n === "number" ? n.toLocaleString("ko-KR") : n;

  return (
    <div style={{ maxWidth: 640, margin: "40px auto", fontFamily: "system-ui" }}>
      <h2>PayMoney 테스트 패널</h2>

      <div style={{ display: "grid", gap: 12 }}>
        <label>
          이메일
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={inputStyle}
            placeholder="user@example.com"
          />
        </label>

        <label>
          계좌번호
          <input
            value={accountNo}
            onChange={(e) => setAccountNo(e.target.value)}
            style={inputStyle}
            placeholder="111-222"
          />
        </label>

        <label>
          금액(Number)
          <input
            type="number"
            value={transactionBalance}
            onChange={(e) => setTransactionBalance(e.target.value)}
            style={inputStyle}
            min={1}
          />
        </label>

        <label>
          요약(옵션)
          <input
            value={transactionSummary}
            onChange={(e) => setTransactionSummary(e.target.value)}
            style={inputStyle}
            placeholder="메모/요약"
          />
        </label>

        <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
          <button
            onClick={() =>
              callApi("paymoney/topup", {
                email,
                accountNo,
                transactionBalance: Number(transactionBalance),
                transactionSummary,
              })
            }
            disabled={loading}
            style={btnStyle}
          >
            {loading ? "요청 중..." : "충전(topup) 요청"}
          </button>

          <button
            onClick={() =>
              callApi("paymoney/refund", {
                email,
                accountNo,
                transactionBalance: Number(transactionBalance),
                transactionSummary,
              })
            }
            disabled={loading}
            style={btnStyle}
          >
            {loading ? "요청 중..." : "환불(refund) 요청"}
          </button>

          <button
            onClick={() =>
              callApi("users/inquiry", {
                email,
                accountNo,
              })
            }
            disabled={loading}
            style={btnStyle}
          >
            {loading ? "조회 중..." : "SSAFY 계좌 잔액 조회"}
          </button>

          <button
            onClick={() =>
              callApi("paymoney/inquiry", {
                email,
              })
            }
            disabled={loading}
            style={btnStyle}
            title="api/paymoney/inquiry"
          >
            {loading ? "조회 중..." : "PayMoney 잔액 조회"}
          </button>

          {/* ▶ 추가: 페이머니 등록 */}
          <button
            onClick={() =>
              callApi("paymoney/create", {
                email,
              })
            }
            disabled={loading}
            style={btnStyle}
            title="api/paymoney/create"
          >
            {loading ? "등록 중..." : "페이머니 등록"}
          </button>
        </div>
      </div>

      <hr style={{ margin: "24px 0" }} />

      {lastError && <pre style={errorStyle}>ERROR: {lastError}</pre>}

      {lastResponse && (
        <>
          {"status" in lastResponse && "amount" in lastResponse ? (
            <div style={cardStyle}>
              <div>
                상태: <b>{String(lastResponse.status)}</b>
              </div>
              <div>
                잔액: <b>{formatMoney(lastResponse.amount)} 원</b>
              </div>
            </div>
          ) : (
            <pre style={preStyle}>{JSON.stringify(lastResponse, null, 2)}</pre>
          )}
        </>
      )}
    </div>
  );
}

const inputStyle = {
  width: "100%",
  height: 36,
  padding: "0 10px",
  marginTop: 4,
  border: "1px solid #ccc",
  borderRadius: 8,
};

const btnStyle = {
  height: 40,
  padding: "0 14px",
  borderRadius: 8,
  border: "1px solid #ddd",
  background: "#f5f5f5",
  cursor: "pointer",
};

const preStyle = {
  background: "#111",
  color: "#0f0",
  padding: 12,
  borderRadius: 8,
  fontSize: 13,
};

const errorStyle = {
  background: "#391111",
  color: "#ffb3b3",
  padding: 12,
  borderRadius: 8,
  fontSize: 13,
};

const cardStyle = {
  background: "#f7f7f7",
  color: "#222",
  padding: 14,
  borderRadius: 8,
  border: "1px solid #e5e5e5",
  lineHeight: 1.6,
};
