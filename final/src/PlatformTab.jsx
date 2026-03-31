import './PlatformTab.css';
function PlatformTab({onPlatformTab}){
    const platforms = [
        {id:"indie", lable: "Indie Game",className:"indie__button"},
        {id:"steam", lable: "Steam",className:"steam__button"},
        {id:"switch", lable: "Switch",className:"switch__button"},
        {id:"xbox", lable: "Xbox",className:"xbox__button"},
        {id:"playstation", lable: "PlayStation",className:"ps__button"},
        {id:"other", lable: "Other Game",className:"other__button"},

    ];

    const handleClick = (e) => {
        const id = e.target.dataset.id; 
        if (id) {
            onPlatformTab(id);
        }
    };

    return (
        <div className='ChoosePlatForm'>
            {platforms.map((platform) => (
                <button
                    key={platform.id}
                    className={platform.className}
                    type="button"
                    data-id={platform.id}
                    onClick={handleClick}
                >
                    {platform.lable}
                </button>
            ))}
        </div>
    );
}

export default PlatformTab;