import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./AccountConnectForm.module.css";
import StepItem from "../StepItem/StepItem";
import BankSelectForm from "../BankSelectForm/BankSelectForm";
import VerificationCodeForm from "../VerificationCodeForm/VerificationCodeForm";
import WithdrawalAgreementForm from "../WithdrawalAgreementForm/WithdrawalAgreementForm";
import { createPayMoney } from "../../../util/paymoneyApi";

const AccountConnectForm = ({ account }) => {
  const navigate = useNavigate();

  const [openStep, setOpenStep] = useState(null); // 현재 열려있는 단계
  const [currentStep, setCurrentStep] = useState(1); // 진행중인 단계
  const [completedSteps, setCompletedSteps] = useState({
    1: false,
    2: false,
    3: false,
  });
  const [selectedAccount, setSelectedAccount] = useState(account);

  // 완료 처리 헬퍼
  const completeStep = (step, extra = {}) => {
    setCompletedSteps((prev) => ({ ...prev, [step]: true }));
    setCurrentStep(step + 1);
    setOpenStep(step + 1); // 다음 단계 열기
    if (extra.account) setSelectedAccount(extra.account);
  };

  // sessionStorage 복원
  useEffect(() => {
    const saved = sessionStorage.getItem("accountVerificationState");
    if (!saved) return;
    try {
      const parsed = JSON.parse(saved);
      if (Date.now() - parsed.timestamp < 5 * 60 * 1000) {
        setCompletedSteps((prev) => ({ ...prev, 1: parsed.accountVerified }));
        setCurrentStep(2);
        setOpenStep(2);
        setSelectedAccount(parsed.account);
      }
    } catch (err) {
      console.error("상태 복원 오류:", err);
    } finally {
      sessionStorage.removeItem("accountVerificationState");
    }
  }, []);

  const handleCompleteConnection = () => {
    async () => {
      try {
        const email = localStorage.getItem("userEmail");
        if (!email) return;
        const res = await createPayMoney({ email });
      } catch (e) {
        console.error("PayMoney 생성 실패:", e);
      }
    };
    navigate("/paymoney");
  };

  const isAllCompleted =
    completedSteps[1] && completedSteps[2] && completedSteps[3];

  return (
    <>
      {/* 콘텐츠 */}
      <div className={styles.content}>
        {/* Step 1: 은행 선택 */}
        <StepItem
          step={1}
          title={
            completedSteps[1]
              ? `${selectedAccount.bankName} ${selectedAccount.accountNumber}`
              : "은행 선택"
          }
          isDisabled={false}
          isCompleted={completedSteps[1]}
          isOpen={openStep === 1}
          onToggle={() => setOpenStep(openStep === 1 ? null : 1)}
        >
          <BankSelectForm
            isOpen={openStep === 1}
            account={account}
            onSelect={(acc) => completeStep(1, { account: acc })}
          />
        </StepItem>

        {/* Step 2: 계좌인증 */}
        <StepItem
          step={2}
          title="계좌인증"
          isDisabled={currentStep < 2}
          isCompleted={completedSteps[2]}
          isOpen={openStep === 2}
          onToggle={() => setOpenStep(openStep === 2 ? null : 2)}
        >
          <VerificationCodeForm
            isOpen={openStep === 2 && !completedSteps[2]}
            account={selectedAccount}
            onVerificationComplete={() => completeStep(2)}
          />
        </StepItem>

        {/* Step 3: 출금동의 */}
        <StepItem
          step={3}
          title="자동이체 출금동의"
          isDisabled={currentStep < 3}
          isCompleted={completedSteps[3]}
          isOpen={openStep === 3}
          onToggle={() => setOpenStep(openStep === 3 ? null : 3)}
        >
          <WithdrawalAgreementForm
            isOpen={openStep === 3}
            account={selectedAccount}
            onAgreementComplete={() => completeStep(3)}
          />
        </StepItem>

        {/* 완료 섹션 */}
        {isAllCompleted && (
          <div className={styles.modalOverlay}>
            <div className={styles.completionSection}>
              <div className={styles.successMessage}>
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                  <circle cx="10" cy="10" r="10" fill="#6366f1" />
                  <path
                    d="M6 10l3 3 5-6"
                    stroke="white"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                <span>모든 단계가 완료되었습니다!</span>
              </div>
              <button
                className={styles.completeButton}
                onClick={handleCompleteConnection}
              >
                계좌 연결 성공
              </button>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default AccountConnectForm;
