import moment from 'moment';
import React from 'react';
import { useSelector } from 'react-redux';

const UserFunds = ({loading, fund, netSadaqah, netSavingsFund}) => {
    const { color, text } = useSelector(state => state.modeData)

    return (
        <div>
            <table className="table table-striped">

                <thead style={{ color: text, backgroundColor: color }} className="text-center">
                    <tr>
                        <th style={{ color: text, backgroundColor: color }} scope="col">Month</th>
                        <th style={{ color: text, backgroundColor: color }} scope="col">Self Deposit (80%)</th>
                        <th style={{ color: text, backgroundColor: color }} scope="col">Donate (20%)</th>
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

                            {fund.map((item, index) =>
                                <tr key={index}>
                                    <td style={{ color: text, backgroundColor: color }}>{moment(item.date).format("MMM Do YY")}</td>
                                    <td style={{ color: text, backgroundColor: color }}>{item.savings}</td>
                                    <td style={{ color: text, backgroundColor: color }}>{item.sadaqah}</td>
                                </tr>)}

                        </tbody>

                        <thead style={{ color: text, backgroundColor: color }} className="text-center">
                            <tr>
                                <th style={{ color: text, backgroundColor: color }} scope="col">Total</th>
                                <th style={{ color: text, backgroundColor: color }} scope="col">{netSavingsFund}</th>
                                <th style={{ color: text, backgroundColor: color }} scope="col">{netSadaqah}</th>
                            </tr>
                        </thead>

                    </>}

            </table>
        </div>
    );
};

export default UserFunds;