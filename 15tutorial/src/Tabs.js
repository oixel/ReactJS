import TabButton from './TabButton';

import './Tabs.css';

const Tabs = ({ selected, setSelected }) => {
    return (
        <form className="tabs" onSubmit={(e) => e.preventDefault()}>
            <TabButton
                textContent={"users"}
                selected={selected}
                setSelected={setSelected}
            />
            <TabButton
                textContent={"posts"}
                selected={selected}
                setSelected={setSelected}
            />
            <TabButton
                textContent={"comments"}
                selected={selected}
                setSelected={setSelected}
            />
        </form >
    )
}

export default Tabs