

const IngredientsForm = () => {

    const removeIngredient = (e) => {
        e.target.parentElement.remove()
    }

    const addInput = (e) => {

        if (e.target.parentElement.firstElementChild.value === '' || e.target.parentElement.firstElementChild.value === undefined) {
            return
        }

        let addIngredientsDiv = document.getElementById('added-ingredients-div')

        let div = document.createElement('div')
        div.className = 'single-ingredient-div'

        let input = document.createElement('input')
        input.setAttribute('type', 'text')
        input.className = 'ingredients'
        input.value = e.target.parentElement.firstElementChild.value
        e.target.parentElement.firstElementChild.value = ''

        let removeButton = document.createElement('img')
        removeButton.setAttribute('src', '/images/x-circle.svg')
        removeButton.addEventListener('click', removeIngredient)

        div.appendChild(input)
        div.appendChild(removeButton)

        addIngredientsDiv.appendChild(div)
    }

    return (
        <div className='form-control' id='ingredients-form-div'>
            <label>Ingredients (add one at a time):</label>
            <div id='added-ingredients-div'>

            </div>
            <div id='add-ingredient-div'>
                <input className='ingredients' type='text' />
                <img onClick={addInput} className='add-ingredient-img' src='/images/x-circle.svg' alt='add ingredient button' />
            </div>
        </div>
    )
  }
  
  export default IngredientsForm
