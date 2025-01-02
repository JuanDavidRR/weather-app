import styles from "./Alert.module.css";

function Alert({ alert }: { alert: string }) {
  return <div className={styles.alert}>{alert}</div>;
}

export default Alert;
