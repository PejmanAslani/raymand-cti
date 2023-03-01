import React from 'react'
import { OverlayTrigger, Tooltip } from 'react-bootstrap'
import * as icons from 'react-bootstrap-icons'
const ToolTipCustom = (props: any) => {
  return (
    <>
      {props.help &&
        <OverlayTrigger
          placement="bottom"
          overlay={<Tooltip id="button-tooltip-2"><p>{props.help}</p></Tooltip>}>
          <icons.QuestionOctagon style={{ marginLeft: "5px" }} />
        </OverlayTrigger >
      }
    </>
  )
}

ToolTipCustom.defaultProps = {
  help: ""
}
export default ToolTipCustom