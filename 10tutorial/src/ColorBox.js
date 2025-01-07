const ColorBox = ({ color }) => {
    return (
        // Attempt to set background color of square to currently inputted color (if it is valid)
        <div className="ColorBox" style={{ backgroundColor: color }}>
            {/* If no input is present, display text rather than nothing */}
            {(color) ? color : "Empty Value"}
        </div >
    )
}

export default ColorBox