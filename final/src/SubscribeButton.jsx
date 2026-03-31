function SubscribeButton({ gID, subscribe, onSubscribeToggle }) {
    const isSubscribed = subscribe.includes(gID);

    const handleClick = () => {
        if (onSubscribeToggle) {
            onSubscribeToggle(gID, isSubscribed);
        }
    };

    return (
        <div className='SubscribeButton'>
            <button
                type='button'
                onClick={handleClick}
            >
                {isSubscribed ? "Unsubscribed" : "Subscribe"}
            </button>
        </div>
    )
};

export default SubscribeButton;