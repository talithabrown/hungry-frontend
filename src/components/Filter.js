import { useState } from 'react'

const Filter = ({ getPosts }) => {

  const [maxPrice, setMaxPrice] = useState('')
  const [minPrice, setMinPrice] = useState('')
  const [displayClassName, setDisplayClassName] = useState('displayNone')


  const onSubmit = (e) => {
    e.preventDefault()

    let delivery = document.getElementById('delivery')
    let pickup = document.getElementById('pickup')

    let queryParamsList = []

    if (maxPrice) {
        queryParamsList.push(`maxprice=${maxPrice}`)
    }

    if (minPrice) {
        console.log(minPrice)
        queryParamsList.push(`minprice=${minPrice}`)
    }

    if (delivery.checked && pickup.checked) {
        queryParamsList.push('deliveryoptions=both')
    }
    else if (delivery.checked) {
        queryParamsList.push('deliveryoptions=delivery')
    }
    else if (pickup.checked) {
        queryParamsList.push('deliveryoptions=pickup')
    }


    let categoryElements = document.getElementsByName('category')
  
    let categoriesParams = 'categories='

    for (let i = 0; i < categoryElements.length; i++) {
        if (categoryElements[i].checked) {
            categoriesParams = categoriesParams + categoryElements[i].value + ','
        }
    }
    categoriesParams = categoriesParams.substring(0, categoriesParams.length -1)
    if (categoriesParams !== 'categories') {
        queryParamsList.push(categoriesParams)
    }

    /////

    let queryParams = ''
    if (queryParamsList.length > 0) {
        for (let i =0; i < queryParamsList.length; i++) {
            queryParams = queryParams + '&' + queryParamsList[i]
        }
        console.log(queryParams)
        localStorage.setItem('queryParams', queryParams)
    }
    else {
        localStorage.setItem('queryParams', queryParams)
    }
    getPosts()

    setDisplayClassName('displayNone')
  }

  return (
    <>
        <div className="filter-div" onClick={() => setDisplayClassName('filter-form')}>
            <img src="/images/filter.svg" alt="filter icon"></img>
            <p>Filter</p>
        </div>

        <form className={displayClassName} onSubmit={onSubmit}>

            <div className='form-control'>
                <label>Max Price:</label>
                <input type='number' value={maxPrice} onChange={(e) => setMaxPrice(e.target.value)}/>
            </div>
            <div className='form-control'>
                <label>Min Price:</label>
                <input type='number' value={minPrice} onChange={(e) => setMinPrice(e.target.value)}/>
            </div>
            <label>Filter By Delivery Options</label>
            <div className='form-control checkbox'>
                <input type="checkbox" id="delivery" name="delivery" value="delivery"/>
                <label htmlFor="delivery"> Offers Delivery</label>
            </div>
            <div className='form-control checkbox'>
                <input type="checkbox" id="pickup" name="pickup" value="pickup" />
                <label htmlFor="pickup"> Offers Pick up</label>
            </div>

            <label>Filter By Category</label>

            <div className='form-control checkbox category'>
                    <input type="checkbox" id="category-7" name="category" value="7"/>
                    <label htmlFor="category-7"> Vegetarian</label>
            </div>
            <div className='form-control checkbox category'>
                <input type="checkbox" id="category-6" name="category" value="6" />
                <label htmlFor="category-6"> Vegan</label>
            </div>
            <div className='form-control checkbox category'>
                <input type="checkbox" id="category-5" name="category" value="5" />
                <label htmlFor="category-5"> Keto</label>
            </div>
            <div className='form-control checkbox category'>
                <input type="checkbox" id="category-8" name="category" value="8" />
                <label htmlFor="category-8"> Healthy</label>
            </div>
            <div className='form-control checkbox category'>
                <input type="checkbox" id="category-11" name="category" value="11" />
                <label htmlFor="category-11"> Dessert</label>
            </div>
            <div className='form-control checkbox category'>
                <input type="checkbox" id="category-10" name="category" value="10" />
                <label htmlFor="category-10"> Sweet</label>
            </div>
            <div className='form-control checkbox category'>
                <input type="checkbox" id="category-1" name="category" value="1" />
                <label htmlFor="category-1"> American</label>
            </div>
            <div className='form-control checkbox category'>
                <input type="checkbox" id="category-2" name="category" value="2" />
                <label htmlFor="category-2"> Mexican</label>
            </div>
            <div className='form-control checkbox category'>
                <input type="checkbox" id="category-3" name="category" value="3" />
                <label htmlFor="category-3"> Asian</label>
            </div>
            <div className='form-control checkbox category'>
                <input type="checkbox" id="category-4" name="category" value="4" />
                <label htmlFor="category-4"> Italian</label>
            </div>
            <div className='form-control checkbox category'>
                <input type="checkbox" id="category-9" name="category" value="9" />
                <label htmlFor="category-9"> Pasta</label>
            </div>



            <div className="buttonHolderDiv">
            <input className="submit" type='submit' value='Apply Filters' />
            </div>
        </form>
    </>
  )
}

export default Filter
