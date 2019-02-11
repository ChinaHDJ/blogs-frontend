import React from "react";
import Image from 'material-ui-image'

export default (props) => {
  console.log(props)

  return (
    <Image
      style={{
        width: 'auto',
        height: 'auto'
      }}
      alt={props.alt}
      src={props.src}
    />
  )
}
