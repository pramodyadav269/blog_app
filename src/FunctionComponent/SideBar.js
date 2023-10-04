import React from 'react'

function SideBar({ txtRegistered, txtCountry, txtEmail, txtGender, txtAbout, showHidePopup }) {

    return (
        <div className="d-none d-md-block col-md-4 col-xl-3 left-wrapper">
            <div className="card rounded">
                <div className="card-body">
                    <div className="d-flex align-items-center justify-content-between mb-2">
                        <h6 className="card-title mb-0">About</h6>
                    </div>
                    <span>{txtAbout}
                        <a href='#' onClick={(e) => showHidePopup(e, true)}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-pencil" viewBox="0 0 16 16">
                                <path d="M12.146.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1 0 .708l-10 10a.5.5 0 0 1-.168.11l-5 2a.5.5 0 0 1-.65-.65l2-5a.5.5 0 0 1 .11-.168l10-10zM11.207 2.5 13.5 4.793 14.793 3.5 12.5 1.207 11.207 2.5zm1.586 3L10.5 3.207 4 9.707V10h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.293l6.5-6.5zm-9.761 5.175-.106.106-1.528 3.821 3.821-1.528.106-.106A.5.5 0 0 1 5 12.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.468-.325z" />
                            </svg>
                        </a>
                    </span>
                    <div className="mt-3">
                        <label className="tx-11 font-weight-bold mb-0 text-uppercase">Joined:</label>
                        <p className="text-muted">{txtRegistered}</p>
                    </div>
                    <div className="mt-3">
                        <label className="tx-11 font-weight-bold mb-0 text-uppercase">Lives:</label>
                        <p className="text-muted">{txtCountry}</p>
                    </div>
                    <div className="mt-3">
                        <label className="tx-11 font-weight-bold mb-0 text-uppercase">Email:</label>
                        <p className="text-muted">{txtEmail}</p>
                    </div>
                    <div className="mt-3">
                        <label className="tx-11 font-weight-bold mb-0 text-uppercase">Gender:</label>
                        <p className="text-muted">{txtGender}</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SideBar