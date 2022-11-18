

const Ingredients = ({ ingredients }) => {

    function toggleIngredients (event) {
        let ingredientsUl = event.target.parentElement.parentElement.children[1]
        if (ingredientsUl.style.display === 'block') {
            ingredientsUl.style.display = 'none';
            event.target.src = '/images/chevron-down.svg'
        } else {
            ingredientsUl.style.display = 'block';
            event.target.src = '/images/chevron-up.svg'
        }
    }

    if (ingredients) {
        return (
        <div>
            <div className="ingredients-h3-and-down-arrow-div">
                <h3>Ingredients</h3>
                <img onClick={toggleIngredients} className="ingredients-arrow" src="./images/chevron-down.svg" alt="down arrow icon"></img>
            </div>
            <ul className="ingredients-ul">
                {ingredients.map((ingredient) => (
                    <li key={ingredient.id}>{ingredient.name}</li>
                ))}
            </ul>
        </div>
        )
    }
}

export default Ingredients