import React, { useState, useImperativeHandle, forwardRef } from 'react'
import { Text, View, Modal as ModalComponent, ModalProps } from 'react-native'

const Modal: React.ForwardRefRenderFunction<ModalProps> = ({...props}, ref) => {


    return (
        <ModalComponent {...props} />
    )
}

export default forwardRef(Modal);