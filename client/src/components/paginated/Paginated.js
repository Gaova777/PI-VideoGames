import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { changePage } from "../../actions";//le entrego una pagina
import styles from "./Paginated.module.css";

export default function Paginated(props) {
    const dispatch = useDispatch();
    const { totalItems, itemsPorPagina } = props;
    const { page: pagina } = useSelector((state) => state);

    const cantPaginas = Math.ceil(totalItems / itemsPorPagina) - 1;

    const pageNumbers = [];

    function handleChangePage(page) {
        dispatch(changePage(page));
    }

    for (let i = 0; i <= cantPaginas; i++) {
        pageNumbers.push(i);
    }

    return (
        <div className={styles.paginated}>
            {
                <>
                    <button
                        disabled={pagina === 0}
                        className={pagina > 0 ? styles.Btn : styles.BtnDisabled}
                        key={"first"}
                        onClick={() => handleChangePage(0)}
                    >
                        {"<<"}
                    </button>
                    <button
                        disabled={pagina === 0}
                        className={pagina > 0 ? styles.Btn : styles.BtnDisabled}
                        key={"prev"}
                        onClick={() => handleChangePage(pagina - 1)}
                    >
                        {"<"}
                    </button>
                </>
            }
            {pageNumbers.length > 0 &&
                pageNumbers.map((p, i) => {
                    return (
                        <button
                            disabled={i === pagina}
                            className={
                                i === pagina ? styles.BtnSelected : styles.Btn
                            }
                            key={i}
                            onClick={() => handleChangePage(p)}
                        >
                            {p + 1}
                        </button>
                    );
                })}
            {
                <>
                    <button
                        disabled={pagina === cantPaginas}
                        className={
                            pagina < cantPaginas
                                ? styles.Btn
                                : styles.BtnDisabled
                        }
                        key={"next"}
                        onClick={() => handleChangePage(pagina + 1)}
                    >
                        {">"}
                    </button>
                    <button
                        disabled={pagina === cantPaginas}
                        className={
                            pagina < cantPaginas
                                ? styles.Btn
                                : styles.BtnDisabled
                        }
                        key={"last"}
                        onClick={() => handleChangePage(cantPaginas)}
                    >
                        {">>"}
                    </button>
                </>
            }
        </div>
    );
}
