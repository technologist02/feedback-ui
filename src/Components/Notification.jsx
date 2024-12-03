export const Notification = (props) => {

    const { returnFunc } = props
    return (
        <div style={{"margin": "0 auto"}}>
            <h4>Ваши ответы успешно сохранены</h4>
            <span>Посмотреть ответы</span>
            <button className="btn btn-primary" onClick={() => returnFunc()}>Смотреть</button>
        </div>
    )
}