import React from 'react';
import { Table } from 'react-bootstrap';
import Actions from './Actions';
import Open from './Open';

const AppTable = ({
    cols,
    values,
    handleAddClick = () => {},
    handleMinusClick = () => {},
    handleResetClick = () => {},
    handleDeleteClick = () => {},
}) => (
    <Table striped bordered hover responsive>
        <thead className="text-center">
            <tr>
                { cols.map((col, index) => (
                    <th key={index}>{col.label}</th>
                )) }
            </tr>
        </thead>
        <tbody className="text-center">
            { values?.map((value, index) => (
                <tr key={index}>
                    { cols.map((col, index) => {
                        if (col.key === 'actions') {
                            return (
                                <td key={index}>
                                    <Actions
                                        id={value.id}
                                        status={value.status}
                                        token={value.token}
                                        handleResetClick={handleResetClick}
                                        handleDeleteClick={handleDeleteClick}
                                    />
                                </td>
                            )
                        }

                        if (col.key === 'open') {
                            return (
                                <td key={index}>
                                    <Open
                                        id={value.id}
                                        open={value.open}
                                        status={value.status}
                                        handleAddClick={handleAddClick}
                                        handleMinusClick={handleMinusClick}
                                    />
                                </td>
                            )
                        }

                        return (
                            <td
                                key={index}
                                className={col.onClick ? 'cursor-pointer' : ''}
                                onClick={() => col.onClick ? col.onClick(value.id) : {}}
                            >
                                {value[col.key]}
                            </td>
                        )
                    })}
                </tr>
            ))}
        </tbody>
    </Table>
)

export default AppTable