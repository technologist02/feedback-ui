import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { API_URL } from "../api";
import { client } from "../axios/client";
import { Notification } from "../Components/Notification";
import { Preloader } from "../Components/Preloader";

export const SimpleTestReport = () => {
    const { id } = useParams();

    const [questions, setQuestion] = useState({});
    const [loading, setLoad] = useState(true);
    const [answerIsSuccess, setAnswerIsSuccess] = useState(false);

    const setInputValue = (value) => {
        setQuestion({ ...questions, ...value });
    };

    const validate = () => {
        const errors = [];
        if(questions.parametersChanged === "") {
            errors.push(6)
        }
        if(questions.parametersChanged === "Yes" & questions.changes === "") {
            errors.push(6.1)
        }
        if(questions.isSuccess === "") {
            errors.push(9)
        }
        if (errors.length !== 0) {
            alert(`Ответьте на вопросы ${errors.join(", ")}`)
            return false;
        }
        return true;
    }

    const getData = async (id) => {
        const response = await client.get(API_URL + id);
        return response.data;
    };

    const postData = async (questions) => {
        if(!validate()) return; 
        setLoad(true);
        const response = await client.patch(API_URL, questions);
        console.log(response);
        if (response.status === 200) {
            returnFunc();
        }
        setLoad(false);
    };

    const returnFunc = () => {
        setAnswerIsSuccess(!answerIsSuccess);
    };

    useEffect(() => {
        id &&
            getData(id).then((data) => {
                setQuestion(data);
                setLoad(false);
            });
    }, []);

    
    return !loading ? (
        answerIsSuccess ? (
            <Notification returnFunc={returnFunc} />
        ) : (
            <div className="container-sm" style={{ maxWidth: "500px" }}>
                <h4>Результаты тестирования материала {questions.material}</h4>
                <br></br>
                <form className="form-horizontal" method="post">
                    <div className="mb-3">
                        <label htmlFor="client" className="form-label">
                            1. Клиент
                        </label>
                        <input
                            type="text"
                            className="form-control border border-primary-subtle"
                            id="client"
                            placeholder="ООО Золотые Луга"
                            disabled
                            value={questions.client}
                            onChange={(e) =>
                                setInputValue({ client: e.target.value })
                            }
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="material" className="form-label">
                            2. Материал для тестирования
                        </label>
                        <input
                            type="text"
                            className="form-control border border-primary-subtle"
                            id="material"
                            placeholder=""
                            disabled
                            value={questions.material}
                            onChange={(e) =>
                                setInputValue({ material: e.target.value })
                            }
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="date" className="form-label">
                            3. Дата тестирования
                        </label>
                        <input
                            type="date"
                            className="form-control border border-primary-subtle"
                            id="date"
                            value={questions.date}
                            onChange={(e) =>
                                setInputValue({ date: e.target.value })
                            }
                        />
                    </div>
                    <div className="mb-3">
                        <label
                            htmlFor="incoming-inspection-method"
                            className="form-label"
                        >
                            4. Методика входного контроля материала
                        </label>
                        <textarea
                            className="form-control border border-primary-subtle"
                            id="incoming-inspection-method"
                            rows="3"
                            value={questions.incomingInspectionMethod}
                            onChange={(e) =>
                                setInputValue({
                                    incomingInspectionMethod: e.target.value,
                                })
                            }
                        ></textarea>
                    </div>
                    <div className="mb-3">
                        <label
                            htmlFor="incoming-inspection-results"
                            className="form-label"
                        >
                            5. Результаты входного контроля материала
                        </label>
                        <textarea
                            className="form-control border border-primary-subtle"
                            id="incoming-inspection-results"
                            rows="3"
                            value={questions.incomingInspectionResults}
                            onChange={(e) =>
                                setInputValue({
                                    incomingInspectionResults: e.target.value,
                                })
                            }
                        ></textarea>
                    </div>
                    <div className="mb-3">
                        <p>6. Изменялись ли параметры настройки оборудования?</p>
                        <div className="form-check form-check-inline">
                            <input
                                className="form-check-input border border-primary-subtle"
                                type="radio"
                                name="parametersChanged"
                                id="flexRadioDefault1"
                                value="Yes"
                                checked={questions.parametersChanged === "Yes"}
                                onChange={(e) =>
                                    setInputValue({
                                        parametersChanged: e.target.value,
                                    })
                                }
                            />
                            <label
                                className="form-check-label"
                                htmlFor="flexRadioDefault1"
                            >
                                Да
                            </label>
                        </div>
                        <div className="form-check form-check-inline">
                            <input
                                className="form-check-input border border-primary-subtle"
                                type="radio"
                                name="parametersChanged"
                                id="flexRadioDefault2"
                                value="No"
                                checked={questions.parametersChanged === "No"}
                                onChange={(e) =>
                                    setInputValue({
                                        parametersChanged: e.target.value,
                                    })
                                }
                            />
                            <label
                                className="form-check-label"
                                htmlFor="flexRadioDefault2"
                            >
                                Нет
                            </label>
                        </div>
                        {questions.parametersChanged === "Yes" && (
                            <div className="mb-3">
                                <label htmlFor="changes" className="form-label">
                                    6.1 Если изменялись то какие?
                                </label>
                                <textarea
                                    className="form-control border border-primary-subtle"
                                    id="changes"
                                    rows="3"
                                    value={questions.changes}
                                    onChange={(e) =>
                                        setInputValue({
                                            changes: e.target.value,
                                        })
                                    }
                                ></textarea>
                            </div>
                        )}
                    </div>
                    <div className="mb-3">
                        <label
                            htmlFor="output-inspection-method"
                            className="form-label"
                        >
                            7. Методика контроля готовой продукции
                        </label>
                        <textarea
                            className="form-control border border-primary-subtle"
                            id="output-inspection-method"
                            rows="3"
                            value={questions.outputInspectionMethod}
                            onChange={(e) =>
                                setInputValue({
                                    outputInspectionMethod: e.target.value,
                                })
                            }
                        ></textarea>
                    </div>
                    <div className="mb-3">
                        <label
                            htmlFor="output-inspection-results"
                            className="form-label"
                        >
                            8. Результаты контроля готовой продукции
                        </label>
                        <textarea
                            className="form-control border border-primary-subtle"
                            id="output-inspection-results"
                            rows="3"
                            value={questions.outputInspectionResults}
                            onChange={(e) =>
                                setInputValue({
                                    outputInspectionResults: e.target.value,
                                })
                            }
                        ></textarea>
                    </div>
                    <p>9. Испытания прошли успешно?</p>
                    <div className="form-check form-check-inline">
                        <input
                            className="form-check-input border border-primary-subtle"
                            type="radio"
                            name="isSuccess"
                            id="flexRadioDefault3"
                            value="Yes"
                            checked={questions.isSuccess === "Yes"}
                            onChange={(e) =>
                                setInputValue({
                                    isSuccess: e.target.value,
                                })
                            }
                        />
                        <label
                            className="form-check-label"
                            htmlFor="flexRadioDefault3"
                        >
                            Да
                        </label>
                    </div>
                    <div className="form-check form-check-inline">
                        <input
                            className="form-check-input border border-primary-subtle"
                            type="radio"
                            name="isSuccess"
                            id="flexRadioDefault4"
                            value="No"
                            checked={questions.isSuccess === "No"}
                            onChange={(e) =>
                                setInputValue({
                                    isSuccess: e.target.value,
                                })
                            }
                        />
                        <label
                            className="form-check-label"
                            htmlFor="flexRadioDefault4"
                        >
                            Нет
                        </label>
                    </div>
                </form>
                <br></br>
                <div style={{ marginBottom: "30px" }}>
                    <button
                        type="button"
                        onClick={() => postData(questions)}
                        className="btn btn-primary"
                    >
                        Отправить
                    </button>
                </div>
            </div>
        )
    ) : (
        <Preloader />
    );
};
