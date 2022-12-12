import { OverlayTrigger, Popover } from 'react-bootstrap'

const Favourite = ({ handleFavourite, favouriteStatus, item }) => {

  const before = (
    <Popover id="fave-popover">
      <Popover.Header as="h3">➕ Add to Favourites</Popover.Header>
      <Popover.Body>
        We will save them in your profile
      </Popover.Body>
    </Popover>
  )

  const after = (
    <Popover id="fave-popover">
      <Popover.Header as="h3">★ Favourite!</Popover.Header>
      <Popover.Body>
        Find all your Favourites in your profile <br/> Click to remove
      </Popover.Body>
    </Popover>
  )

  return (
    <div className=' d-flex align-items-end' onClick={handleFavourite} style={{ color: 'white' }}>
      {favouriteStatus === 201 ?
        <OverlayTrigger trigger={['hover', 'focus']} placement="right" overlay={after}>
          <p className='fave favourited m-0'>★</p>
        </OverlayTrigger>
        :
        <OverlayTrigger trigger={['hover', 'focus']} placement="right" overlay={before}>
          <p className='fave m-0'>☆</p>
        </OverlayTrigger>
      }
      {item && item.favourites.length > 0 && <h4>{item.favourites.length}</h4>}
    </div >

  )
}

export default Favourite