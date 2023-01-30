
const Alert = ({ message, type, closeAlert }) => {

  return (
    <div className={type}>
      <p>{message}</p>
      <img className="alert-close-img" src="/images/x.svg" alt="close icon" onClick={() => closeAlert()}></img>
    </div>
  )
}

export default Alert