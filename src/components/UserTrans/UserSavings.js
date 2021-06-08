import moment from 'moment';
import React from 'react';
import { useSelector } from 'react-redux';

const UserSavings = ({netSavingsSelf, loading, save}) => {
    const { color, text } = useSelector(state => state.modeData)
    return (
        <div>
            <table className="table table-striped">

                <thead style={{ color: text, backgroundColor: color }} className="text-center">
                    <tr>
                        <th style={{ color: text, backgroundColor: color }} scope="col">Month</th>
                        <th style={{ color: text, backgroundColor: color }} scope="col">Self Deposit (100%)</th>
                    </tr>
                </thead>

                {loading ?
                    <div className="d-flex align-items-center justify-content-center p-5">
                        <div className="spinner-border text-success" role="status">
                            <span className="visually-hidden"></span>
                        </div>
                    </div>
                    :
                    <>
                        <tbody className="text-center">

                            {save.map((item, index) =>
                                <tr key={index}>
                                    <td style={{ color: text, backgroundColor: color }}>{moment(item.date).format("MMM Do YY")}</td>
                                    <td style={{ color: text, backgroundColor: color }}>{item.savingsSelf}</td>
                                </tr>)}

                        </tbody>

                        <thead style={{ color: text, backgroundColor: color }} className="text-center">
                            <tr>
                                <th style={{ color: text, backgroundColor: color }} scope="col">Total</th>
                                <th style={{ color: text, backgroundColor: color }} scope="col">{netSavingsSelf}</th>
                            </tr>
                        </thead>

                    </>}

            </table>

        </div>
    );
};

export default UserSavings;