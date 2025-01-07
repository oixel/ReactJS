const ChangeColor = ({ color, setColor }) => {
    return (
        <form className='changeForm'>
            {/* Updates color variable as it gets changed */}
            <input
                autoFocus
                id='changeColor'
                type='text'
                placeholder='Add color name'
                required
                value={color}
                onChange={(e) => setColor(e.target.value)}
            />
        </form>
    )
}

export default ChangeColor