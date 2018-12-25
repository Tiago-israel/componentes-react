import * as React from 'react';

export default (props: PropsButton): JSX.Element => {
    return (
        <button type="button" className={props.styles} onClick={props.handleAction}>{props.label}</button>
    );
}

interface PropsButton {
    label: string,
    styles?: string,
    handleAction: (object: any) => void
}