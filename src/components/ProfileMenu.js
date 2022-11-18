

const ProfileMenu = () => {

    let profileMenuClass = 'profileMenuClosed'

    const openCloseMenu = () => {
        if (profileMenuClass === 'profileMenuClosed') {
            profileMenuClass = 'profileMenuOpened'
        }

        else if (profileMenuClass === 'profileMenuOpened') {
            profileMenuClass = 'profileMenuClosed'
        }

    }

    return (
      <>
        <img className={`profileMenu ${profileMenuClass}`} src='/images/menu.svg' alt='menu button' onClick={openCloseMenu()} />
      </>
    )
  }