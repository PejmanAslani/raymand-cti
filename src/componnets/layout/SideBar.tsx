import React, { useEffect, useState } from 'react'
import {  ArrowLeft  } from 'react-bootstrap-icons'

const SideBar = (props: any) => {

    useEffect(() => {
    }, [])
    return (<></>
        // <>{props.visable &&
        //     <div className='sidebar' id="side-nav">
        //         <div className='header-box px-2 pt-3 pb-4 d-flex justify-content-between'>
        //             <h1 className='fs-4'><span
        //                 className='text-white'>Kaj</span></h1>
        //             <button className='btn d-mb-none  d-block px-0 py-0 text-white'><ArrowLeft color="white" size={20} onClick={props.toggle} /></button>
        //         </div>
        //         <ul className='list-unstyled px-2'>
        //             <li><a href='#' className='text-decoration-none px-3 py-2 d-block'>Dashboard</a></li>
        //             <li><a href='#' className='text-decoration-none px-3 py-2 d-block'>Projects</a></li>
        //
        //         </ul>
        //         <hr style={{ color: "white" }} className='h-color mx-3' />
        //
        //     </div>
        // }
        // </>
    )
}

export default SideBar