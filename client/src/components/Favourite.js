import { OverlayTrigger, Popover } from 'react-bootstrap'

const Favourite = ({ handleFavourite, favouriteStatus, item, faveError }) => {

  const before = (
    <Popover id="before-popover">
      <Popover.Header as="h3">➕ Add to Favourites</Popover.Header>
      <Popover.Body>
        We will save them in your profile
      </Popover.Body>
    </Popover>
  )

  const after = (
    <Popover id="after-popover">
      <Popover.Header as="h3" style={{ color: 'limegreen' }}>★ Added to Favourites!</Popover.Header>
      <Popover.Body>
        Find all your Favourites in your profile <br/> Click to remove
      </Popover.Body>
    </Popover>
  )

  const error = (
    <Popover id="error-popover">
      <Popover.Header as="h3" style={{ color: 'red' }}>Oh no!</Popover.Header>
      <Popover.Body>
        {faveError && <>{faveError}</>}
      </Popover.Body>
    </Popover>
  )

  return (
    <div className=' d-flex align-items-end' onClick={handleFavourite} style={{ color: 'white' }}>
      {favouriteStatus === 201 ?
        <OverlayTrigger trigger={['hover', 'focus']} delay="500" placement="right" overlay={faveError ? error :  after}>
          <p className='fave favourited m-0'>★</p>
        </OverlayTrigger>
        :
        <OverlayTrigger trigger={['hover', 'focus']} delay="500" placement="right" overlay={faveError ? error : before}>
          <p className='fave m-0'>☆</p>
        </OverlayTrigger>
      }
      {item && item.favourites.length > 0 && <h5>{item.favourites.length}</h5>}
    </div >

  )
}

export default Favourite