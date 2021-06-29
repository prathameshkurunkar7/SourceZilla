import React from 'react';
import { Button } from '@material-ui/core';

export default function InputField(props) {

    return (
        <Button
            disableElevation={true}
            disableFocusRipple={true}
            disableTouchRipple={true}
            {...props}
        />
    );
}
