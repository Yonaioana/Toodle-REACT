import React, {useState} from 'react';
import ReactColorPicker from '@super-effective/react-color-picker';

const ColorPicker = () => {
    const [color,
        setColor] = useState('#3cd6bf');

    const onColorChange = (updatedColor) => {
        setColor(updatedColor);
    };

    return (
        <div >
            <ReactColorPicker
                style={{
                height: '250px',
                width: '250px',
                zIndex: '10000',
                position: "absolute"
            }}
                onChange={onColorChange}color={color}/>
        </div>
    );
};

export default ColorPicker;