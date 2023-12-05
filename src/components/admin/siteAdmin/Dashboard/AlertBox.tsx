// import { Report } from "@/model/Report";

// import styles from "./alertBox.module.scss";

// interface AlertBoxProps {
//     title: string;
//     handleAction: (report: Report) => void;
//     report: Report;
//     closeAlertBox: () => void;
// }

// export default function AlertBox({ title, handleAction, report, closeAlertBox }: AlertBoxProps) {
//     return (
//         <div className={styles.alertBox}>
//             <div>
//                 <div>
//                     <h2>{title}</h2>
//                 </div>

//                 <div>
//                     <h3>Deseja prosseguir?</h3>
//                 </div>

//                 <div>
//                     <div>
//                         <button className="button-save" onClick={() => handleAction(report)}>Sim</button>
//                         <button className="cancel-button" onClick={() => closeAlertBox()}>Não</button>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     )
// }

import { useState, useEffect, Dispatch, SetStateAction } from "react";

import styles from "./alertBox.module.scss";

interface AlertBoxProps {
    alert: string;
    handleAction: () => void;
    closeBox: () => void;
}

export default function AlertBox({ alert, handleAction, closeBox }: AlertBoxProps) {
    // const [isAlertBoxOpen, setIsAlertBoxOpen] = useState<boolean>(true);

    const [alertBox, setAlertBox] = useState<JSX.Element>(<></>);

    return <div className={styles.alertBox} >
    <div>
        <div>
            <h2>{alert}</h2>
        </div>

        <div>
            <h3>Deseja prosseguir?</h3>
        </div>

        <div>
            <div>
                <button className="button-save" onClick={handleAction}>Sim</button>
                <button className="cancel-button" onClick={closeBox}>Não</button>
            </div>
        </div>
    </div>
</div>
}