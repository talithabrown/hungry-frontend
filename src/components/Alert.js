
const Alert = ({ message, type, closeAlert }) => {

  // const closeAlert = () => {
  //   let alert = document.getElementsByClassName(type)
  //   Array.from(alert)
  //   for (let i =0; i < alert.length; i++) {
  //     alert[i].className = 'hideAlert'
  //   }
  // }

  return (
    <div className={type}>
      <p>{message}</p>
      <img className="alert-close-img" src="/images/x.svg" alt="close icon" onClick={() => closeAlert()}></img>
    </div>
  )
}

export default Alert