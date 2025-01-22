import { FaLaptop, FaTabletAlt, FaMobileAlt } from 'react-icons/fa';

const Header = ({ title, width }) => {
    return (
        <header className="Header">
            <h1>{title}</h1>
            {/* Displays proper icon based on current window width */}
            {width < 500 ? <FaMobileAlt />
                : width < 992 ? <FaTabletAlt />
                    : <FaLaptop />
            }
        </header>
    )
}

export default Header