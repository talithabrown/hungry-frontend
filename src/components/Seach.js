
const Search = ({ getPosts }) => {

  const search = () => {

    let searchString = document.getElementById('search-input').value

    if (searchString !== undefined && searchString !== null && searchString !== '') {
        let searchArray = searchString.split(' ')
        let searchParams = 'searchwords='
        if (searchArray.length > 0) {
            for (let i = 0; i < searchArray.length; i++) {
                searchParams = searchParams + searchArray[i] + ','
            }
            searchParams = searchParams.substring(0, searchParams.length -1)

            localStorage.setItem('searchParams', searchParams)
        }
        else {
            localStorage.removeItem('searchParams')
        }
    }
    else {
      localStorage.removeItem('searchParams')
      console.log("I'm here :)")
    }

    getPosts()
    /////

  }

  const checkForEnterKey = (event) => {
    if (event.key === "Enter") {
        search()
    }
}

  return (
    <div className="search">
        <img src="/images/search.svg" alt="search icon"></img>
        <input type="text" id='search-input' onKeyUp={checkForEnterKey}></input>
        <button className="search-go-button" onClick={search}>Go</button>
    </div>
  )
}

export default Search