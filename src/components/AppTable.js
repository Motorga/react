import React from 'react';
import { Table } from 'react-bootstrap';
import AppTableActions from './AppTableActions';

const AppTable = ({
    cols,
    values,
    handleAddClick = () => {},
    handleMinusClick = () => {},
    handleResetClick = () => {},
}) => (
    <Table striped bordered hover>
        <thead className="text-center">
            <tr>
                { cols.map((col, index) => (
                    <th key={index}>{col.label}</th>
                )) }
            </tr>
        </thead>
        <tbody className="text-center">
            { values.map((value, index) => (
                <tr key={index}>
                    { cols.map((col, index) => {
                        if (col.key === 'actions') {
                            return (
                                <td key={index}>
                                    <AppTableActions
                                        id={value.id}
                                        open={value.open}
                                        handleAddClick={handleAddClick}
                                        handleMinusClick={handleMinusClick}
                                        handleResetClick={handleResetClick}
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