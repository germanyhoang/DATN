import React from 'react'

type Props = {}

const Region = (props: Props) => {
  return (
    <div className="modal fade" tabIndex={-1} role="dialog" id="region">
    <div className="modal-dialog modal-lg" role="document">
      <div className="modal-content">
        <a href="#" className="close" data-bs-dismiss="modal"><em className="icon ni ni-cross-sm" /></a>
        <div className="modal-body modal-body-md">
        </div>
      </div>
    </div>
  </div>
  )
}

export default Region