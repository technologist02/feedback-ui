export const Notification = (props) => {
    const { returnFunc } = props;
    return (
        <div >
            <h4 style={{textAlign:"center"}}>Ваши ответы успешно сохранены</h4>
            <div className="notif">
                <span>Проверить ответы</span>

                <button
                    className="btn btn-primary"
                    style={{marginLeft: "2rem"}}
                    onClick={() => returnFunc()}
                >
                    Смотреть
                </button>
            </div>
        </div>
    );
};
