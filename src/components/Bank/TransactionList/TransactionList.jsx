import styles from './TransactionList.module.css';
import { useEffect, useState } from "react";
import { getAccountTransactions } from './../../../util/accountApi';

const TransactionList = ({ accountId, onBalancesFetched }) => {
  const [transactions, setTransactions] = useState([]);
  
  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const email = localStorage.getItem('userEmail');
        const transactionRequest = {
          accountId: accountId,
          range: 7,
          email: email
        };

        const data = await getAccountTransactions(transactionRequest);
        setTransactions(data.data);
        
        // 잔액 정보 콜백 전달
        if (onBalancesFetched) {
          onBalancesFetched(data.data[0].afterBalance);
        }
      } catch (error) {
        console.error("거래내역 가져오기 실패:", error);
      }
    };

    fetchTransactions();
  }, [accountId, onBalancesFetched]);

  // 오늘 날짜
  const today = new Date();
  // 7일 전 날짜
  const sevenDaysAgo = new Date();
  sevenDaysAgo.setDate(today.getDate() - 7);

  // YYYY.MM.DD 포맷 함수
  const formatDate = (date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0"); // 월은 0부터 시작
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}.${month}.${day}`;
  };

  // 범위 문자열 생성
  const dateRange = `${formatDate(sevenDaysAgo)} ~ ${formatDate(today)}`;
  
  const formatAmount = (amount) => {
    return new Intl.NumberFormat('ko-KR').format(Math.abs(amount));
  };

  const formatTime = (timeStr) => {
    if (!timeStr || timeStr.length !== 6) return timeStr; 
    const hh = timeStr.slice(0, 2);
    const mm = timeStr.slice(2, 4);
    const ss = timeStr.slice(4, 6);
    return `${hh}.${mm}.${ss}`;
  };

  const getAmountClass = (amount) => {
    return amount > 0 ? styles.deposit : styles.withdrawal;
  };
  
  return (
    <div className={styles.listContainer}>
      <div className={styles.dateHeader}>
        <span className={styles.dateRange}>{dateRange} ({transactions.length}건)</span>
        <button className={styles.toggleButton}>
          <div className={styles.toggle}>
            <div className={`${styles.toggleOption} ${styles.active}`}>
              전체
            </div>
          </div>
        </button>
      </div>

      <div className={styles.transactionGroup}>        
        {transactions.map((transaction) => (
          <div key={transaction.id} className={styles.transactionItem}>
            <div>
              <div className={styles.transactionTime}>
                <span className={styles.date}>{`${transaction.date.slice(0,4)}.${transaction.date.slice(4,6)}.${transaction.date.slice(6,8)}`}</span>
                <span className={styles.time}>{formatTime(transaction.time)}</span>
              </div>
              <div className={styles.transactionDescription}>
                {transaction.summary}
              </div>
            </div>
            
            <div className={styles.transactionDetails} />
                         
            <div className={styles.transactionAmount}>
              <div className={styles.amountContainer}>
                <span
                  className={styles.transactionType}
                  style={{ color: transaction.typeName === "출금" ? "red" : "blue" }}
                >
                  {transaction.typeName}
                </span>
                <span className={getAmountClass(transaction.balance)}
                  style={{ color: 'black' }}
                >
                  {formatAmount(transaction.balance)}원
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TransactionList;