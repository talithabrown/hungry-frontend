

const Price = ({ price }) => {

    let formatter = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
    });
  
    let formatted_price = formatter.format(price);

    return (
        <>{formatted_price}</>
    )
  }
  
  export default Price